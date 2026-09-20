/* =========================================================
   BURUNDI PEOPLE REGISTRY
   MANAGER.JS
   TABLEAU DE BORD MANAGER NATIONAL
========================================================= */

const MENAGES_KEY = "bpr_menages";
const PERSONNES_KEY = "bpr_personnes";
const UTILISATEURS_KEY = "bpr_utilisateurs";

let tousLesMenages = [];
let toutesLesPersonnes = [];
let tousLesUtilisateurs = [];


/* =========================================================
   UTILITAIRES
========================================================= */

function lireStorage(cle) {
    try {
        const data = localStorage.getItem(cle);
        return data ? JSON.parse(data) : [];
    } catch (erreur) {
        console.error("Erreur storage :", erreur);
        return [];
    }
}

function valeur(objet, ...cles) {
    for (const cle of cles) {
        if (
            objet &&
            objet[cle] !== undefined &&
            objet[cle] !== null
        ) {
            return String(objet[cle]);
        }
    }

    return "";
}

function normaliser(texte) {
    return String(texte || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


/* =========================================================
   CHARGEMENT
========================================================= */

function chargerDonnees() {

    tousLesMenages =
        lireStorage(MENAGES_KEY);

    toutesLesPersonnes =
        lireStorage(PERSONNES_KEY);

    tousLesUtilisateurs =
        lireStorage(UTILISATEURS_KEY);

    /* Les visiteurs ne sont pas comptés */
    toutesLesPersonnes =
        toutesLesPersonnes.filter(personne => {

            const type =
                normaliser(
                    valeur(personne, "type")
                );

            return type !== "visiteur" &&
                   type !== "visiteuse";
        });
}


/* =========================================================
   DATE
========================================================= */

function afficherDate() {

    const element =
        document.getElementById("dateActuelle");

    if (!element) return;

    const maintenant = new Date();

    element.textContent =
        maintenant.toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}


/* =========================================================
   STATISTIQUES
========================================================= */

function afficherStatistiques() {

    const totalMenages =
        document.getElementById("totalMenages");

    const totalPersonnes =
        document.getElementById("totalPersonnes");

    const totalUtilisateurs =
        document.getElementById("totalUtilisateurs");

    const totalProvinces =
        document.getElementById("totalProvinces");


    if (totalMenages) {
        totalMenages.textContent =
            tousLesMenages.length;
    }


    if (totalPersonnes) {
        totalPersonnes.textContent =
            toutesLesPersonnes.length;
    }


    if (totalUtilisateurs) {
        totalUtilisateurs.textContent =
            tousLesUtilisateurs.length;
    }


    if (totalProvinces) {

        const provinces = new Set();

        tousLesMenages.forEach(menage => {

            const province =
                valeur(menage, "province");

            if (province) {
                provinces.add(province);
            }
        });

        totalProvinces.textContent =
            provinces.size;
    }


    const rapportMenages =
        document.getElementById(
            "rapportTotalMenages"
        );

    const rapportPersonnes =
        document.getElementById(
            "rapportTotalPersonnes"
        );

    const rapportUtilisateurs =
        document.getElementById(
            "rapportTotalUtilisateurs"
        );

    const rapportMoyenne =
        document.getElementById(
            "rapportMoyenne"
        );


    if (rapportMenages) {
        rapportMenages.textContent =
            tousLesMenages.length;
    }


    if (rapportPersonnes) {
        rapportPersonnes.textContent =
            toutesLesPersonnes.length;
    }


    if (rapportUtilisateurs) {
        rapportUtilisateurs.textContent =
            tousLesUtilisateurs.length;
    }


    if (rapportMoyenne) {

        const moyenne =
            tousLesMenages.length > 0
                ? toutesLesPersonnes.length /
                  tousLesMenages.length
                : 0;

        rapportMoyenne.textContent =
            moyenne.toFixed(2);
    }
}


/* =========================================================
   UTILISATEURS
========================================================= */

function afficherUtilisateurs() {

    const tableau =
        document.getElementById(
            "tableUtilisateurs"
        );

    const compteur =
        document.getElementById(
            "countUtilisateurs"
        );

    if (!tableau) return;


    if (compteur) {
        compteur.textContent =
            tousLesUtilisateurs.length;
    }


    if (tousLesUtilisateurs.length === 0) {

        tableau.innerHTML = `
            <tr>
                <td colspan="8" class="empty">
                    Aucun utilisateur enregistré
                </td>
            </tr>
        `;

        return;
    }


    tableau.innerHTML =
        tousLesUtilisateurs.map(utilisateur => {

            const nom =
                valeur(
                    utilisateur,
                    "nomPrenom",
                    "nom",
                    "nomComplet"
                ) || "—";


            const username =
                valeur(
                    utilisateur,
                    "username",
                    "identifiant"
                ) || "—";


            const province =
                valeur(
                    utilisateur,
                    "province"
                ) || "—";


            const menagesUtilisateur =
                compterMenagesUtilisateur(
                    utilisateur
                );


            const personnesUtilisateur =
                compterPersonnesUtilisateur(
                    utilisateur
                );


            const statut =
                valeur(
                    utilisateur,
                    "statut",
                    "status"
                ) || "Actif";


            const date =
                valeur(
                    utilisateur,
                    "dateCreation",
                    "dateEnregistrement",
                    "date"
                );


            return `
                <tr>

                    <td>
                        ${echapper(nom)}
                    </td>

                    <td>
                        ${echapper(username)}
                    </td>

                    <td>
                        ${echapper(province)}
                    </td>

                    <td>
                        ${menagesUtilisateur}
                    </td>

                    <td>
                        ${personnesUtilisateur}
                    </td>

                    <td>
                        ${echapper(statut)}
                    </td>

                    <td>
                        ${
                            date
                                ? formaterDate(date)
                                : "—"
                        }
                    </td>

                    <td>

                        <button
                            class="btn secondary"
                            onclick="voirRapportUtilisateur('${echapperAttribut(username)}')">

                            Voir rapport

                        </button>

                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================================
   IDENTIFIER UTILISATEUR
========================================================= */

function identifierUtilisateur(utilisateur) {

    return normaliser(
        valeur(
            utilisateur,
            "username",
            "identifiant",
            "nomPrenom",
            "nom"
        )
    );
}


/* =========================================================
   APPARTENANCE UTILISATEUR
========================================================= */

function appartientUtilisateur(
    element,
    utilisateur
) {

    const idUtilisateur =
        normaliser(
            valeur(
                utilisateur,
                "id",
                "userId",
                "username",
                "identifiant"
            )
        );


    const valeursUtilisateur = [

        valeur(element, "userId"),

        valeur(element, "utilisateurId"),

        valeur(element, "username"),

        valeur(element, "createdBy"),

        valeur(element, "enregistrePar"),

        valeur(element, "utilisateur")

    ].map(normaliser);


    if (
        idUtilisateur &&
        valeursUtilisateur.includes(idUtilisateur)
    ) {
        return true;
    }


    return false;
}


/* =========================================================
   COMPTER MENAGES
========================================================= */

function compterMenagesUtilisateur(
    utilisateur
) {

    return tousLesMenages.filter(
        menage =>
            appartientUtilisateur(
                menage,
                utilisateur
            )
    ).length;
}


/* =========================================================
   COMPTER PERSONNES
========================================================= */

function compterPersonnesUtilisateur(
    utilisateur
) {

    return toutesLesPersonnes.filter(
        personne =>
            appartientUtilisateur(
                personne,
                utilisateur
            )
    ).length;
}


/* =========================================================
   RAPPORT UTILISATEURS
========================================================= */

function afficherRapportUtilisateurs() {

    const tableau =
        document.getElementById(
            "tableRapportUtilisateurs"
        );

    if (!tableau) return;


    if (tousLesUtilisateurs.length === 0) {

        tableau.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Aucun rapport disponible
                </td>
            </tr>
        `;

        return;
    }


    tableau.innerHTML =
        tousLesUtilisateurs.map(utilisateur => {

            const nom =
                valeur(
                    utilisateur,
                    "nomPrenom",
                    "nom",
                    "nomComplet",
                    "username"
                ) || "—";


            const province =
                valeur(
                    utilisateur,
                    "province"
                ) || "—";


            const menages =
                compterMenagesUtilisateur(
                    utilisateur
                );


            const personnes =
                compterPersonnesUtilisateur(
                    utilisateur
                );


            return `
                <tr>

                    <td>
                        ${echapper(nom)}
                    </td>

                    <td>
                        ${echapper(province)}
                    </td>

                    <td>
                        ${menages}
                    </td>

                    <td>
                        ${personnes}
                    </td>

                </tr>
            `;

        }).join("");
}


/* =========================================================
   VOIR RAPPORT UTILISATEUR
========================================================= */

function voirRapportUtilisateur(
    username
) {

    const utilisateur =
        tousLesUtilisateurs.find(
            u =>
                normaliser(
                    valeur(
                        u,
                        "username",
                        "identifiant"
                    )
                ) === normaliser(username)
        );


    if (!utilisateur) return;


    const menages =
        compterMenagesUtilisateur(
            utilisateur
        );


    const personnes =
        compterPersonnesUtilisateur(
            utilisateur
        );


    alert(
        "RAPPORT UTILISATEUR\n\n" +

        "Nom : " +

        valeur(
            utilisateur,
            "nomPrenom",
            "nom",
            "nomComplet"
        ) +

        "\nProvince : " +

        valeur(
            utilisateur,
            "province"
        ) +

        "\n\nMénages : " +

        menages +

        "\nPersonnes : " +

        personnes
    );
}


/* =========================================================
   FILTRES
========================================================= */

function remplirSelect(
    id,
    valeurs,
    texteDefaut
) {

    const select =
        document.getElementById(id);

    if (!select) return;


    const valeursUniques =
        [...new Set(
            valeurs
                .filter(Boolean)
                .map(String)
        )].sort();


    select.innerHTML =
        `<option value="">${texteDefaut}</option>`;


    valeursUniques.forEach(
        valeurItem => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                valeurItem;

            option.textContent =
                valeurItem;

            select.appendChild(
                option
            );
        }
    );
}


/* =========================================================
   INITIALISER FILTRES
========================================================= */

function initialiserFiltres() {

    remplirSelect(
        "filtreProvince",
        tousLesMenages.map(
            m => valeur(m, "province")
        ),
        "Toutes les provinces"
    );


    remplirSelect(
        "filtreCommune",
        tousLesMenages.map(
            m => valeur(m, "commune")
        ),
        "Toutes les communes"
    );


    remplirSelect(
        "filtreZone",
        tousLesMenages.map(
            m => valeur(m, "zone")
        ),
        "Toutes les zones"
    );


    remplirSelect(
        "filtreColline",
        tousLesMenages.map(
            m => valeur(m, "colline")
        ),
        "Toutes les collines"
    );


    remplirSelect(
        "filtreSousColline",
        tousLesMenages.map(
            m => valeur(m, "sousColline")
        ),
        "Toutes les sous-collines"
    );


    remplirSelect(
        "filtreChef10",
        tousLesMenages.map(
            m => valeur(m, "chef10Maisons")
        ),
        "Tous les chefs"
    );


    const utilisateurs =
        tousLesUtilisateurs.map(
            u =>
                valeur(
                    u,
                    "username",
                    "identifiant"
                )
        );


    remplirSelect(
        "filtreUtilisateur",
        utilisateurs,
        "Tous les utilisateurs"
    );
}


/* =========================================================
   APPLIQUER FILTRES
========================================================= */

function appliquerFiltres() {

    const recherche =
        normaliser(
            document.getElementById(
                "rechercheManager"
            )?.value
        );


    const province =
        normaliser(
            document.getElementById(
                "filtreProvince"
            )?.value
        );


    const commune =
        normaliser(
            document.getElementById(
                "filtreCommune"
            )?.value
        );


    const zone =
        normaliser(
            document.getElementById(
                "filtreZone"
            )?.value
        );


    const colline =
        normaliser(
            document.getElementById(
                "filtreColline"
            )?.value
        );


    const sousColline =
        normaliser(
            document.getElementById(
                "filtreSousColline"
            )?.value
        );


    const chef10 =
        normaliser(
            document.getElementById(
                "filtreChef10"
            )?.value
        );


    const resultats =
        tousLesMenages.filter(
            menage => {

                const texte =
                    normaliser(
                        Object.values(
                            menage
                        ).join(" ")
                    );


                return (

                    (!recherche ||
                        texte.includes(
                            recherche
                        )) &&


                    (!province ||
                        normaliser(
                            valeur(
                                menage,
                                "province"
                            )
                        ) === province) &&


                    (!commune ||
                        normaliser(
                            valeur(
                                menage,
                                "commune"
                            )
                        ) === commune) &&


                    (!zone ||
                        normaliser(
                            valeur(
                                menage,
                                "zone"
                            )
                        ) === zone) &&


                    (!colline ||
                        normaliser(
                            valeur(
                                menage,
                                "colline"
                            )
                        ) === colline) &&


                    (!sousColline ||
                        normaliser(
                            valeur(
                                menage,
                                "sousColline"
                            )
                        ) === sousColline) &&


                    (!chef10 ||
                        normaliser(
                            valeur(
                                menage,
                                "chef10Maisons"
                            )
                        ) === chef10)
                );
            }
        );


    const message =
        document.getElementById(
            "messageSynchronisation"
        );


    if (message) {

        message.textContent =
            resultats.length +
            " ménage(s) correspondent aux filtres.";
    }
}


/* =========================================================
   REINITIALISER FILTRES
========================================================= */

function reinitialiserFiltres() {

    [
        "filtreUtilisateur",
        "filtreProvince",
        "filtreCommune",
        "filtreZone",
        "filtreColline",
        "filtreSousColline",
        "filtreChef10",
        "rechercheManager"
    ].forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {
            element.value = "";
        }
    });


    const message =
        document.getElementById(
            "messageSynchronisation"
        );


    if (message) {
        message.textContent = "";
    }
}


/* =========================================================
   SYNCHRONISATION
========================================================= */

function synchroniser() {

    localStorage.setItem(
        "bpr_last_update",
        new Date().toISOString()
    );


    localStorage.setItem(
        "bpr_sync",
        "true"
    );


    const maintenant =
        new Date().toLocaleTimeString(
            "fr-FR"
        );


    const message =
        document.getElementById(
            "messageSynchronisation"
        );


    const status =
        document.getElementById(
            "syncStatus"
        );


    if (message) {

        message.textContent =
            "Synchronisation effectuée à " +
            maintenant;
    }


    if (status) {

        status.textContent =
            "Synchronisé à " +
            maintenant;
    }


    chargerDonnees();

    afficherStatistiques();

    afficherUtilisateurs();

    afficherRapportUtilisateurs();

    initialiserFiltres();
}


/* =========================================================
   ACTUALISER
========================================================= */

function actualiser() {

    chargerDonnees();

    afficherDate();

    afficherStatistiques();

    afficherUtilisateurs();

    afficherRapportUtilisateurs();

    initialiserFiltres();


    const message =
        document.getElementById(
            "messageSynchronisation"
        );


    if (message) {

        message.textContent =
            "Données actualisées.";
    }
}


/* =========================================================
   DECONNEXION
========================================================= */

function deconnexion() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "userRole"
    );

    localStorage.removeItem(
        "bpr_manager_connecte"
    );

    localStorage.removeItem(
        "bpr_current_user"
    );

    localStorage.removeItem(
        "bpr_compte_connecte"
    );


    window.location.href =
        "index.html";
}


/* =========================================================
   PROTECTION MANAGER NATIONAL
========================================================= */

function verifierAccesManager() {

    /*
       COMPTE CONNECTÉ
       ----------------
       Dans ton système BPR, le compte connecté
       est enregistré dans :

       bpr_compte_connecte
    */

    let compteConnecte = null;


    try {

        const sauvegarde =
            localStorage.getItem(
                "bpr_compte_connecte"
            );


        if (sauvegarde) {

            compteConnecte =
                JSON.parse(sauvegarde);
        }

    } catch (erreur) {

        console.error(
            "Erreur lecture compte connecté :",
            erreur
        );

        compteConnecte = null;
    }


    /*
       Si bpr_compte_connecte n'existe pas,
       on essaie les anciennes clés utilisées
       dans le système.
    */

    if (!compteConnecte) {

        const anciennesCles = [
            "bpr_current_user",
            "BPR_COMPTE_CONNECTE",
            "BPR_USER",
            "currentUser",
            "utilisateurConnecte"
        ];


        for (
            const cle of anciennesCles
        ) {

            try {

                const data =
                    localStorage.getItem(cle);


                if (data) {

                    const compte =
                        JSON.parse(data);


                    if (compte) {

                        compteConnecte =
                            compte;

                        break;
                    }
                }

            } catch (erreur) {

                console.warn(
                    "Impossible de lire :",
                    cle
                );
            }
        }
    }


    /*
       Aucun compte connecté
    */

    if (!compteConnecte) {

        alert(
            "Accès refusé.\n\n" +
            "Aucun compte n'est connecté."
        );

        window.location.href =
            "index.html";

        return false;
    }


    /*
       ROLE DU COMPTE
       ---------------
       Ton système utilise :

       Manager National
       Manager Provincial
       Manager Communal
       Manager Zonal
       Utilisateur
    */

    const role =
        valeur(
            compteConnecte,
            "role",
            "type"
        ).trim();


    /*
       SEUL MANAGER NATIONAL
       EST AUTORISÉ
    */

    if (role !== "Manager National") {

        alert(
            "Accès refusé.\n\n" +
            "Cette page est réservée au Manager National."
        );


        window.location.href =
            "accueil.html";


        return false;
    }


    /*
       MANAGER NATIONAL AUTORISÉ
    */

    return true;
}


/* =========================================================
   OUTILS HTML
========================================================= */

function echapper(texte) {

    return String(texte || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


function echapperAttribut(texte) {

    return String(texte || "")
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        );
}


function formaterDate(date) {

    try {

        return new Date(date)
            .toLocaleDateString(
                "fr-FR"
            );

    } catch (erreur) {

        return date;
    }
}


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
           VERIFICATION AVANT
           D'AFFICHER LE DASHBOARD
        */

        if (!verifierAccesManager()) {
            return;
        }


        chargerDonnees();


        afficherDate();


        afficherStatistiques();


        afficherUtilisateurs();


        afficherRapportUtilisateurs();


        initialiserFiltres();


        /* =========================
           ACTUALISER
        ========================= */

        const btnActualiser =
            document.getElementById(
                "btnActualiser"
            );


        if (btnActualiser) {

            btnActualiser.addEventListener(
                "click",
                actualiser
            );
        }


        /* =========================
           SYNCHRONISER
        ========================= */

        const btnSynchroniser =
            document.getElementById(
                "btnSynchroniser"
            );


        if (btnSynchroniser) {

            btnSynchroniser.addEventListener(
                "click",
                synchroniser
            );
        }


        const btnLancerSynchronisation =
            document.getElementById(
                "btnLancerSynchronisation"
            );


        if (btnLancerSynchronisation) {

            btnLancerSynchronisation.addEventListener(
                "click",
                synchroniser
            );
        }


        /* =========================
           FILTRES
        ========================= */

        const btnAppliquerFiltres =
            document.getElementById(
                "btnAppliquerFiltres"
            );


        if (btnAppliquerFiltres) {

            btnAppliquerFiltres.addEventListener(
                "click",
                appliquerFiltres
            );
        }


        const btnResetFiltres =
            document.getElementById(
                "btnResetFiltres"
            );


        if (btnResetFiltres) {

            btnResetFiltres.addEventListener(
                "click",
                reinitialiserFiltres
            );
        }


        /* =========================
           DECONNEXION
        ========================= */

        const btnDeconnexion =
            document.getElementById(
                "btnDeconnexion"
            );


        if (btnDeconnexion) {

            btnDeconnexion.addEventListener(
                "click",
                deconnexion
            );
        }

    }
);

