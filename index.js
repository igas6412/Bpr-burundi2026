"use strict";

/* ============================================================
   BURUNDI PEOPLE REGISTRY
   index.js
   LOGIN AVEC FIREBASE AUTHENTICATION
   ============================================================ */

import { connecter } from "./bpr-firebase.js";


/* ============================================================
   ÉLÉMENTS HTML
============================================================ */

const loginForm =
    document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const togglePassword =
    document.getElementById("togglePassword");


/* ============================================================
   AFFICHER MESSAGE
============================================================ */

function afficherMessage(message, type = "erreur") {

    if (!loginError) {
        alert(message);
        return;
    }

    loginError.textContent = message;

    loginError.className =
        "login-error " + type;
}


/* ============================================================
   EFFACER MESSAGE
============================================================ */

function effacerMessage() {

    if (!loginError) {
        return;
    }

    loginError.textContent = "";

    loginError.className =
        "login-error";
}


/* ============================================================
   AFFICHER / MASQUER MOT DE PASSE
============================================================ */

if (togglePassword && passwordInput) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type = "text";

                togglePassword.textContent =
                    "🙈";

                togglePassword.setAttribute(
                    "aria-label",
                    "Masquer le mot de passe"
                );

            } else {

                passwordInput.type =
                    "password";

                togglePassword.textContent =
                    "👁️";

                togglePassword.setAttribute(
                    "aria-label",
                    "Afficher le mot de passe"
                );
            }
        }
    );
}


/* ============================================================
   EFFACER MESSAGE QUAND ON ÉCRIT
============================================================ */

if (usernameInput) {

    usernameInput.addEventListener(
        "input",
        effacerMessage
    );
}

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        effacerMessage
    );
}


/* ============================================================
   FORMULAIRE LOGIN
============================================================ */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ==================================================
               RÉCUPÉRER LES DONNÉES
            ================================================== */

            const identifiant =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";

            const motDePasse =
                passwordInput
                    ? passwordInput.value
                    : "";


            /* ==================================================
               CHAMPS VIDES
            ================================================== */

            if (!identifiant) {

                afficherMessage(
                    "❌ Veuillez saisir votre nom d'utilisateur."
                );

                usernameInput?.focus();

                return;
            }


            if (!motDePasse) {

                afficherMessage(
                    "❌ Veuillez saisir votre mot de passe."
                );

                passwordInput?.focus();

                return;
            }


            /* ==================================================
               BOUTON CONNEXION
            ================================================== */

            const boutonConnexion =
                loginForm.querySelector(
                    'button[type="submit"]'
                );

            const ancienTexte =
                boutonConnexion
                    ? boutonConnexion.textContent
                    : "";


            if (boutonConnexion) {

                boutonConnexion.disabled = true;

                boutonConnexion.textContent =
                    "⏳ Connexion...";
            }


            afficherMessage(
                "⏳ Connexion en cours...",
                "succes"
            );


            /* ==================================================
               CONNEXION FIREBASE
            ================================================== */

            try {

                const compte =
                    await connecter(
                        identifiant,
                        motDePasse
                    );


                /* ==================================================
                   COMPTE INTROUVABLE
                ================================================== */

                if (!compte) {

                    afficherMessage(
                        "❌ Identifiant ou mot de passe incorrect."
                    );

                    return;
                }


                /* ==================================================
                   STATUT DU COMPTE
                ================================================== */

                const statut =
                    String(
                        compte.statut || "Actif"
                    )
                    .trim()
                    .toLowerCase();


                if (
                    statut === "inactif" ||
                    statut === "bloque" ||
                    statut === "bloqué" ||
                    statut === "desactive" ||
                    statut === "désactivé"
                ) {

                    afficherMessage(
                        "❌ Ce compte est désactivé."
                    );

                    return;
                }


                /* ==================================================
                   NOM
                ================================================== */

                const nomUtilisateur =
                    compte.nomUtilisateur ||
                    compte.nom ||
                    identifiant;


                /* ==================================================
                   RÔLE
                ================================================== */

                const role =
                    String(
                        compte.role || ""
                    ).trim();


                const roleNormalise =
                    role.toLowerCase();


                /* ==================================================
                   RÔLES AUTORISÉS
                ================================================== */

                const rolesAutorises = [

                    "manager national",

                    "manager provincial",

                    "manager communal",

                    "manager zonal",

                    "utilisateur"

                ];


                if (
                    !rolesAutorises.includes(
                        roleNormalise
                    )
                ) {

                    afficherMessage(
                        "❌ Le rôle de ce compte n'est pas reconnu."
                    );

                    console.error(
                        "Rôle reçu :",
                        role
                    );

                    return;
                }


                /* ==================================================
                   SESSION
                ================================================== */

                const session = {

                    uid:
                        compte.uid || "",

                    nomUtilisateur:
                        nomUtilisateur,

                    identifiant:
                        compte.identifiant ||
                        identifiant,

                    role:
                        compte.role || "",

                    statut:
                        compte.statut ||
                        "Actif",

                    pays:
                        compte.pays ||
                        "Burundi",

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

                    emailFirebase:
                        compte.emailFirebase ||
                        ""

                };


                /* ==================================================
                   SAUVEGARDER SESSION
                ================================================== */

                localStorage.setItem(
                    "BPR_COMPTE_CONNECTE",
                    JSON.stringify(session)
                );

                localStorage.setItem(
                    "BPR_USER",
                    JSON.stringify(session)
                );

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(session)
                );

                localStorage.setItem(
                    "utilisateurConnecte",
                    JSON.stringify(session)
                );


                /* ==================================================
                   CONNEXION RÉUSSIE
                ================================================== */

                afficherMessage(
                    "✅ Connexion réussie. Bienvenue " +
                    nomUtilisateur +
                    " !",
                    "succes"
                );


                /* ==================================================
                   REDIRECTION
                ================================================== */

                setTimeout(
                    function () {


                        /* ------------------------------------------
                           MANAGER NATIONAL
                        ------------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager national"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------------
                           MANAGER PROVINCIAL
                        ------------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager provincial"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------------
                           MANAGER COMMUNAL
                        ------------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager communal"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------------
                           MANAGER ZONAL
                        ------------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager zonal"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------------
                           UTILISATEUR
                        ------------------------------------------ */

                        if (
                            roleNormalise ===
                            "utilisateur"
                        ) {

                            window.location.href =
                                "accueil.html";

                            return;
                        }

                    },
                    700
                );


            } catch (error) {

                console.error(
                    "===== ERREUR LOGIN FIREBASE ====="
                );

                console.error(error);

                console.error(
                    "Code Firebase :",
                    error?.code
                );

                console.error(
                    "Message :",
                    error?.message
                );


                /* ==================================================
                   MESSAGE D'ERREUR
                ================================================== */

                let message =
                    "❌ Erreur pendant la connexion.";


                if (error?.code) {

                    switch (error.code) {


                        case "auth/invalid-credential":

                            message =
                                "❌ Identifiant ou mot de passe incorrect.";

                            break;


                        case "auth/user-not-found":

                            message =
                                "❌ Cet utilisateur n'existe pas.";

                            break;


                        case "auth/wrong-password":

                            message =
                                "❌ Mot de passe incorrect.";

                            break;


                        case "auth/invalid-email":

                            message =
                                "❌ Identifiant invalide.";

                            break;


                        case "auth/user-disabled":

                            message =
                                "❌ Ce compte Firebase est désactivé.";

                            break;


                        case "auth/too-many-requests":

                            message =
                                "❌ Trop de tentatives. Réessayez plus tard.";

                            break;


                        case "auth/network-request-failed":

                            message =
                                "❌ Vérifiez votre connexion Internet.";

                            break;


                        case "auth/operation-not-allowed":

                            message =
                                "❌ La connexion Email/Mot de passe n'est pas activée dans Firebase.";

                            break;


                        case "permission-denied":

                            message =
                                "❌ Accès Firestore refusé.";

                            break;


                        default:

                            message =
                                "❌ Erreur Firebase : " +
                                error.code;

                            break;
                    }
                }


                afficherMessage(message);

            } finally {

                /* ==================================================
                   RÉACTIVER LE BOUTON
                ================================================== */

                if (boutonConnexion) {

                    boutonConnexion.disabled =
                        false;

                    boutonConnexion.textContent =
                        ancienTexte ||
                        "🔐 Se connecter";
                }
            }
        }
    );
}


/* ============================================================
   TEST
============================================================ */

console.log(
    "✅ BPR index.js chargé."
);

console.log(
    "🔥 Firebase Login prêt."
);


/* ============================================================
   FIN
============================================================ */