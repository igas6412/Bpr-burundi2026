
/* ============================================================
   BURUNDI PEOPLE REGISTRY
   bpr-firebase.js
   FIREBASE AUTH + FIRESTORE
   ============================================================ */


/* ============================================================
   FIREBASE CONFIG
============================================================ */

import {
    auth,
    db,
    firebaseConfig
} from "./firebase-config.js";


/* ============================================================
   FIREBASE APP
============================================================ */

import {
    initializeApp,
    getApps
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


/* ============================================================
   FIREBASE AUTH
============================================================ */

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


/* ============================================================
   FIRESTORE
============================================================ */

import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


/* ============================================================
   COLLECTIONS
============================================================ */

const COMPTES = "comptes";
const MENAGES = "menages";
const PERSONNES = "personnes";
const VISITEURS = "visiteurs";


/* ============================================================
   AUTH SECONDAIRE
   ------------------------------------------------------------
   Iyi Auth ikoreshwa gusa mu gukora compte nshasha.

   Umuyobozi asanzwe connecté kuri:
       auth

   Compte nshasha ikorwa kuri:
       secondaryAuth

   Ivyo bituma Manager atava muri session yiwe.
============================================================ */

let secondaryApp = null;


const applicationsExistantes =
    getApps();


const appSecondaire =
    applicationsExistantes.find(
        app =>
            app.name === "BPR_CREATE_USER"
    );


if (appSecondaire) {

    secondaryApp =
        appSecondaire;

} else {

    secondaryApp =
        initializeApp(
            firebaseConfig,
            "BPR_CREATE_USER"
        );
}


const secondaryAuth =
    getAuth(
        secondaryApp
    );


/* ============================================================
   EMAIL TECHNIQUE
   ------------------------------------------------------------
   Umukoresha akoresha identifiant yiwe.
   Firebase ikoresha email technique inyuma.
============================================================ */

function emailBPR(
    identifiant
) {

    return (

        String(
            identifiant || ""
        )
        .trim()
        .toLowerCase()
        .replace(
            /\s+/g,
            ""
        )
        .replace(
            /[^a-z0-9._-]/g,
            ""
        )

        +

        "@burundi-people-registry.firebaseapp.com"

    );
}


/* ============================================================
   CREER COMPTE
   ------------------------------------------------------------
   Manager NTASIMBURWA na compte nshasha.
============================================================ */

export async function creerCompte(
    donnees
) {

    if (!donnees) {

        throw new Error(
            "Données du compte manquantes."
        );
    }


    const identifiant =
        String(
            donnees.identifiant || ""
        ).trim();


    const motDePasse =
        String(
            donnees.motDePasse || ""
        );


    if (!identifiant) {

        throw new Error(
            "L'identifiant est obligatoire."
        );
    }


    if (!motDePasse) {

        throw new Error(
            "Le mot de passe est obligatoire."
        );
    }


    if (motDePasse.length < 6) {

        throw new Error(
            "Le mot de passe doit contenir au moins 6 caractères."
        );
    }


    const email =
        emailBPR(
            identifiant
        );

    let utilisateurCree = null;

    try {

        /* ====================================================
           CREER AUTH AVEC AUTH SECONDAIRE
        ==================================================== */

        const resultat =
            await createUserWithEmailAndPassword(
                secondaryAuth,
                email,
                motDePasse
            );


        const user =
            resultat.user;

        utilisateurCree = user;


        /* ====================================================
           DONNEES DU COMPTE
        ==================================================== */

        const compte = {

            uid:
                user.uid,

            nomUtilisateur:
                donnees.nomUtilisateur || "",

            identifiant:
                identifiant,

            role:
                donnees.role || "",

            statut:
                donnees.statut || "Actif",

            pays:
                donnees.pays ||
                "BURUNDI",

            province:
                donnees.province || "",

            commune:
                donnees.commune || "",

            zone:
                donnees.zone || "",

            colline:
                donnees.colline || "",

            creeParUid:
                donnees.creeParUid || "",

            creePar:
                donnees.creePar || "",

            creeParRole:
                donnees.creeParRole || "",

            emailFirebase:
                email,

            creeLe:
                serverTimestamp()

        };


        /* ====================================================
           FIRESTORE
        ==================================================== */

        await setDoc(

            doc(
                db,
                COMPTES,
                user.uid
            ),

            compte

        );


        /* ====================================================
           LOGOUT AUTH SECONDAIRE
           ----------------------------------------------------
           Ntikora logout ya Manager.
        ==================================================== */

        try {

            await signOut(
                secondaryAuth
            );

        } catch (erreur) {

            console.warn(
                "Auth secondaire :",
                erreur
            );

        }


        return {

            success:
                true,

            uid:
                user.uid

        };


    } catch (erreur) {

        console.error(
            "Erreur création compte :",
            erreur
        );

        // Si Firestore refuse l'écriture après la création Auth,
        // supprimer l'utilisateur secondaire pour éviter un UID
        // orphelin qui bloquerait une nouvelle tentative.
        if (utilisateurCree) {
            try {
                await deleteUser(utilisateurCree);
            } catch (suppressionErreur) {
                console.warn(
                    "Impossible de nettoyer le compte Auth secondaire :",
                    suppressionErreur
                );
            }
        }


        if (
            erreur.code ===
            "auth/email-already-in-use"
        ) {

            throw new Error(
                "Cet identifiant existe déjà."
            );
        }


        if (
            erreur.code ===
            "auth/weak-password"
        ) {

            throw new Error(
                "Le mot de passe doit contenir au moins 6 caractères."
            );
        }


        if (
            erreur.code ===
            "auth/invalid-email"
        ) {

            throw new Error(
                "Identifiant invalide."
            );
        }


        if (
            erreur.code ===
            "permission-denied"
        ) {

            throw new Error(
                "Accès refusé par les règles Firebase."
            );
        }


        throw erreur;
    }
}


/* ============================================================
   CONNECTER
============================================================ */

export async function connecter(
    identifiant,
    motDePasse
) {

    const email =
        emailBPR(
            identifiant
        );


    try {

        const resultat =
            await signInWithEmailAndPassword(
                auth,
                email,
                motDePasse
            );


        const user =
            resultat.user;


        /* ====================================================
           CHERCHER COMPTE FIRESTORE
        ==================================================== */

        const reference =
            doc(
                db,
                COMPTES,
                user.uid
            );


        const snapshot =
            await getDoc(
                reference
            );


        if (!snapshot.exists()) {

            throw new Error(
                "Compte BPR introuvable dans Firestore."
            );
        }


        const compte =
            snapshot.data();


        /* ====================================================
           STATUT
        ==================================================== */

        const statut =
            String(
                compte.statut ||
                "Actif"
            )
            .trim()
            .toLowerCase();


        if (
            statut === "inactif"
        ) {

            await signOut(
                auth
            );

            throw new Error(
                "Ce compte est inactif."
            );
        }


        /* ====================================================
           SESSION
        ==================================================== */

        const compteSession = {

            id:
                user.uid,

            uid:
                user.uid,

            ...compte

        };


        localStorage.setItem(
            "BPR_COMPTE_CONNECTE",
            JSON.stringify(
                compteSession
            )
        );


        localStorage.setItem(
            "bpr_current_user",
            JSON.stringify(
                compteSession
            )
        );


        localStorage.setItem(
            "bpr_manager_connecte",
            JSON.stringify(
                compteSession
            )
        );


        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        localStorage.setItem(
            "username",
            compteSession.identifiant || ""
        );


        localStorage.setItem(
            "userName",
            compteSession.nomUtilisateur || ""
        );


        localStorage.setItem(
            "userId",
            compteSession.uid || ""
        );


        localStorage.setItem(
            "userRole",
            compteSession.role || ""
        );


        localStorage.setItem(
            "userPays",
            compteSession.pays || "BURUNDI"
        );


        localStorage.setItem(
            "userProvince",
            compteSession.province || ""
        );


        localStorage.setItem(
            "userCommune",
            compteSession.commune || ""
        );


        localStorage.setItem(
            "userZone",
            compteSession.zone || ""
        );


        localStorage.setItem(
            "userColline",
            compteSession.colline || ""
        );


        return compteSession;


    } catch (erreur) {

        console.error(
            "Erreur connexion Firebase :",
            erreur
        );


        if (
            erreur.code ===
            "auth/invalid-credential"
        ) {

            throw new Error(
                "Identifiant ou mot de passe incorrect."
            );
        }


        if (
            erreur.code ===
            "auth/user-not-found"
        ) {

            throw new Error(
                "Compte introuvable."
            );
        }


        if (
            erreur.code ===
            "auth/wrong-password"
        ) {

            throw new Error(
                "Mot de passe incorrect."
            );
        }


        throw erreur;
    }
}


/* ============================================================
   DECONNECTER
============================================================ */

export async function deconnecter() {

    await signOut(
        auth
    );


    localStorage.removeItem(
        "BPR_COMPTE_CONNECTE"
    );


    localStorage.removeItem(
        "bpr_current_user"
    );


    localStorage.removeItem(
        "bpr_manager_connecte"
    );


    localStorage.removeItem(
        "isLoggedIn"
    );


    localStorage.removeItem(
        "username"
    );


    localStorage.removeItem(
        "userName"
    );


    localStorage.removeItem(
        "userId"
    );


    localStorage.removeItem(
        "userRole"
    );


    localStorage.removeItem(
        "userPays"
    );


    localStorage.removeItem(
        "userProvince"
    );


    localStorage.removeItem(
        "userCommune"
    );


    localStorage.removeItem(
        "userZone"
    );


    localStorage.removeItem(
        "userColline"
    );
}


/* ============================================================
   COMPTE CONNECTE
============================================================ */

export async function compteConnecte() {

    const user =
        auth.currentUser;


    if (!user) {

        return null;
    }


    const reference =
        doc(
            db,
            COMPTES,
            user.uid
        );


    const snapshot =
        await getDoc(
            reference
        );


    if (!snapshot.exists()) {

        return null;
    }


    return {

        id:
            snapshot.id,

        uid:
            user.uid,

        ...snapshot.data()

    };
}


/* ============================================================
   CHARGER COMPTES
============================================================ */

export async function chargerComptes() {

    /*
       IMPORTANT :
       La liste des comptes est filtrée par le territoire
       du compte actuellement connecté. Le Manager National
       est le seul à voir tous les comptes.
    */

    const actuel = await compteConnecte();

    if (!actuel) {
        throw new Error("Aucun compte connecté.");
    }

    const role = normaliserRoleFirebase(actuel.role);
    const contraintes = [];

    if (role === "Manager Provincial") {
        contraintes.push(where("province", "==", actuel.province || ""));
    } else if (role === "Manager Communal") {
        contraintes.push(where("province", "==", actuel.province || ""));
        contraintes.push(where("commune", "==", actuel.commune || ""));
    } else if (role === "Manager Zonal") {
        contraintes.push(where("province", "==", actuel.province || ""));
        contraintes.push(where("commune", "==", actuel.commune || ""));
        contraintes.push(where("zone", "==", actuel.zone || ""));
    } else if (role === "Utilisateur") {
        contraintes.push(where("province", "==", actuel.province || ""));
        contraintes.push(where("commune", "==", actuel.commune || ""));
        contraintes.push(where("zone", "==", actuel.zone || ""));
        contraintes.push(where("colline", "==", actuel.colline || ""));
    } else if (role !== "Manager National") {
        return [];
    }

    const reference = collection(db, COMPTES);
    const requete = contraintes.length
        ? query(reference, ...contraintes)
        : reference;

    const snapshot = await getDocs(requete);

    return snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));
}

function normaliserRoleFirebase(role) {
    return String(role || "")
        .normalize("NFD")
        .replace(/[\\u0300-\\u036f]/g, "")
        .trim()
        .replace(/\\s+/g, " ")
        .toLowerCase()
        .replace(/^manager national$/, "Manager National")
        .replace(/^manager provincial$/, "Manager Provincial")
        .replace(/^manager communal$/, "Manager Communal")
        .replace(/^manager zonal$/, "Manager Zonal")
        .replace(/^utilisateur$/, "Utilisateur");
}


/* ============================================================
   MODIFIER COMPTE
============================================================ */

export async function modifierCompte(
    uid,
    donnees
) {

    if (!uid) {

        throw new Error(
            "ID du compte manquant."
        );
    }


    await updateDoc(

        doc(
            db,
            COMPTES,
            uid
        ),

        {

            nomUtilisateur:
                donnees.nomUtilisateur ||
                "",

            role:
                donnees.role ||
                "",

            statut:
                donnees.statut ||
                "Actif",

            pays:
                donnees.pays ||
                "BURUNDI",

            province:
                donnees.province ||
                "",

            commune:
                donnees.commune ||
                "",

            zone:
                donnees.zone ||
                "",

            colline:
                donnees.colline ||
                "",

            modifieLe:
                serverTimestamp()

        }

    );


    return true;
}


/* ============================================================
   SUPPRIMER COMPTE
============================================================ */

export async function supprimerCompte(
    uid
) {

    if (!uid) {

        throw new Error(
            "ID du compte manquant."
        );
    }


    await deleteDoc(

        doc(
            db,
            COMPTES,
            uid
        )

    );


    return true;
}


/* ============================================================
   ENREGISTRER MENAGE
============================================================ */

export async function enregistrerMenage(
    id,
    donnees
) {

    if (!id) {

        throw new Error(
            "ID du ménage manquant."
        );
    }


    await setDoc(

        doc(
            db,
            MENAGES,
            id
        ),

        {

            ...donnees,

            modifieLe:
                serverTimestamp()

        }

    );


    return true;
}


/* ============================================================
   ENREGISTRER PERSONNE
============================================================ */

export async function enregistrerPersonne(
    id,
    donnees
) {

    if (!id) {

        throw new Error(
            "ID de la personne manquant."
        );
    }


    await setDoc(

        doc(
            db,
            PERSONNES,
            id
        ),

        {

            ...donnees,

            modifieLe:
                serverTimestamp()

        }

    );


    return true;
}


/* ============================================================
   ENREGISTRER VISITEUR
============================================================ */

export async function enregistrerVisiteur(
    id,
    donnees
) {

    if (!id) {

        throw new Error(
            "ID du visiteur manquant."
        );
    }


    await setDoc(

        doc(
            db,
            VISITEURS,
            id
        ),

        {

            ...donnees,

            modifieLe:
                serverTimestamp()

        }

    );


    return true;
}


/* ============================================================
   SURVEILLER CONNEXION
============================================================ */

export function surveillerConnexion(
    callback
) {

    return onAuthStateChanged(
        auth,
        callback
    );
}


/* ============================================================
   VERIFICATION FIREBASE
============================================================ */

export function firebasePret() {

    return {

        auth:
            Boolean(auth),

        db:
            Boolean(db),

        secondaryAuth:
            Boolean(secondaryAuth)

    };
}