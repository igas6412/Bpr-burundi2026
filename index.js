"use strict";

/* ============================================================
   BURUNDI PEOPLE REGISTRY
   index.js
   CONNEXION AVEC FIREBASE AUTHENTICATION + FIRESTORE
   ============================================================ */

import {
    connecter
} from "./bpr-firebase.js";


/* ============================================================
   ÉLÉMENTS HTML
============================================================ */

const loginForm = document.getElementById("loginForm");

const usernameInput =
    document.getElementById("username");

const passwordInput =
    document.getElementById("password");

const loginError =
    document.getElementById("loginError");

const togglePassword =
    document.getElementById("togglePassword");


/* ============================================================
   AFFICHER UN MESSAGE
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
   EFFACER LE MESSAGE
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
   AFFICHER / MASQUER LE MOT DE PASSE
============================================================ */

if (togglePassword && passwordInput) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.textContent = "🙈";

                togglePassword.setAttribute(
                    "aria-label",
                    "Masquer le mot de passe"
                );

            } else {

                passwordInput.type = "password";

                togglePassword.textContent = "👁️";

                togglePassword.setAttribute(
                    "aria-label",
                    "Afficher le mot de passe"
                );
            }
        }
    );
}


/* ============================================================
   EFFACER L'ERREUR LORSQUE L'UTILISATEUR ÉCRIT
============================================================ */

if (usernameInput) {

    usernameInput.addEventListener(
        "input",
        function () {
            effacerMessage();
        }
    );
}


if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        function () {
            effacerMessage();
        }
    );
}


/* ============================================================
   CONNEXION
============================================================ */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* ------------------------------------------------
               RÉCUPÉRER IDENTIFIANT ET MOT DE PASSE
            ------------------------------------------------ */

            const identifiant =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";

            const motDePasse =
                passwordInput
                    ? passwordInput.value
                    : "";


            /* ------------------------------------------------
               VÉRIFICATION IDENTIFIANT
            ------------------------------------------------ */

            if (!identifiant) {

                afficherMessage(
                    "❌ Veuillez saisir votre nom d'utilisateur."
                );

                if (usernameInput) {
                    usernameInput.focus();
                }

                return;
            }


            /* ------------------------------------------------
               VÉRIFICATION MOT DE PASSE
            ------------------------------------------------ */

            if (!motDePasse) {

                afficherMessage(
                    "❌ Veuillez saisir votre mot de passe."
                );

                if (passwordInput) {
                    passwordInput.focus();
                }

                return;
            }


            /* ------------------------------------------------
               MESSAGE DE CHARGEMENT
            ------------------------------------------------ */

            afficherMessage(
                "⏳ Connexion en cours...",
                "succes"
            );


            /* ------------------------------------------------
               DÉSACTIVER LE BOUTON PENDANT LA CONNEXION
            ------------------------------------------------ */

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


            try {

                /* ============================================
                   CONNEXION FIREBASE
                ============================================ */

                const compte =
                    await connecter(
                        identifiant,
                        motDePasse
                    );


                /* ============================================
                   VÉRIFIER LE COMPTE
                ============================================ */

                if (!compte) {

                    afficherMessage(
                        "❌ Identifiant ou mot de passe incorrect."
                    );

                    return;
                }


                /* ============================================
                   STATUT DU COMPTE
                ============================================ */

                const statut =
                    String(
                        compte.statut || "Actif"
                    )
                    .trim()
                    .toLowerCase();


                /* --------------------------------------------
                   COMPTES INACTIFS / BLOQUÉS
                -------------------------------------------- */

                if (
                    statut === "inactif" ||
                    statut === "bloque" ||
                    statut === "bloqué" ||
                    statut === "desactive" ||
                    statut === "désactivé"
                ) {

                    afficherMessage(
                        "❌ Ce compte est désactivé ou bloqué."
                    );

                    return;
                }


                /* ============================================
                   NOM UTILISATEUR
                ============================================ */

                const nomUtilisateur =
                    compte.nomUtilisateur ||
                    compte.nom ||
                    identifiant;


                /* ============================================
                   RÔLE
                ============================================ */

                const role =
                    String(
                        compte.role || ""
                    )
                    .trim();


                const roleNormalise =
                    role.toLowerCase();


                /* ============================================
                   VÉRIFICATION DU RÔLE
                ============================================ */

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
                        "Rôle reçu depuis Firestore :",
                        role
                    );

                    return;
                }


                /* ============================================
                   INFORMATIONS DE SESSION
                ============================================ */

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
                        compte.statut || "Actif",

                    pays:
                        compte.pays || "Burundi",

                    province:
                        compte.province || "",

                    commune:
                        compte.commune || "",

                    zone:
                        compte.zone || "",

                    colline:
                        compte.colline || "",

                    emailFirebase:
                        compte.emailFirebase || ""

                };


                /* ============================================
                   SAUVEGARDER LA SESSION
                ============================================ */

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


                /* ============================================
                   MESSAGE DE SUCCÈS
                ============================================ */

                afficherMessage(
                    "✅ Connexion réussie. Bienvenue " +
                    nomUtilisateur +
                    " !",
                    "succes"
                );


                /* ============================================
                   REDIRECTION SELON LE RÔLE
                ============================================ */

                setTimeout(
                    function () {


                        /* ------------------------------------
                           MANAGER NATIONAL
                        ------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager national"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------
                           MANAGER PROVINCIAL
                        ------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager provincial"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------
                           MANAGER COMMUNAL
                        ------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager communal"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------
                           MANAGER ZONAL
                        ------------------------------------ */

                        if (
                            roleNormalise ===
                            "manager zonal"
                        ) {

                            window.location.href =
                                "manager.html";

                            return;
                        }


                        /* ------------------------------------
                           UTILISATEUR
                        ------------------------------------ */

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
                    "===================================="
                );

                console.error(
                    "ERREUR CONNEXION FIREBASE"
                );

                console.error(
                    error
                );

                console.error(
                    "Code :",
                    error?.code
                );

                console.error(
                    "Message :",
                    error?.message
                );

                console.error(
                    "===================================="
                );


                /* ============================================
                   MESSAGE D'ERREUR PAR CODE FIREBASE
                ============================================ */

                let message =
                    "❌ Identifiant ou mot de passe incorrect.";


                if (error && error.code) {

                    switch (error.code) {


                        /* ------------------------------------
                           IDENTIFIANT / MOT DE PASSE INCORRECT
                        ------------------------------------ */

                        case "auth/invalid-credential":

                            message =
                                "❌ Identifiant ou mot de passe incorrect.";

                            break;


                        /* ------------------------------------
                           UTILISATEUR INTROUVABLE
                        ------------------------------------ */

                        case "auth/user-not-found":

                            message =
                                "❌ Ce nom d'utilisateur n'existe pas.";

                            break;


                        /* ------------------------------------
                           MOT DE PASSE INCORRECT
                        ------------------------------------ */

                        case "auth/wrong-password":

                            message =
                                "❌ Mot de passe incorrect.";

                            break;


                        /* ------------------------------------
                           EMAIL / IDENTIFIANT INVALIDE
                        ------------------------------------ */

                        case "auth/invalid-email":

                            message =
                                "❌ Identifiant invalide.";

                            break;


                        /* ------------------------------------
                           TROP DE TENTATIVES
                        ------------------------------------ */

                        case "auth/too-many-requests":

                            message =
                                "❌ Trop de tentatives. Réessayez plus tard.";

                            break;


                        /* ------------------------------------
                           INTERNET
                        ------------------------------------ */

                        case "auth/network-request-failed":

                            message =
                                "❌ Problème de connexion Internet.";

                            break;


                        /* ------------------------------------
                           FIRESTORE
                        ------------------------------------ */

                        case "permission-denied":

                            message =
                                "❌ Accès Firestore refusé.";

                            break;


                        /* ------------------------------------
                           UTILISATEUR DÉSACTIVÉ FIREBASE
                        ------------------------------------ */

                        case "auth/user-disabled":

                            message =
                                "❌ Ce compte Firebase est désactivé.";

                            break;


                        /* ------------------------------------
                           OPÉRATION NON AUTORISÉE
                        ------------------------------------ */

                        case "auth/operation-not-allowed":

                            message =
                                "❌ La connexion Email/Mot de passe n'est pas activée dans Firebase.";

                            break;


                        /* ------------------------------------
                           ERREUR PAR DÉFAUT
                        ------------------------------------ */

                        default:

                            message =
                                "❌ Erreur Firebase : " +
                                error.code;

                            break;
                    }
                }


                afficherMessage(message);


            } finally {


                /* ============================================
                   RÉACTIVER LE BOUTON
                ============================================ */

                if (boutonConnexion) {

                    boutonConnexion.disabled = false;

                    boutonConnexion.textContent =
                        ancienTexte ||
                        "🔐 Se connecter";
                }
            }

        }
    );
}


/* ============================================================
   VÉRIFICATION DE LA PAGE
============================================================ */

console.log(
    "✅ BPR index.js chargé avec succès."
);

console.log(
    "🔥 Login Firebase prêt."
);


/* ============================================================
   FIN INDEX.JS
============================================================ */