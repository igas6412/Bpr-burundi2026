
/* ============================================================
   BURUNDI PEOPLE REGISTRY - register.js
   VERSION COMPLÈTE
   Province → Commune → Zone → Colline
   Ménages + Personnes + Visiteurs
============================================================ */

const MENAGES_KEY = "bpr_menages";
const PERSONNES_KEY = "bpr_personnes";
const VISITEURS_KEY = "bpr_visiteurs";

let modeModification = false;
let menageIdActuel = null;

document.addEventListener("DOMContentLoaded", () => {
    initialiserCommunes();
    initialiserEnfants();
    initialiserParentes();
    initialiserVisiteurs();
    verifierModeModification();
    initialiserFormulaire();
    initialiserBoutonNouveau();
    initialiserDeconnexion();
});

/* ============================================================
   PROVINCE → COMMUNE → ZONE → COLLINE
   Données venant de compte.js
============================================================ */

function normaliserAdmin(valeur) {
    return String(valeur ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function trouverCle(objet, recherche) {
    if (!objet || typeof objet !== "object") return null;

    return Object.keys(objet).find(
        cle => normaliserAdmin(cle) === normaliserAdmin(recherche)
    ) || null;
}

function initialiserCommunes() {
    const province = document.getElementById("province");
    const commune = document.getElementById("commune");
    const zone = document.getElementById("zone");
    const colline = document.getElementById("colline");

    if (!province || !commune || !zone || !colline) {
        console.error("❌ Province, Commune, Zone ou Colline introuvable.");
        return;
    }

    if (typeof COMMUNES_PAR_PROVINCE === "undefined") {
        console.error("❌ COMMUNES_PAR_PROVINCE absent. Charge compte.js avant register.js.");
        return;
    }

    if (typeof dataAdministrative === "undefined") {
        console.error("❌ dataAdministrative absent. Charge compte.js avant register.js.");
        return;
    }

    province.addEventListener("change", () => {
        commune.innerHTML = '<option value="">-- Choisir une commune --</option>';
        zone.innerHTML = '<option value="">-- Choisir une zone --</option>';
        colline.innerHTML = '<option value="">-- Choisir une colline / quartier --</option>';

        const cleProvince = trouverCle(COMMUNES_PAR_PROVINCE, province.value);
        if (!cleProvince) return;

        const communes = COMMUNES_PAR_PROVINCE[cleProvince];
        if (!Array.isArray(communes)) return;

        communes.forEach(nom => {
            const option = document.createElement("option");
            option.value = nom;
            option.textContent = nom;
            commune.appendChild(option);
        });
    });

    commune.addEventListener("change", () => {
        zone.innerHTML = '<option value="">-- Choisir une zone --</option>';
        colline.innerHTML = '<option value="">-- Choisir une colline / quartier --</option>';

        const cleProvince = trouverCle(dataAdministrative, province.value);
        if (!cleProvince || !commune.value) return;

        const provinceData = dataAdministrative[cleProvince];
        const cleCommune = trouverCle(provinceData, commune.value);
        if (!cleCommune) return;

        const communeData = provinceData[cleCommune];
        if (!communeData || typeof communeData !== "object") return;

        Object.keys(communeData).forEach(nomZone => {
            const option = document.createElement("option");
            option.value = nomZone;
            option.textContent = nomZone;
            zone.appendChild(option);
        });
    });

    zone.addEventListener("change", () => {
        colline.innerHTML = '<option value="">-- Choisir une colline / quartier --</option>';

        const cleProvince = trouverCle(dataAdministrative, province.value);
        if (!cleProvince || !commune.value || !zone.value) return;

        const provinceData = dataAdministrative[cleProvince];
        const cleCommune = trouverCle(provinceData, commune.value);
        if (!cleCommune) return;

        const communeData = provinceData[cleCommune];
        const cleZone = trouverCle(communeData, zone.value);
        if (!cleZone) return;

        const collines = communeData[cleZone];
        if (!Array.isArray(collines)) return;

        collines.forEach(nomColline => {
            const option = document.createElement("option");
            option.value = nomColline;
            option.textContent = nomColline;
            colline.appendChild(option);
        });
    });
}

/* ============================================================
   ENFANTS
============================================================ */

function initialiserEnfants() {
    const bouton = document.getElementById("btnAjouterEnfant");
    if (bouton) bouton.addEventListener("click", () => ajouterEnfant());
}

function ajouterEnfant(donnees = {}) {
    const liste = document.getElementById("listeEnfants");
    if (!liste) return;

    const bloc = document.createElement("div");
    bloc.className = "member-form enfant-form";

    bloc.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>Nom et prénom</label>
                <input type="text" class="enfant-nom"
                    value="${escapeHTML(donnees.nomPrenom || "")}"
                    placeholder="Nom et prénom">
            </div>

            <div class="form-group">
                <label>Genre</label>
                <select class="enfant-Genre">
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                </select>
            </div>

            <div class="form-group">
                <label>Âge</label>
                <input type="number" class="enfant-age" min="0" max="150"
                    value="${escapeHTML(donnees.age || "")}">
            </div>

            <div class="form-group">
                <label>Numéro d'identité</label>
                <input type="text" class="enfant-identite"
                    value="${escapeHTML(donnees.identite || "")}">
            </div>

            <div class="form-group">
                <label>Téléphone</label>
                <input type="tel" class="enfant-telephone"
                    value="${escapeHTML(donnees.telephone || "")}">
            </div>
        </div>

        <button type="button" class="btn-remove">
            🗑️ Supprimer cet enfant
        </button>
    `;

    const genre = donnees.genre || donnees.sexe;
    if (genre) bloc.querySelector(".enfant-Genre").value = genre;

    bloc.querySelector(".btn-remove").addEventListener("click", () => bloc.remove());
    liste.appendChild(bloc);
}

/* ============================================================
   PARENTÉS
============================================================ */

function initialiserParentes() {
    const bouton = document.getElementById("btnAjouterParente");
    if (bouton) bouton.addEventListener("click", () => ajouterParente());
}

function ajouterParente(donnees = {}) {
    const liste = document.getElementById("listeParentes");
    if (!liste) return;

    const bloc = document.createElement("div");
    bloc.className = "member-form parente-form";

    bloc.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>Nom et prénom</label>
                <input type="text" class="parente-nom"
                    value="${escapeHTML(donnees.nomPrenom || "")}">
            </div>

            <div class="form-group">
                <label>Genre</label>
                <select class="parente-Genre">
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                </select>
            </div>

            <div class="form-group">
                <label>Numéro d'identité</label>
                <input type="text" class="parente-identite"
                    value="${escapeHTML(donnees.identite || "")}">
            </div>

            <div class="form-group">
                <label>Âge</label>
                <input type="number" class="parente-age" min="0" max="150"
                    value="${escapeHTML(donnees.age || "")}">
            </div>

            <div class="form-group">
                <label>Lien de parenté</label>
                <input type="text" class="parente-lien"
                    value="${escapeHTML(donnees.lien || "")}"
                    placeholder="Frère, sœur, oncle...">
            </div>

            <div class="form-group">
                <label>Téléphone</label>
                <input type="tel" class="parente-telephone"
                    value="${escapeHTML(donnees.telephone || "")}">
            </div>
        </div>

        <button type="button" class="btn-remove">
            🗑️ Supprimer cette parenté
        </button>
    `;

    const genre = donnees.genre || donnees.sexe;
    if (genre) bloc.querySelector(".parente-Genre").value = genre;

    bloc.querySelector(".btn-remove").addEventListener("click", () => bloc.remove());
    liste.appendChild(bloc);
}

/* ============================================================
   VISITEURS
============================================================ */

function initialiserVisiteurs() {
    const bouton = document.getElementById("btnAjouterVisiteur");
    if (bouton) bouton.addEventListener("click", () => ajouterVisiteur());
}

function ajouterVisiteur(donnees = {}) {
    const liste = document.getElementById("listeVisiteurs");
    if (!liste) return;

    const bloc = document.createElement("div");
    bloc.className = "member-form visiteur-form";

    bloc.innerHTML = `
        <div class="form-grid">
            <div class="form-group">
                <label>Nom et prénom</label>
                <input type="text" class="visiteur-nom"
                    value="${escapeHTML(donnees.nomPrenom || "")}">
            </div>

            <div class="form-group">
                <label>Genre</label>
                <select class="visiteur-Genre">
                    <option value="Masculin">Masculin</option>
                    <option value="Féminin">Féminin</option>
                </select>
            </div>

            <div class="form-group">
                <label>Âge</label>
                <input type="number" class="visiteur-age" min="0" max="150"
                    value="${escapeHTML(donnees.age || "")}">
            </div>

            <div class="form-group">
                <label>Numéro d'identité</label>
                <input type="text" class="visiteur-identite"
                    value="${escapeHTML(donnees.identite || "")}">
            </div>

            <div class="form-group">
                <label>Provenance</label>
                <input type="text" class="visiteur-provenance"
                    value="${escapeHTML(donnees.provenance || "")}"
                    placeholder="D'où vient le visiteur ?">
            </div>
        </div>

        <button type="button" class="btn-remove">
            🗑️ Supprimer ce visiteur
        </button>
    `;

    const genre = donnees.genre || donnees.sexe;
    if (genre) bloc.querySelector(".visiteur-Genre").value = genre;

    bloc.querySelector(".btn-remove").addEventListener("click", () => bloc.remove());
    liste.appendChild(bloc);
}

/* ============================================================
   MODE MODIFICATION
============================================================ */

function verifierModeModification() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("edit") || localStorage.getItem("bpr_menage_a_modifier");

    if (!id) return;

    const menages = lireTableau(MENAGES_KEY);
    const menage = menages.find(m => String(m.id) === String(id));

    if (!menage) {
        localStorage.removeItem("bpr_menage_a_modifier");
        return;
    }

    modeModification = true;
    menageIdActuel = id;

    remplirFormulaire(menage);

    const bouton = document.getElementById("saveButton");
    if (bouton) bouton.innerHTML = "💾 Mettre à jour le ménage";
}

/* ============================================================
   REMPLIR FORMULAIRE
============================================================ */

function remplirFormulaire(menage) {
    setValue("menageId", menage.id);
    setValue("pays", menage.pays || "Burundi");
    setValue("province", menage.province);

    const province = document.getElementById("province");
    const commune = document.getElementById("commune");
    const zone = document.getElementById("zone");
    const colline = document.getElementById("colline");

    if (province) province.dispatchEvent(new Event("change"));

    setTimeout(() => {
        setValue("commune", menage.commune);
        if (commune) commune.dispatchEvent(new Event("change"));

        setTimeout(() => {
            setValue("zone", menage.zone);
            if (zone) zone.dispatchEvent(new Event("change"));

            setTimeout(() => {
                setValue("colline", menage.colline);
            }, 60);
        }, 60);
    }, 60);

    setValue("sousColline", menage.sousColline);
    setValue("chef10Maisons", menage.chef10Maisons || menage.chef10Nom || menage.nomChef10);
    setValue("adresse", menage.adresse);

    const personnes = lireTableau(PERSONNES_KEY);
    const membres = personnes.filter(p => String(p.menageId) === String(menage.id));

    const pere = membres.find(p => p.type === "Père");
    const mere = membres.find(p => p.type === "Mère");

    if (pere) {
        setValue("nomPere", pere.nomPrenom);
        setValue("agePere", pere.age);
        setValue("identitePere", pere.identite);
        setValue("telephonePere", pere.telephone);
    }

    if (mere) {
        setValue("nomMere", mere.nomPrenom);
        setValue("ageMere", mere.age);
        setValue("identiteMere", mere.identite);
        setValue("telephoneMere", mere.telephone);
    }

    const listeEnfants = document.getElementById("listeEnfants");
    if (listeEnfants) {
        listeEnfants.innerHTML = "";
        membres.filter(p => p.type === "Enfant").forEach(ajouterEnfant);
    }

    const listeParentes = document.getElementById("listeParentes");
    if (listeParentes) {
        listeParentes.innerHTML = "";
        membres.filter(p => p.type === "Parenté").forEach(ajouterParente);
    }

    const listeVisiteurs = document.getElementById("listeVisiteurs");
    if (listeVisiteurs) {
        listeVisiteurs.innerHTML = "";
        lireTableau(VISITEURS_KEY)
            .filter(v => String(v.menageId) === String(menage.id))
            .forEach(ajouterVisiteur);
    }
}

/* ============================================================
   FORMULAIRE
============================================================ */

function initialiserFormulaire() {
    const form = document.getElementById("personForm");
    if (form) form.addEventListener("submit", enregistrerMenage);
}

/* ============================================================
   ENREGISTRER / METTRE À JOUR
============================================================ */

function enregistrerMenage(event) {
    event.preventDefault();

    const nomPere = getValue("nomPere").trim();
    const nomMere = getValue("nomMere").trim();

    if (!nomPere) {
        afficherMessage("❌ Le nom du père est obligatoire.", "error");
        return;
    }

    if (!nomMere) {
        afficherMessage("❌ Le nom de la mère est obligatoire.", "error");
        return;
    }

    const province = getValue("province");
    const commune = getValue("commune");
    const zone = getValue("zone");
    const colline = getValue("colline");

    if (!province || !commune || !zone || !colline) {
        afficherMessage(
            "❌ Province, commune, zone et colline sont obligatoires.",
            "error"
        );
        return;
    }

    const id = modeModification ? menageIdActuel : genererID();
    const maintenant = new Date().toISOString();

    const menages = lireTableau(MENAGES_KEY);
    const personnes = lireTableau(PERSONNES_KEY);
    const visiteurs = lireTableau(VISITEURS_KEY);

    const menage = {
        id,
        pays: getValue("pays") || "Burundi",
        province,
        commune,
        zone,
        colline,
        sousColline: getValue("sousColline"),
        chef10Maisons: getValue("chef10Maisons"),
        chefMenage: nomPere,
        adresse: getValue("adresse"),
        dateEnregistrement: maintenant,
        dateModification: maintenant
    };

    const nouvellesPersonnes = [];

    nouvellesPersonnes.push({
        id: genererID(),
        menageId: id,
        type: "Père",
        nomPrenom: nomPere,
        sexe: "Masculin",
        genre: "Masculin",
        age: getValue("agePere"),
        identite: getValue("identitePere"),
        telephone: getValue("telephonePere"),
        pays: menage.pays,
        province,
        commune,
        zone,
        colline,
        sousColline: menage.sousColline,
        chef10Maisons: menage.chef10Maisons,
        dateEnregistrement: maintenant
    });

    nouvellesPersonnes.push({
        id: genererID(),
        menageId: id,
        type: "Mère",
        nomPrenom: nomMere,
        sexe: "Féminin",
        genre: "Féminin",
        age: getValue("ageMere"),
        identite: getValue("identiteMere"),
        telephone: getValue("telephoneMere"),
        pays: menage.pays,
        province,
        commune,
        zone,
        colline,
        sousColline: menage.sousColline,
        chef10Maisons: menage.chef10Maisons,
        dateEnregistrement: maintenant
    });

    document.querySelectorAll(".enfant-form").forEach(bloc => {
        const nom = bloc.querySelector(".enfant-nom")?.value.trim();
        if (!nom) return;

        const genre = bloc.querySelector(".enfant-Genre")?.value || "";

        nouvellesPersonnes.push({
            id: genererID(),
            menageId: id,
            type: "Enfant",
            nomPrenom: nom,
            sexe: genre,
            genre,
            age: bloc.querySelector(".enfant-age")?.value || "",
            identite: bloc.querySelector(".enfant-identite")?.value || "",
            telephone: bloc.querySelector(".enfant-telephone")?.value || "",
            pays: menage.pays,
            province,
            commune,
            zone,
            colline,
            sousColline: menage.sousColline,
            chef10Maisons: menage.chef10Maisons,
            dateEnregistrement: maintenant
        });
    });

    document.querySelectorAll(".parente-form").forEach(bloc => {
        const nom = bloc.querySelector(".parente-nom")?.value.trim();
        if (!nom) return;

        const genre = bloc.querySelector(".parente-Genre")?.value || "";

        nouvellesPersonnes.push({
            id: genererID(),
            menageId: id,
            type: "Parenté",
            nomPrenom: nom,
            sexe: genre,
            genre,
            age: bloc.querySelector(".parente-age")?.value || "",
            identite: bloc.querySelector(".parente-identite")?.value || "",
            telephone: bloc.querySelector(".parente-telephone")?.value || "",
            lien: bloc.querySelector(".parente-lien")?.value || "",
            pays: menage.pays,
            province,
            commune,
            zone,
            colline,
            sousColline: menage.sousColline,
            chef10Maisons: menage.chef10Maisons,
            dateEnregistrement: maintenant
        });
    });

    const nouveauxVisiteurs = [];

    document.querySelectorAll(".visiteur-form").forEach(bloc => {
        const nom = bloc.querySelector(".visiteur-nom")?.value.trim();
        if (!nom) return;

        const genre = bloc.querySelector(".visiteur-Genre")?.value || "";

        nouveauxVisiteurs.push({
            id: genererID(),
            menageId: id,
            nomPrenom: nom,
            sexe: genre,
            genre,
            age: bloc.querySelector(".visiteur-age")?.value || "",
            identite: bloc.querySelector(".visiteur-identite")?.value || "",
            provenance: bloc.querySelector(".visiteur-provenance")?.value || "",
            pays: menage.pays,
            province,
            commune,
            zone,
            colline,
            sousColline: menage.sousColline,
            chef10Maisons: menage.chef10Maisons,
            dateEnregistrement: maintenant
        });
    });

    /* Le ménage reste dans la liste */
    const indexMenage = menages.findIndex(
        m => String(m.id) === String(id)
    );

    if (indexMenage >= 0) {
        menages[indexMenage] = {
            ...menages[indexMenage],
            ...menage
        };
    } else {
        menages.push(menage);
    }

    /* On ne touche qu'aux personnes de CE ménage */
    const personnesSansCeMenage = personnes.filter(
        p => String(p.menageId) !== String(id)
    );

    /* On ne touche qu'aux visiteurs de CE ménage */
    const visiteursSansCeMenage = visiteurs.filter(
        v => String(v.menageId) !== String(id)
    );

    localStorage.setItem(MENAGES_KEY, JSON.stringify(menages));

    localStorage.setItem(
        PERSONNES_KEY,
        JSON.stringify([
            ...personnesSansCeMenage,
            ...nouvellesPersonnes
        ])
    );

    localStorage.setItem(
        VISITEURS_KEY,
        JSON.stringify([
            ...visiteursSansCeMenage,
            ...nouveauxVisiteurs
        ])
    );

    localStorage.setItem("bpr_last_update", maintenant);
    localStorage.setItem("bpr_sync", "true");
    localStorage.setItem("bpr_last_menage_id", String(id));

    afficherMessage(
        modeModification
            ? "✅ Ménage et personnes mis à jour avec succès."
            : "✅ Ménage et personnes enregistrés avec succès.",
        "success"
    );

    setTimeout(() => {
        localStorage.removeItem("bpr_menage_a_modifier");
        window.location.href = "liste.html";
    }, 900);
}

/* ============================================================
   NOUVEAU
============================================================ */

function initialiserBoutonNouveau() {
    const bouton = document.getElementById("btnNouveau");
    if (!bouton) return;

    bouton.addEventListener("click", () => {
        localStorage.removeItem("bpr_menage_a_modifier");
        window.location.href = "inscription.html";
    });
}

/* ============================================================
   DÉCONNEXION
============================================================ */

function initialiserDeconnexion() {
    const bouton = document.getElementById("btnDeconnexion");
    if (!bouton) return;

    bouton.addEventListener("click", () => {
        if (!confirm("Voulez-vous vous déconnecter ?")) return;

        localStorage.removeItem("bpr_current_user");
        localStorage.removeItem("bpr_manager_connecte");
        localStorage.removeItem("isLoggedIn");

        window.location.href = "index.html";
    });
}

/* ============================================================
   MESSAGE
============================================================ */

function afficherMessage(texte, type) {
    const message = document.getElementById("message");

    if (!message) {
        alert(texte);
        return;
    }

    message.textContent = texte;
    message.className = "message " + type;

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

/* ============================================================
   HELPERS
============================================================ */

function lireTableau(cle) {
    try {
        const brut = localStorage.getItem(cle);
        if (!brut) return [];

        const resultat = JSON.parse(brut);
        return Array.isArray(resultat) ? resultat : [];
    } catch (erreur) {
        console.error("Erreur localStorage:", erreur);
        return [];
    }
}

function genererID() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 8)
    );
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value || "" : "";
}

function setValue(id, valeur) {
    const element = document.getElementById(id);
    if (element) element.value = valeur ?? "";
}

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}