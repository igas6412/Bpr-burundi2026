

/* ============================================================
   BURUNDI PEOPLE REGISTRY
   index.js
   CONNEXION FIREBASE + SESSION + TERRITOIRE
   ============================================================ */

import { connecter as connecterFirebase } from "./bpr-firebase.js";


/* ============================================================
   CONFIGURATION IGAS
   ============================================================ */

const IGAS_USERNAME = "IGAS";
const IGAS_PASSWORD = "123123";


/* ============================================================
   ELEMENTS HTML
   ============================================================ */

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const messageLogin =
    document.getElementById("messageLogin");


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
   NORMALISER ROLE
   ============================================================ */

function normaliserRole(role) {

    const valeur =
        normaliserTexte(role);

    if (
        valeur === "manager national" ||
        valeur === "manager"
    ) {
        return "Manager National";
    }

    if (
        valeur === "manager provincial"
    ) {
        return "Manager Provincial";
    }

    if (
        valeur === "manager communal"
    ) {
        return "Manager Communal";
    }

    if (
        valeur === "manager zonal"
    ) {
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
   NORMALISER COMPTE
   Compatible avec Firebase et ancien système
   ============================================================ */

function normaliserCompte(compte) {

    if (!compte) {
        return null;
    }

    const role =
        normaliserRole(compte.role);

    const resultat = {

        id:
            compte.id ??
            compte.uid ??
            "",

        uid:
            compte.uid ??
            compte.id ??
            "",

        nom:
            compte.nomUtilisateur ??
            compte.nom ??
            "",

        nomUtilisateur:
            compte.nomUtilisateur ??
            compte.nom ??
            "",

        identifiant:
            compte.identifiant ??
            "",

        role:
            role,

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
            "Actif",

        creeParUid:
            compte.creeParUid ||
            "",

        creePar:
            compte.creePar ||
            "",

        creeParRole:
            compte.creeParRole ||
            ""
    };


    /* ========================================================
       TERRITOIRE SELON LE ROLE
       ======================================================== */

    if (
        role === "Manager National"
    ) {

        resultat.pays =
            "BURUNDI";

        resultat.province = "";
        resultat.commune = "";
        resultat.zone = "";
        resultat.colline = "";
    }

    else if (
        role === "Manager Provincial"
    ) {

        resultat.commune = "";
        resultat.zone = "";
        resultat.colline = "";
    }

    else if (
        role === "Manager Communal"
    ) {

        resultat.zone = "";
        resultat.colline = "";
    }

    else if (
        role === "Manager Zonal"
    ) {

        resultat.colline = "";
    }

    return resultat;
}


/* ============================================================
   SAUVEGARDER SESSION BPR
   ============================================================ */

function sauvegarderSession(compte) {

    const compteConnecte =
        normaliserCompte(compte);

    if (!compteConnecte) {

        console.error(
            "Compte invalide."
        );

        return false;
    }


    /* Session générale */

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


    /* Territoire */

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


    /* Compatibilité avec l'ancien système */

    localStorage.setItem(
        "bpr_current_user",
        JSON.stringify(compteConnecte)
    );

    localStorage.setItem(
        "bpr_manager_connecte",
        JSON.stringify(compteConnecte)
    );


    /* IMPORTANT :
       compte.js utilise cette clé. */

    localStorage.setItem(
        "BPR_COMPTE_CONNECTE",
        JSON.stringify(compteConnecte)
    );


    console.log(
        "===================================="
    );

    console.log(
        "COMPTE BPR CONNECTE"
    );

    console.log(
        "Nom :",
        compteConnecte.nom
    );

    console.log(
        "Identifiant :",
        compteConnecte.identifiant
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
   Compte national initial / secours
   ============================================================ */

function connexionIGAS(
    username,
    password
) {

    if (
        normaliserTexte(username) !==
        normaliserTexte(IGAS_USERNAME)
    ) {
        return false;
    }

    if (
        password !==
        IGAS_PASSWORD
    ) {
        return false;
    }


    const compteIGAS = {

        id: "IGAS",

        uid: "IGAS",

        nom: "IGAS",

        nomUtilisateur: "IGAS",

        identifiant: "IGAS",

        role: "Manager National",

        pays: "BURUNDI",

        province: "",

        commune: "",

        zone: "",

        colline: "",

        statut: "Actif"

    };


    return sauvegarderSession(
        compteIGAS
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
   CONNEXION FIREBASE
   ============================================================ */

async function connexionFirebase(
    username,
    password
) {

    const compte =
        await connecterFirebase(
            username,
            password
        );


    if (!compte) {

        throw new Error(
            "Compte BPR introuvable."
        );
    }


    /* Vérification du statut */

    const statut =
        normaliserTexte(
            compte.statut ||
            "Actif"
        );

    if (
        statut === "inactif"
    ) {

        throw new Error(
            "Ce compte est inactif."
        );
    }


    /* Sauvegarde dans toutes les clés nécessaires */

    const ok =
        sauvegarderSession(
            compte
        );


    if (!ok) {

        throw new Error(
            "Impossible de sauvegarder la session."
        );
    }


    return compte;
}


/* ============================================================
   GERER CONNEXION
   ============================================================ */

async function gererConnexion(event) {

    event.preventDefault();


    const username =
        usernameInput
            ? usernameInput.value.trim()
            : "";

    const password =
        passwordInput
            ? passwordInput.value
            : "";


    if (!username || !password) {

        afficherMessage(
            "⚠️ Remplissez l'identifiant et le mot de passe.",
            "error"
        );

        return;
    }


    try {

        afficherMessage(
            "⏳ Connexion...",
            "info"
        );


        /* ====================================================
           IGAS
        ==================================================== */

        if (
            normaliserTexte(username) ===
            normaliserTexte(IGAS_USERNAME)
            &&
            password ===
            IGAS_PASSWORD
        ) {

            const ok =
                connexionIGAS(
                    username,
                    password
                );


            if (!ok) {

                throw new Error(
                    "Connexion IGAS impossible."
                );
            }


            afficherMessage(
                "✅ Connexion réussie.",
                "success"
            );


            setTimeout(
                function () {

                    window.location.href =
                        "accueil.html";

                },
                300
            );

            return;
        }


        /* ====================================================
           AUTRES COMPTES : FIREBASE
        ==================================================== */

        await connexionFirebase(
            username,
            password
        );


        afficherMessage(
            "✅ Connexion réussie.",
            "success"
        );


        setTimeout(
            function () {

                window.location.href =
                    "accueil.html";

            },
            300
        );


    } catch (erreur) {

        console.error(
            "Erreur connexion BPR :",
            erreur
        );


        let message =
            erreur?.message ||
            "Identifiant ou mot de passe incorrect.";


        /* Messages Firebase plus simples */

        if (
            message.includes(
                "auth/invalid-credential"
            )
        ) {

            message =
                "❌ Identifiant ou mot de passe incorrect.";
        }

        else if (
            message.includes(
                "auth/user-not-found"
            )
        ) {

            message =
                "❌ Ce compte n'existe pas dans Firebase.";
        }

        else if (
            message.includes(
                "auth/wrong-password"
            )
        ) {

            message =
                "❌ Mot de passe incorrect.";
        }

        else if (
            message.includes(
                "auth/invalid-email"
            )
        ) {

            message =
                "❌ Identifiant invalide.";
        }

        else if (
            message.includes(
                "auth/too-many-requests"
            )
        ) {

            message =
                "❌ Trop de tentatives. Réessayez plus tard.";
        }


        afficherMessage(
            message,
            "error"
        );
    }
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
                "BPR_COMPTE_CONNECTE"
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


/* ============================================================
   BOUTON 👁️ AFFICHER / MASQUER MOT DE PASSE
   ============================================================ */

const togglePassword =
    document.getElementById(
        "togglePassword"
    );


if (
    passwordInput &&
    togglePassword
) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                togglePassword.textContent =
                    "🙈";

                togglePassword.setAttribute(
                    "aria-label",
                    "Masquer le mot de passe"
                );

                togglePassword.setAttribute(
                    "title",
                    "Masquer le mot de passe"
                );

            }

            else {

                passwordInput.type =
                    "password";

                togglePassword.textContent =
                    "👁️";

                togglePassword.setAttribute(
                    "aria-label",
                    "Afficher le mot de passe"
                );

                togglePassword.setAttribute(
                    "title",
                    "Afficher le mot de passe"
                );
            }

        }
    );

}