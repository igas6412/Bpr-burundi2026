
/* ============================================================
   BURUNDI PEOPLE REGISTRY
   menage.js
   LISTE DES MÉNAGES + DÉTAILS
   ============================================================ */

const MENAGES_KEY = "bpr_menages";
const PERSONNES_KEY = "bpr_personnes";
const VISITEURS_KEY = "bpr_visiteurs";

let tousLesMenages = [];
let menagesFiltres = [];


/* ============================================================
   INITIALISATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    verifierConnexion();

    chargerMenages();

    initialiserFiltres();

    initialiserRecherche();

    initialiserBoutons();

    afficherDetailsDepuisURL();
});


/* ============================================================
   CONNEXION
   ============================================================ */

function verifierConnexion() {

    if (localStorage.getItem("isLoggedIn") !== "true") {

        window.location.href = "index.html";

    }

}


/* ============================================================
   CONTRÔLE DU TERRITOIRE DU COMPTE CONNECTÉ
   ============================================================ */

function normaliserTerritoire(valeurTexte) {
    return String(valeurTexte ?? "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function obtenirCompteConnecte() {
    const cles = [
        "bpr_current_user",
        "bpr_manager_connecte"
    ];

    for (const cle of cles) {
        const brut = localStorage.getItem(cle);
        if (!brut) continue;

        try {
            const compte = JSON.parse(brut);
            if (compte && typeof compte === "object") {
                return compte;
            }
        } catch (erreur) {
            console.warn("Session BPR invalide :", cle);
        }
    }

    return {
        role: localStorage.getItem("userRole") || "",
        province: localStorage.getItem("userProvince") || "",
        commune: localStorage.getItem("userCommune") || "",
        zone: localStorage.getItem("userZone") || "",
        colline: localStorage.getItem("userColline") || ""
    };
}

function menageAccessibleSelonCompte(menage) {
    const compte = obtenirCompteConnecte();

    const role = normaliserTerritoire(compte.role);
    const provinceCompte = normaliserTerritoire(compte.province);
    const communeCompte = normaliserTerritoire(compte.commune);
    const zoneCompte = normaliserTerritoire(compte.zone);
    const collineCompte = normaliserTerritoire(compte.colline);

    const province = normaliserTerritoire(valeur(menage, "province"));
    const commune = normaliserTerritoire(valeur(menage, "commune"));
    const zone = normaliserTerritoire(valeur(menage, "zone"));
    const colline = normaliserTerritoire(valeur(menage, "colline"));

    if (role === "manager national") {
        return true;
    }

    if (role === "manager provincial") {
        return !!provinceCompte && province === provinceCompte;
    }

    if (role === "manager communal") {
        return !!provinceCompte &&
               !!communeCompte &&
               province === provinceCompte &&
               commune === communeCompte;
    }

    if (role === "manager zonal") {
        return !!provinceCompte &&
               !!communeCompte &&
               !!zoneCompte &&
               province === provinceCompte &&
               commune === communeCompte &&
               zone === zoneCompte;
    }

    if (role === "utilisateur") {
        return !!provinceCompte &&
               !!communeCompte &&
               !!zoneCompte &&
               !!collineCompte &&
               province === provinceCompte &&
               commune === communeCompte &&
               zone === zoneCompte &&
               colline === collineCompte;
    }

    return false;
}

function obtenirMenagesAccessibles() {
    return tousLesMenages.filter(menage =>
        menageAccessibleSelonCompte(menage)
    );
}


/* ============================================================
   CHARGER MÉNAGES
   ============================================================ */

function chargerMenages() {

    try {

        const donnees = localStorage.getItem(MENAGES_KEY);

        tousLesMenages = donnees
            ? JSON.parse(donnees)
            : [];

        if (!Array.isArray(tousLesMenages)) {

            tousLesMenages = [];

        }

    } catch (erreur) {

        console.error(
            "Erreur chargement ménages :",
            erreur
        );

        tousLesMenages = [];

    }

    const menagesAccessibles = obtenirMenagesAccessibles();

    menagesFiltres = [...menagesAccessibles];

    remplirFiltres();

    afficherMenages();

}


/* ============================================================
   VALEUR
   ============================================================ */

function valeur(objet, ...noms) {

    for (const nom of noms) {

        if (
            objet &&
            objet[nom] !== undefined &&
            objet[nom] !== null &&
            String(objet[nom]).trim() !== ""
        ) {

            return String(objet[nom]).trim();

        }

    }

    return "";

}


/* ============================================================
   ÉCHAPPER HTML
   ============================================================ */

function echapper(texte) {

    return String(texte || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   ÉCHAPPER ATTRIBUT
   ============================================================ */

function echapperAttribut(texte) {

    return String(texte || "")
        .replace(/\\/g, "\\\\")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ============================================================
   AFFICHER MÉNAGES
   ============================================================ */

function afficherMenages() {

    const tbody =
        document.getElementById("tableMenages");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (menagesFiltres.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="empty">
                    Aucun ménage enregistré.
                </td>
            </tr>
        `;

        mettreAJourCompteur(0);

        return;

    }


    menagesFiltres.forEach((menage, index) => {

        const tr = document.createElement("tr");

        const id = valeur(menage, "id");

        tr.innerHTML = `

            <td class="numero-ligne">
                ${index + 1}
            </td>

            <td>
                ${echapper(
                    valeur(
                        menage,
                        "chefMenage",
                        "chefDeMenage"
                    )
                )}
            </td>

            <td>
                ${echapper(
                    valeur(menage, "pays") || "Burundi"
                )}
            </td>

            <td>
                ${echapper(
                    valeur(menage, "province")
                )}
            </td>

            <td>
                ${echapper(
                    valeur(menage, "commune")
                )}
            </td>

            <td>
                ${echapper(
                    valeur(menage, "zone")
                )}
            </td>

            <td>
                ${echapper(
                    valeur(menage, "colline")
                )}
            </td>

            <td>
                ${echapper(
                    valeur(
                        menage,
                        "sousColline",
                        "sous-colline",
                        "sous_colline"
                    )
                )}
            </td>

            <td>
                ${echapper(
                    valeur(
                        menage,
                        "chef10Maisons",
                        "chef10",
                        "chefDe10Maisons"
                    )
                )}
            </td>

            <td>

                <button
                    type="button"
                    class="btn-voir"
                    data-id="${echapperAttribut(id)}"
                >
                    👁️ Voir
                </button>

            </td>

        `;


        const boutonVoir =
            tr.querySelector(".btn-voir");


        if (boutonVoir) {

            boutonVoir.addEventListener(
                "click",
                () => voirMenage(id)
            );

        }


        tbody.appendChild(tr);

    });


    mettreAJourCompteur(
        menagesFiltres.length
    );

}


/* ============================================================
   COMPTEUR
   ============================================================ */

function mettreAJourCompteur(nombre) {

    const compteur =
        document.getElementById("countMenages");

    if (compteur) {

        compteur.textContent = nombre;

    }

}


/* ============================================================
   FILTRES
   ============================================================ */

function remplirFiltres() {

    remplirSelect(
        "filtrePays",
        "pays"
    );

    remplirSelect(
        "filtreProvince",
        "province"
    );

    remplirSelect(
        "filtreCommune",
        "commune"
    );

    remplirSelect(
        "filtreZone",
        "zone"
    );

    remplirSelect(
        "filtreColline",
        "colline"
    );

    remplirSelect(
        "filtreSousColline",
        "sousColline"
    );

    remplirSelect(
        "filtreChef10",
        "chef10Maisons"
    );

}


/* ============================================================
   REMPLIR SELECT
   ============================================================ */

function remplirSelect(id, champ) {

    const select =
        document.getElementById(id);

    if (!select) return;

    const valeursUniques = new Set();


    tousLesMenages.forEach(menage => {

        let valeurChamp = "";


        if (champ === "pays") {

            valeurChamp =
                valeur(menage, "pays") ||
                "Burundi";

        }

        else if (champ === "sousColline") {

            valeurChamp =
                valeur(
                    menage,
                    "sousColline",
                    "sous-colline",
                    "sous_colline"
                );

        }

        else if (champ === "chef10Maisons") {

            valeurChamp =
                valeur(
                    menage,
                    "chef10Maisons",
                    "chef10",
                    "chefDe10Maisons"
                );

        }

        else {

            valeurChamp =
                valeur(menage, champ);

        }


        if (valeurChamp) {

            valeursUniques.add(
                valeurChamp
            );

        }

    });


    const ancienneValeur =
        select.value;


    select.innerHTML =
        `<option value="">Tous</option>`;


    [...valeursUniques]
        .sort((a, b) =>
            a.localeCompare(
                b,
                undefined,
                {
                    sensitivity: "base"
                }
            )
        )
        .forEach(item => {

            const option =
                document.createElement("option");

            option.value = item;

            option.textContent = item;

            select.appendChild(option);

        });


    if (
        [...select.options].some(
            option =>
                option.value === ancienneValeur
        )
    ) {

        select.value =
            ancienneValeur;

    }

}


/* ============================================================
   EVENTS FILTRES
   ============================================================ */

function initialiserFiltres() {

    const ids = [

        "filtrePays",
        "filtreProvince",
        "filtreCommune",
        "filtreZone",
        "filtreColline",
        "filtreSousColline",
        "filtreChef10"

    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.addEventListener(
                "change",
                appliquerFiltres
            );

        }

    });

}


/* ============================================================
   RECHERCHE
   ============================================================ */

function initialiserRecherche() {

    const recherche =
        document.getElementById(
            "rechercheMenages"
        );

    if (!recherche) return;


    recherche.addEventListener(
        "input",
        appliquerFiltres
    );

}


/* ============================================================
   APPLIQUER FILTRES
   ============================================================ */

function appliquerFiltres() {

    const pays =
        document.getElementById(
            "filtrePays"
        )?.value || "";


    const province =
        document.getElementById(
            "filtreProvince"
        )?.value || "";


    const commune =
        document.getElementById(
            "filtreCommune"
        )?.value || "";


    const zone =
        document.getElementById(
            "filtreZone"
        )?.value || "";


    const colline =
        document.getElementById(
            "filtreColline"
        )?.value || "";


    const sousColline =
        document.getElementById(
            "filtreSousColline"
        )?.value || "";


    const chef10 =
        document.getElementById(
            "filtreChef10"
        )?.value || "";


    const recherche = (

        document.getElementById(
            "rechercheMenages"
        )?.value || ""

    )
        .toLowerCase()
        .trim();


    const menagesAccessibles = obtenirMenagesAccessibles();

    menagesFiltres =
        menagesAccessibles.filter(menage => {


            const pPays =
                valeur(menage, "pays") ||
                "Burundi";


            const pProvince =
                valeur(menage, "province");


            const pCommune =
                valeur(menage, "commune");


            const pZone =
                valeur(menage, "zone");


            const pColline =
                valeur(menage, "colline");


            const pSousColline =
                valeur(
                    menage,
                    "sousColline",
                    "sous-colline",
                    "sous_colline"
                );


            const pChef10 =
                valeur(
                    menage,
                    "chef10Maisons",
                    "chef10",
                    "chefDe10Maisons"
                );


            const chefMenage =
                valeur(
                    menage,
                    "chefMenage",
                    "chefDeMenage"
                );


            const texte = `

                ${chefMenage}
                ${pPays}
                ${pProvince}
                ${pCommune}
                ${pZone}
                ${pColline}
                ${pSousColline}
                ${pChef10}

            `.toLowerCase();


            return (

                (!pays ||
                    pPays === pays)

                &&

                (!province ||
                    pProvince === province)

                &&

                (!commune ||
                    pCommune === commune)

                &&

                (!zone ||
                    pZone === zone)

                &&

                (!colline ||
                    pColline === colline)

                &&

                (!sousColline ||
                    pSousColline === sousColline)

                &&

                (!chef10 ||
                    pChef10 === chef10)

                &&

                (!recherche ||
                    texte.includes(recherche))

            );

        });


    afficherMenages();

}


/* ============================================================
   INITIALISER BOUTONS
   ============================================================ */

function initialiserBoutons() {


    /* RECHERCHE */

    const boutonsRecherche = [

        "btnRechercheMenages",
        "btnRechercherMenages",
        "btnRecherche"

    ];


    boutonsRecherche.forEach(id => {

        const bouton =
            document.getElementById(id);

        if (bouton) {

            bouton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    appliquerFiltres();

                }
            );

        }

    });


    /* RESET */

    const boutonsReset = [

        "btnResetRechercheMenages",
        "btnResetMenages",
        "btnReset",
        "btnReinitialiser",
        "btnReinitialiserMenages"

    ];


    boutonsReset.forEach(id => {

        const bouton =
            document.getElementById(id);

        if (bouton) {

            bouton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    reinitialiserFiltres();

                }
            );

        }

    });


    /* ACTUALISER */

    const boutonsActualiser = [

        "btnActualiser",
        "btnActualiserMenages",
        "btnActualiserListe",
        "btnRefresh",
        "btnRefreshMenages"

    ];


    boutonsActualiser.forEach(id => {

        const bouton =
            document.getElementById(id);

        if (bouton) {

            bouton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    actualiserListe();

                }
            );

        }

    });


    /* CSV */

    const boutonsCSV = [

        "btnExportMenagesCSV",
        "btnTelechargerCSV",
        "btnCSV",
        "btnExportCSV"

    ];


    boutonsCSV.forEach(id => {

        const bouton =
            document.getElementById(id);

        if (bouton) {

            bouton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    exporterCSV();

                }
            );

        }

    });


    /* PDF */

    const boutonsPDF = [

        "btnExportMenagesPDF",
        "btnTelechargerPDF",
        "btnPDF",
        "btnExportPDF"

    ];


    boutonsPDF.forEach(id => {

        const bouton =
            document.getElementById(id);

        if (bouton) {

            bouton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    exporterPDF();

                }
            );

        }

    });


    /* DÉCONNEXION */

    const btnDeconnexion =
        document.getElementById(
            "btnDeconnexion"
        );


    if (btnDeconnexion) {

        btnDeconnexion.addEventListener(
            "click",
            function(event) {

                event.preventDefault();

                deconnexion();

            }
        );

    }

}


/* ============================================================
   RÉINITIALISER
   ============================================================ */

function reinitialiserFiltres() {

    const ids = [

        "filtrePays",
        "filtreProvince",
        "filtreCommune",
        "filtreZone",
        "filtreColline",
        "filtreSousColline",
        "filtreChef10",
        "rechercheMenages"

    ];


    ids.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.value = "";

        }

    });


    menagesFiltres =
        [...obtenirMenagesAccessibles()];


    afficherMenages();

}


/* ============================================================
   ACTUALISER
   ============================================================ */

function actualiserListe() {

    chargerMenages();

}


/* ============================================================
   VOIR MÉNAGE
   ============================================================ */

function voirMenage(id) {

    if (!id) {

        alert(
            "Identifiant du ménage introuvable."
        );

        return;

    }


    localStorage.setItem(
        "bpr_menage_selectionne",
        id
    );


    localStorage.setItem(
        "bpr_menage_a_voir",
        id
    );


    const url =
        new URL(
            window.location.href
        );


    url.searchParams.set(
        "menage",
        id
    );


    window.history.pushState(
        {},
        "",
        url
    );


    afficherDetailsMenage(id);


}


/* ============================================================
   AFFICHER DÉTAILS DEPUIS URL
   ============================================================ */

function afficherDetailsDepuisURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        params.get("menage");


    if (id) {

        afficherDetailsMenage(id);

    }

}


/* ============================================================
   CRÉER SECTION DÉTAILS
   ============================================================ */

function obtenirConteneurDetails() {

    let section =
        document.getElementById(
            "detailMenage"
        );


    if (section) {

        return section;

    }


    section =
        document.createElement("section");


    section.id =
        "detailMenage";


    section.className =
        "card detail-menage";


    const main =
        document.querySelector("main");


    if (!main) {

        document.body.appendChild(
            section
        );

    }

    else {

        main.appendChild(
            section
        );

    }


    return section;

}


/* ============================================================
   AFFICHER DÉTAILS DU MÉNAGE
   ============================================================ */

function afficherDetailsMenage(id) {

    const menages =
        obtenirMenagesAccessibles();


    const menage =
        menages.find(
            m =>
                String(m.id) ===
                String(id)
        );


    const section =
        obtenirConteneurDetails();


    if (!menage) {

        section.innerHTML = `

            <h2>❌ Ménage introuvable</h2>

        `;

        return;

    }


    const personnes =
        lireTableau(PERSONNES_KEY);


    const visiteurs =
        lireTableau(VISITEURS_KEY);


    const membres =
        personnes.filter(
            p =>
                String(p.menageId) ===
                String(id)
        );


    const pere =
        membres.find(
            p => p.type === "Père"
        );


    const mere =
        membres.find(
            p => p.type === "Mère"
        );


    const enfants =
        membres.filter(
            p => p.type === "Enfant"
        );


    const parentes =
        membres.filter(
            p => p.type === "Parenté"
        );


    const visiteursMenage =
        visiteurs.filter(
            v =>
                String(v.menageId) ===
                String(id)
        );


    section.innerHTML = `

        <div class="detail-header">

            <div>

                <h2>
                    🏠 Détails du ménage
                </h2>

                <p>
                    ID :
                    ${echapper(menage.id)}
                </p>

            </div>

            <div>
            

                <button
                    type="button"
                    id="btnModifierMenage"
                    class="btn-modifier"
                >
                    ✏️ Modifier
                </button>

                <button
                    type="button"
                    id="btnFermerDetails"
                    class="btn-fermer"
                >
                    ✖ Fermer
                </button>

            </div>

        </div>


        <hr>


        <h3>📍 Informations du ménage</h3>

        <div class="details-grid">

            <div>
                <strong>Pays :</strong>
                ${echapper(
                    valeur(menage, "pays") ||
                    "Burundi"
                )}
            </div>

            <div>
                <strong>Province :</strong>
                ${echapper(
                    valeur(menage, "province")
                )}
            </div>

            <div>
                <strong>Commune :</strong>
                ${echapper(
                    valeur(menage, "commune")
                )}
            </div>

            <div>
                <strong>Zone :</strong>
                ${echapper(
                    valeur(menage, "zone")
                )}
            </div>

            <div>
                <strong>Colline :</strong>
                ${echapper(
                    valeur(menage, "colline")
                )}
            </div>

            <div>
                <strong>Sous-colline :</strong>
                ${echapper(
                    valeur(
                        menage,
                        "sousColline",
                        "sous-colline",
                        "sous_colline"
                    )
                )}
            </div>

            <div>
                <strong>Chef de 10 maisons :</strong>
                ${echapper(
                    valeur(
                        menage,
                        "chef10Maisons",
                        "chef10",
                        "chefDe10Maisons"
                    )
                )}
            </div>

            <div>
                <strong>Chef de ménage :</strong>
                ${echapper(
                    valeur(
                        menage,
                        "chefMenage",
                        "chefDeMenage"
                    )
                )}
            </div>

            <div>
                <strong>Adresse :</strong>
                ${echapper(
                    valeur(menage, "adresse")
                )}
            </div>

        </div>


        <hr>


        <h3>👨 Père</h3>

        ${
            pere
            ? `
                <div class="member-detail">

                    <p>
                        <strong>Nom :</strong>
                        ${echapper(
                            pere.nomPrenom
                        )}
                    </p>

                    <p>
                        <strong>Genre :</strong>
                        ${echapper(
                            pere.sexe
                        )}
                    </p>

                    <p>
                        <strong>Âge :</strong>
                        ${echapper(
                            pere.age
                        )}
                    </p>

                    <p>
                        <strong>Identité :</strong>
                        ${echapper(
                            pere.identite
                        )}
                    </p>

                    <p>
                        <strong>Téléphone :</strong>
                        ${echapper(
                            pere.telephone
                        )}
                    </p>

                </div>
            `
            : `
                <p>
                    Aucun père enregistré.
                </p>
            `
        }


        <h3>👩 Mère</h3>

        ${
            mere
            ? `
                <div class="member-detail">

                    <p>
                        <strong>Nom :</strong>
                        ${echapper(
                            mere.nomPrenom
                        )}
                    </p>

                    <p>
                        <strong>Genre :</strong>
                        ${echapper(
                            mere.sexe
                        )}
                    </p>

                    <p>
                        <strong>Âge :</strong>
                        ${echapper(
                            mere.age
                        )}
                    </p>

                    <p>
                        <strong>Identité :</strong>
                        ${echapper(
                            mere.identite
                        )}
                    </p>

                    <p>
                        <strong>Téléphone :</strong>
                        ${echapper(
                            mere.telephone
                        )}
                    </p>

                </div>
            `
            : `
                <p>
                    Aucune mère enregistrée.
                </p>
            `
        }


        <h3>
            👧👦 Enfants
            (${enfants.length})
        </h3>

        ${
            enfants.length > 0
            ? `
                <div class="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>N°</th>
                                <th>Nom et prénom</th>
                                <th>Genre</th>
                                <th>Âge</th>
                                <th>Identité</th>
                                <th>Téléphone</th>
                            </tr>

                        </thead>

                        <tbody>

                            ${enfants.map(
                                (enfant, index) => `

                                <tr>

                                    <td>
                                        ${index + 1}
                                    </td>

                                    <td>
                                        ${echapper(
                                            enfant.nomPrenom
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            enfant.Genre ||
                                            enfant.sexe
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            enfant.age
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            enfant.identite
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            enfant.telephone
                                        )}
                                    </td>

                                </tr>

                            `
                            ).join("")}

                        </tbody>

                    </table>

                </div>
            `
            : `
                <p>
                    Aucun enfant enregistré.
                </p>
            `
        }


        <h3>
            👨‍👩‍👧 Autres parentés
            (${parentes.length})
        </h3>

        ${
            parentes.length > 0
            ? `
                <div class="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>N°</th>
                                <th>Nom et prénom</th>
                                <th>Genre</th>
                                <th>Âge</th>
                                <th>Lien de parenté</th>
                            </tr>

                        </thead>

                        <tbody>

                            ${parentes.map(
                                (parente, index) => `

                                <tr>

                                    <td>
                                        ${index + 1}
                                    </td>

                                    <td>
                                        ${echapper(
                                            parente.nomPrenom
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            parente.Genre ||
                                            parente.sexe
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            parente.age
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            parente.lien
                                        )}
                                    </td>

                                </tr>

                            `
                            ).join("")}

                        </tbody>

                    </table>

                </div>
            `
            : `
                <p>
                    Aucune autre parenté enregistrée.
                </p>
            `
        }


        <h3>
            👤 Visiteurs
            (${visiteursMenage.length})
        </h3>

        ${
            visiteursMenage.length > 0
            ? `
                <div class="table-container">

                    <table>

                        <thead>

                            <tr>
                                <th>N°</th>
                                <th>Nom et prénom</th>
                                <th>Genre</th>
                                <th>Âge</th>
                                <th>Provenance</th>
                            </tr>

                        </thead>

                        <tbody>

                            ${visiteursMenage.map(
                                (visiteur, index) => `

                                <tr>

                                    <td>
                                        ${index + 1}
                                    </td>

                                    <td>
                                        ${echapper(
                                            visiteur.nomPrenom
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            visiteur.Genre ||
                                            visiteur.sexe
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            visiteur.age
                                        )}
                                    </td>

                                    <td>
                                        ${echapper(
                                            visiteur.provenance
                                        )}
                                    </td>

                                </tr>

                            `
                            ).join("")}

                        </tbody>

                    </table>

                </div>
            `
            : `
                <p>
                    Aucun visiteur enregistré.
                </p>
            `
        }

    `;


    section.style.display =
        "block";


    const boutonModifier =
        document.getElementById(
            "btnModifierMenage"
        );


    if (boutonModifier) {

        boutonModifier.addEventListener(
            "click",
            () => modifierMenage(id)
        );

    }


    const boutonFermer =
        document.getElementById(
            "btnFermerDetails"
        );


    if (boutonFermer) {

        boutonFermer.addEventListener(
            "click",
            fermerDetails
        );

    }


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ============================================================
   MODIFIER MÉNAGE
   ============================================================ */

function modifierMenage(id) {

    if (!id) {

        alert(
            "Identifiant du ménage introuvable."
        );

        return;

    }


    localStorage.setItem(
        "bpr_menage_a_modifier",
        id
    );


    window.location.href =
        `register.html?edit=${encodeURIComponent(id)}`;

}


/* ============================================================
   FERMER DÉTAILS
   ============================================================ */

function fermerDetails() {

    const section =
        document.getElementById(
            "detailMenage"
        );


    if (section) {

        section.remove();

    }


    localStorage.removeItem(
        "bpr_menage_selectionne"
    );


    localStorage.removeItem(
        "bpr_menage_a_voir"
    );


    const url =
        new URL(
            window.location.href
        );


    url.searchParams.delete(
        "menage"
    );


    window.history.pushState(
        {},
        "",
        url
    );

}


/* ============================================================
   LIRE TABLEAU
   ============================================================ */

function lireTableau(cle) {

    try {

        const valeurStockee =
            localStorage.getItem(cle);


        if (!valeurStockee) {

            return [];

        }


        const resultat =
            JSON.parse(
                valeurStockee
            );


        return Array.isArray(resultat)
            ? resultat
            : [];

    } catch (erreur) {

        console.error(
            "Erreur localStorage :",
            erreur
        );

        return [];

    }

}


/* ============================================================
   EXPORT CSV
   ============================================================ */

function exporterCSV() {

    if (menagesFiltres.length === 0) {

        alert(
            "Aucun ménage à exporter."
        );

        return;

    }


    const lignes = [];


    lignes.push([

        "N°",
        "Chef de ménage",
        "Pays",
        "Province",
        "Commune",
        "Zone",
        "Colline",
        "Sous-colline",
        "Chef de 10 maisons"

    ]);


    menagesFiltres.forEach(
        (menage, index) => {

            lignes.push([

                index + 1,

                valeur(
                    menage,
                    "chefMenage",
                    "chefDeMenage"
                ),

                valeur(
                    menage,
                    "pays"
                ) || "Burundi",

                valeur(
                    menage,
                    "province"
                ),

                valeur(
                    menage,
                    "commune"
                ),

                valeur(
                    menage,
                    "zone"
                ),

                valeur(
                    menage,
                    "colline"
                ),

                valeur(
                    menage,
                    "sousColline",
                    "sous-colline",
                    "sous_colline"
                ),

                valeur(
                    menage,
                    "chef10Maisons",
                    "chef10",
                    "chefDe10Maisons"
                )

            ]);

        }
    );


    const csv =
        lignes
            .map(ligne =>
                ligne
                    .map(cellule =>
                        `"${String(cellule)
                            .replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(";")
            )
            .join("\n");


    const blob =
        new Blob(
            ["\ufeff" + csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const lien =
        document.createElement(
            "a"
        );


    lien.href = url;

    lien.download =
        "liste_menages.csv";

    lien.style.display =
        "none";


    document.body.appendChild(
        lien
    );


    lien.click();


    document.body.removeChild(
        lien
    );


    setTimeout(() => {

        URL.revokeObjectURL(
            url
        );

    }, 1000);

}


/* ============================================================
   EXPORT PDF
   ============================================================ */

function exporterPDF() {

    if (menagesFiltres.length === 0) {

        alert(
            "Aucun ménage à exporter."
        );

        return;

    }


    if (
        typeof window.jspdf ===
            "undefined" ||

        typeof window.jspdf.jsPDF !==
            "function"
    ) {

        alert(
            "jsPDF n'est pas chargé."
        );

        return;

    }


    const jsPDF =
        window.jspdf.jsPDF;


    const doc =
        new jsPDF({

            orientation:
                "landscape",

            unit: "mm",

            format: "a4"

        });


    doc.setFontSize(16);


    doc.text(
        "BURUNDI PEOPLE REGISTRY",
        14,
        15
    );


    doc.setFontSize(11);


    doc.text(
        "Liste des ménages",
        14,
        23
    );


    doc.setFontSize(9);


    doc.text(
        `Total : ${menagesFiltres.length} ménage(s)`,
        14,
        29
    );


    if (
        typeof doc.autoTable !==
        "function"
    ) {

        alert(
            "jsPDF AutoTable n'est pas chargé."
        );

        return;

    }


    const rows =
        menagesFiltres.map(
            (menage, index) => [

                index + 1,

                valeur(
                    menage,
                    "chefMenage",
                    "chefDeMenage"
                ),

                valeur(
                    menage,
                    "pays"
                ) || "Burundi",

                valeur(
                    menage,
                    "province"
                ),

                valeur(
                    menage,
                    "commune"
                ),

                valeur(
                    menage,
                    "zone"
                ),

                valeur(
                    menage,
                    "colline"
                ),

                valeur(
                    menage,
                    "sousColline",
                    "sous-colline",
                    "sous_colline"
                ),

                valeur(
                    menage,
                    "chef10Maisons",
                    "chef10",
                    "chefDe10Maisons"
                )

            ]
        );


    doc.autoTable({

        startY: 34,

        head: [[

            "N°",
            "Chef de ménage",
            "Pays",
            "Province",
            "Commune",
            "Zone",
            "Colline",
            "Sous-colline",
            "Chef de 10 maisons"

        ]],

        body: rows,

        styles: {

            fontSize: 7,

            cellPadding: 2,

            overflow:
                "linebreak"

        },

        headStyles: {

            fontSize: 7

        },

        margin: {

            left: 10,

            right: 10

        }

    });


    doc.save(
        "liste_menages.pdf"
    );

}


/* ============================================================
   ACTUALISATION AUTOMATIQUE
   ============================================================ */

window.addEventListener(
    "storage",
    event => {

        if (
            event.key ===
            MENAGES_KEY
        ) {

            chargerMenages();

        }

    }
);


/* ============================================================
   ACTUALISATION QUAND ON REVIENT
   ============================================================ */

window.addEventListener(
    "focus",
    () => {

        chargerMenages();

    }
);


/* ============================================================
   DÉCONNEXION
   ============================================================ */

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


    window.location.href =
        "index.html";

}
