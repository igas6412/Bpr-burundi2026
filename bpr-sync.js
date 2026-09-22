
/* ============================================================
   BPR-SYNC.JS
   Synchronisation multi-téléphones via Firebase
   ------------------------------------------------------------
   Le localStorage sert seulement de cache hors-ligne.
   Firestore est la source partagée entre tous les téléphones.
============================================================ */

import { auth, db } from "./firebase-config.js";
import {
    collection,
    doc,
    getDocs,
    query,
    where,
    setDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const COLLECTIONS = {
    menages: "bpr_menages",
    personnes: "bpr_personnes",
    visiteurs: "bpr_visiteurs"
};

let pret = false;
let synchronisationEnCours = false;
const signatures = {};

function norm(v) {
    return String(v ?? "")
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function roleCanonique(role) {
    const r = norm(role);
    if (r === "manager national") return "Manager National";
    if (r === "manager provincial") return "Manager Provincial";
    if (r === "manager communal") return "Manager Communal";
    if (r === "manager zonal") return "Manager Zonal";
    if (r === "utilisateur") return "Utilisateur";
    return "";
}

function session() {
    try {
        const raw = localStorage.getItem("BPR_COMPTE_CONNECTE");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function accessible(element, compte) {
    const role = roleCanonique(compte?.role);
    if (role === "Manager National") return true;

    if (role === "Manager Provincial") {
        return norm(element.province) === norm(compte.province);
    }

    if (role === "Manager Communal") {
        return norm(element.province) === norm(compte.province) &&
               norm(element.commune) === norm(compte.commune);
    }

    if (role === "Manager Zonal") {
        return norm(element.province) === norm(compte.province) &&
               norm(element.commune) === norm(compte.commune) &&
               norm(element.zone) === norm(compte.zone);
    }

    if (role === "Utilisateur") {
        return norm(element.province) === norm(compte.province) &&
               norm(element.commune) === norm(compte.commune) &&
               norm(element.zone) === norm(compte.zone) &&
               norm(element.colline) === norm(compte.colline);
    }

    return false;
}

function contraintesPour(compte) {
    const role = roleCanonique(compte?.role);
    const c = [];

    if (role === "Manager Provincial") {
        c.push(where("province", "==", compte.province || ""));
    } else if (role === "Manager Communal") {
        c.push(where("province", "==", compte.province || ""));
        c.push(where("commune", "==", compte.commune || ""));
    } else if (role === "Manager Zonal") {
        c.push(where("province", "==", compte.province || ""));
        c.push(where("commune", "==", compte.commune || ""));
        c.push(where("zone", "==", compte.zone || ""));
    } else if (role === "Utilisateur") {
        c.push(where("province", "==", compte.province || ""));
        c.push(where("commune", "==", compte.commune || ""));
        c.push(where("zone", "==", compte.zone || ""));
        c.push(where("colline", "==", compte.colline || ""));
    }

    return c;
}

function lire(cle) {
    try {
        const data = JSON.parse(localStorage.getItem(cle) || "[]");
        return Array.isArray(data) ? data : [];
    } catch {
        return [];
    }
}

function ecrire(cle, data) {
    localStorage.setItem(cle, JSON.stringify(data || []));
}

function signature(data) {
    try {
        return JSON.stringify(data || []);
    } catch {
        return "";
    }
}

async function telechargerCollection(nomFirestore, cleLocal, compte) {
    const ref = collection(db, nomFirestore);
    const contraintes = contraintesPour(compte);
    const requete = contraintes.length ? query(ref, ...contraintes) : ref;
    const snap = await getDocs(requete);

    const serveur = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const local = lire(cleLocal).filter(x => accessible(x, compte));

    // On conserve les nouveaux éléments locaux qui ne sont pas
    // encore présents sur Firebase, afin d'éviter toute perte lors
    // de la première migration vers le cloud.
    const parId = new Map();

    local.forEach(x => {
        if (x?.id != null) parId.set(String(x.id), x);
    });

    serveur.forEach(x => {
        if (x?.id != null) parId.set(String(x.id), x);
    });

    const data = Array.from(parId.values());
    ecrire(cleLocal, data);
    signatures[cleLocal] = signature(data);
}

async function synchroniserCollection(nomFirestore, cleLocal, compte) {
    const local = lire(cleLocal);
    const localAccess = local.filter(x => accessible(x, compte));

    // Les enregistrements hors territoire ne sont jamais envoyés.
    for (const item of localAccess) {
        if (!item.id) continue;

        const donnees = { ...item };
        delete donnees.id;

        // Le serveur doit connaître l'auteur.
        if (!donnees.createdByUid) {
            donnees.createdByUid = compte.uid || auth.currentUser?.uid || "";
        }
        if (!donnees.createdBy) {
            donnees.createdBy = compte.identifiant || compte.nomUtilisateur || "";
        }

        await setDoc(doc(db, nomFirestore, String(item.id)), donnees, { merge: true });
    }

    // Synchroniser les suppressions faites depuis l'application.
    const contraintes = contraintesPour(compte);
    const ref = collection(db, nomFirestore);
    const requete = contraintes.length ? query(ref, ...contraintes) : ref;
    const snap = await getDocs(requete);
    const idsLocaux = new Set(localAccess.map(x => String(x.id)));

    for (const d of snap.docs) {
        if (!idsLocaux.has(String(d.id))) {
            await deleteDoc(d.ref);
        }
    }

    signatures[cleLocal] = signature(local);
}

async function synchroniserTout(mode = "download") {
    if (synchronisationEnCours) return;
    const compte = session();
    if (!compte || !auth.currentUser) return;

    synchronisationEnCours = true;
    try {
        if (mode === "download") {
            await telechargerCollection("menages", COLLECTIONS.menages, compte);
            await telechargerCollection("personnes", COLLECTIONS.personnes, compte);
            await telechargerCollection("visiteurs", COLLECTIONS.visiteurs, compte);

            // Finalise aussi la migration des données locales conservées.
            await synchroniserCollection("menages", COLLECTIONS.menages, compte);
            await synchroniserCollection("personnes", COLLECTIONS.personnes, compte);
            await synchroniserCollection("visiteurs", COLLECTIONS.visiteurs, compte);
        } else {
            await synchroniserCollection("menages", COLLECTIONS.menages, compte);
            await synchroniserCollection("personnes", COLLECTIONS.personnes, compte);
            await synchroniserCollection("visiteurs", COLLECTIONS.visiteurs, compte);
        }

        localStorage.setItem("bpr_last_update", new Date().toISOString());
        localStorage.setItem("bpr_sync", "true");
        window.dispatchEvent(new CustomEvent("bpr-sync-complete"));
    } catch (e) {
        console.error("BPR synchronisation:", e);
    } finally {
        synchronisationEnCours = false;
    }
}

async function demarrer() {
    if (!auth.currentUser || !session()) return;
    await synchroniserTout("download");
    pret = true;

    // Les anciennes pages continuent à travailler avec localStorage.
    // Toute modification locale est ensuite envoyée à Firestore.
    setInterval(async () => {
        if (!pret || synchronisationEnCours) return;

        const compte = session();
        if (!compte || !auth.currentUser) return;

        const cles = Object.values(COLLECTIONS);
        let change = false;

        for (const cle of cles) {
            const sig = signature(lire(cle));
            if (signatures[cle] !== sig) {
                change = true;
                break;
            }
        }

        if (change) {
            await synchroniserTout("upload");
        }
    }, 2500);
}

onAuthStateChanged(auth, user => {
    if (user) demarrer();
});

window.BPRSync = {
    synchroniser: () => synchroniserTout("download"),
    envoyer: () => synchroniserTout("upload")
};
