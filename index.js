"use strict";

/* ============================================================
   BURUNDI PEOPLE REGISTRY
   index.js
   CONNEXION + SESSION + TERRITOIRE
   ============================================================ */

const IGAS_USERNAME = "IGAS";
const IGAS_PASSWORD = "123123";
const USERS_KEY = "bpr_utilisateurs";

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const messageLogin = document.getElementById("messageLogin");


/* ============================================================
   NORMALISER TEXTE
   ============================================================ */

function normaliserTexte(valeur) {
    return String(valeur ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


/* ============================================================
   LIRE LES COMPTES
   ============================================================ */

function obtenirComptes() {
    try {
        const donnees = localStorage.getItem(USERS_KEY);

        if (!donnees) {
            return [];
        }

        const comptes = JSON.parse(donnees);

        return Array.isArray(comptes) ? comptes : [];

    } catch (erreur) {

        console.error(
            "Erreur lecture comptes :",
            erreur
        );

        return [];
    }
}


/* ============================================================
   NORMALISER LE ROLE
   ============================================================ */

function normaliserRole(role) {

    const valeur = normaliserTexte(role);

    if (
        valeur === "manager national" ||
        valeur === "manager"
    ) {
        return "Manager National";
    }

    if (valeur === "manager provincial") {
        return "Manager Provincial";
    }

    if (valeur === "manager communal") {
        return "Manager Communal";
    }

    if (valeur === "manager zonal") {
        return "Manager Zonal";
    }

    if (
        valeur === "utilisateur" ||
        valeur === "user"
    ) {
        return "Utilisateur";
    }

    return String(role || "").trim();
}


/* ============================================================
   NORMALISER LE COMPTE
   ============================================================ */

function normaliserCompte(compte) {

    if (!compte) {
        return null;
    }

    const role = normaliserRole(compte.role);

    /*
     IMPORTANT :
     On garde commune, zone et colline.
     On ne les supprime PAS ici.
    */

    const resultat = {

        id: compte.id ?? "",

        nom: compte.nom ?? "",

        identifiant:
            compte.identifiant ?? "",

        motDePasse:
            compte.motDePasse ?? "",

        role: role,

        pays:
            compte.pays ||
            "BURUNDI",

        province:
            compte.province ||
            "",

        commune:
            compte.commune ||
            "",

        zone:
            compte.zone ||
            "",

        colline:
            compte.colline ||
            "",

        statut:
            compte.statut ||
            "Actif"
    };


    /* ========================================================
       MANAGER NATIONAL
       ======================================================== */

    if (role === "Manager National") {

        resultat.pays = "BURUNDI";

        resultat.province = "";

        resultat.commune = "";

        resultat.zone = "";

        resultat.colline = "";
    }


    /* ========================================================
       MANAGER PROVINCIAL
       ======================================================== */

    else if (role === "Manager Provincial") {

        resultat.province =
            resultat.province || "";

        resultat.commune = "";

        resultat.zone = "";

        resultat.colline = "";
    }


    /* ========================================================
       MANAGER COMMUNAL
       ======================================================== */

    else if (role === "Manager Communal") {

        resultat.province =
            resultat.province || "";

        resultat.commune =
            resultat.commune || "";

        resultat.zone = "";

        resultat.colline = "";
    }


    /* ========================================================
       MANAGER ZONAL
       ======================================================== */

    else if (role === "Manager Zonal") {

        resultat.province =
            resultat.province || "";

        resultat.commune =
            resultat.commune || "";

        resultat.zone =
            resultat.zone || "";

        resultat.colline = "";
    }


    /* ========================================================
       UTILISATEUR
       ======================================================== */

    else if (role === "Utilisateur") {

        resultat.province =
            resultat.province || "";

        resultat.commune =
            resultat.commune || "";

        resultat.zone =
            resultat.zone || "";

        resultat.colline =
            resultat.colline || "";
    }


    return resultat;
}


/* ============================================================
   SAUVEGARDER SESSION
   ============================================================ */

function connecter(compte) {

    const compteConnecte =
        normaliserCompte(compte);

    if (!compteConnecte) {

        console.error(
            "Compte invalide."
        );

        return false;
    }


    /* ========================================================
       SESSION GENERALE
       ======================================================== */

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    localStorage.setItem(
        "username",
        compteConnecte.identifiant
    );

    localStorage.setItem(
        "userName",
        compteConnecte.nom
    );

    localStorage.setItem(
        "userId",
        String(compteConnecte.id)
    );

    localStorage.setItem(
        "userRole",
        compteConnecte.role
    );


    /* ========================================================
       TERRITOIRE
       ======================================================== */

    localStorage.setItem(
        "userPays",
        compteConnecte.pays
    );

    localStorage.setItem(
        "userProvince",
        compteConnecte.province
    );

    localStorage.setItem(
        "userCommune",
        compteConnecte.commune
    );

    localStorage.setItem(
        "userZone",
        compteConnecte.zone
    );

    localStorage.setItem(
        "userColline",
        compteConnecte.colline
    );


    /* ========================================================
       COMPTE COMPLET
       ======================================================== */

    localStorage.setItem(
        "bpr_current_user",
        JSON.stringify(compteConnecte)
    );

    localStorage.setItem(
        "bpr_manager_connecte",
        JSON.stringify(compteConnecte)
    );


    /* ========================================================
       DEBUG
       ======================================================== */

    console.log(
        "===================================="
    );

    console.log(
        "COMPTE CONNECTE"
    );

    console.log(
        "Nom :",
        compteConnecte.nom
    );

    console.log(
        "Role :",
        compteConnecte.role
    );

    console.log(
        "Province :",
        compteConnecte.province
    );

    console.log(
        "Commune :",
        compteConnecte.commune
    );

    console.log(
        "Zone :",
        compteConnecte.zone
    );

    console.log(
        "Colline :",
        compteConnecte.colline
    );

    console.log(
        "===================================="
    );


    return true;
}


/* ============================================================
   CONNEXION IGAS
   ============================================================ */

function connexionIGAS(
    username,
    password
) {

    if (
        username !== IGAS_USERNAME ||
        password !== IGAS_PASSWORD
    ) {
        return false;
    }


    const compteIGAS = {

        id: "IGAS",

        nom: "IGAS",

        identifiant: "IGAS",

        role: "Manager National",

        pays: "BURUNDI",

        province: "",

        commune: "",

        zone: "",

        colline: "",

        statut: "Actif"
    };


    return connecter(
        compteIGAS
    );
}


/* ============================================================
   CONNEXION COMPTE CREE DANS COMPTE.JS
   ============================================================ */

function connexionCompte(
    username,
    password
) {

    const comptes =
        obtenirComptes();


    const compte =
        comptes.find(
            utilisateur => {

                const identifiant =
                    String(
                        utilisateur.identifiant ||
                        ""
                    ).trim();


                const motDePasse =
                    String(
                        utilisateur.motDePasse ||
                        ""
                    );


                return (
                    normaliserTexte(
                        identifiant
                    ) ===
                    normaliserTexte(
                        username
                    )
                    &&
                    motDePasse ===
                    password
                );
            }
        );


    if (!compte) {

        return false;
    }


    /* ========================================================
       VERIFICATION STATUT
       ======================================================== */

    const statut =
        normaliserTexte(
            compte.statut ||
            "Actif"
        );


    if (
        statut === "inactif"
    ) {

        afficherMessage(
            "Ce compte est inactif.",
            "error"
        );

        return false;
    }


    /* ========================================================
       CONNEXION
       ======================================================== */

    return connecter(
        compte
    );
}


/* ============================================================
   MESSAGE
   ============================================================ */

function afficherMessage(
    message,
    type = "error"
) {

    if (!messageLogin) {

        alert(message);

        return;
    }


    messageLogin.textContent =
        message;

    messageLogin.className =
        "message " + type;
}


/* ============================================================
   GERER CONNEXION
   ============================================================ */

function gererConnexion(event) {

    event.preventDefault();


    const username =
        usernameInput
            ? usernameInput.value.trim()
            : "";


    const password =
        passwordInput
            ? passwordInput.value
            : "";


    if (
        !username ||
        !password
    ) {

        afficherMessage(
            "Veuillez entrer votre nom d'utilisateur et votre mot de passe.",
            "error"
        );

        return;
    }


    /* ========================================================
       IGAS
       ======================================================== */

    if (
        normaliserTexte(username) ===
        normaliserTexte(IGAS_USERNAME)
        &&
        password === IGAS_PASSWORD
    ) {

        const ok =
            connexionIGAS(
                username,
                password
            );


        if (ok) {

            window.location.href =
                "accueil.html";
        }

        return;
    }


    /* ========================================================
       AUTRES COMPTES
       ======================================================== */

    const ok =
        connexionCompte(
            username,
            password
        );


    if (!ok) {

        afficherMessage(
            "Nom d'utilisateur ou mot de passe incorrect.",
            "error"
        );

        return;
    }


    window.location.href =
        "accueil.html";
}


/* ============================================================
   EVENT LOGIN
   ============================================================ */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        gererConnexion
    );
}


/* ============================================================
   AFFICHER SESSION ACTUELLE
   ============================================================ */

function afficherSession() {

    try {

        const session =
            localStorage.getItem(
                "bpr_current_user"
            );


        if (session) {

            console.log(
                "================================"
            );

            console.log(
                "SESSION BPR"
            );

            console.log(
                JSON.parse(session)
            );

            console.log(
                "================================"
            );
        }

    } catch (erreur) {

        console.error(
            "Erreur session :",
            erreur
        );
    }
}


afficherSession();
function normaliserCompte(compte) {

    if (!compte) return null;

    const roleTexte = String(compte.role || "").trim();
    const roleNormalise = normaliserTexte(roleTexte);

    let role = roleTexte;

    if (roleNormalise === "manager national") {
        role = "Manager National";
    } 
    else if (roleNormalise === "manager provincial") {
        role = "Manager Provincial";
    } 
    else if (roleNormalise === "manager communal") {
        role = "Manager Communal";
    } 
    else if (roleNormalise === "manager zonal") {
        role = "Manager Zonal";
    } 
    else if (
        roleNormalise === "utilisateur" ||
        roleNormalise === "user"
    ) {
        role = "Utilisateur";
    }

    /*
     * IMPORTANT :
     * Ntitukura commune, zone na colline.
     * Turabika territoire nyayo compte yarahawe.
     */

    return {
        id: compte.id ?? "",
        nom: compte.nom ?? "",
        identifiant: compte.identifiant ?? "",

        role: role,

        pays: compte.pays || "BURUNDI",

        province: compte.province || "",
        commune: compte.commune || "",
        zone: compte.zone || "",
        colline: compte.colline || "",

        statut: compte.statut || "Actif"
    };
}


function connecter(compte) {

    const compteConnecte =
        normaliserCompte(compte);

    if (!compteConnecte) {
        return false;
    }

    /* SESSION */
    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    localStorage.setItem(
        "username",
        compteConnecte.identifiant
    );

    localStorage.setItem(
        "userName",
        compteConnecte.nom
    );

    localStorage.setItem(
        "userId",
        String(compteConnecte.id)
    );

    localStorage.setItem(
        "userRole",
        compteConnecte.role
    );

    /* TERRITOIRE */
    localStorage.setItem(
        "userPays",
        compteConnecte.pays
    );

    localStorage.setItem(
        "userProvince",
        compteConnecte.province
    );

    localStorage.setItem(
        "userCommune",
        compteConnecte.commune
    );

    localStorage.setItem(
        "userZone",
        compteConnecte.zone
    );

    localStorage.setItem(
        "userColline",
        compteConnecte.colline
    );

    /* COMPTE COMPLET */
    localStorage.setItem(
        "bpr_current_user",
        JSON.stringify(compteConnecte)
    );

    localStorage.setItem(
        "bpr_manager_connecte",
        JSON.stringify(compteConnecte)
    );

    return true;
}
/* =========================================================
   BOUTON 👁️ AFFICHER / MASQUER MOT DE PASSE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    if (!passwordInput || !togglePassword) {
        console.error("Champ password ou bouton 👁️ introuvable.");
        return;
    }

    togglePassword.addEventListener("click", function () {

        // Mot de passe yihishe
        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "🙈";

            togglePassword.setAttribute(
                "aria-label",
                "Masquer le mot de passe"
            );

            togglePassword.setAttribute(
                "title",
                "Masquer le mot de passe"
            );

        }

        // Mot de passe uboneka
        else {

            passwordInput.type = "password";

            togglePassword.textContent = "👁️";

            togglePassword.setAttribute(
                "aria-label",
                "Afficher le mot de passe"
            );

            togglePassword.setAttribute(
                "title",
                "Afficher le mot de passe"
            );

        }

    });

});