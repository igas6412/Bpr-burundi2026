
/* =========================================================
   BURUNDI PEOPLE REGISTRY
   personne.js
   Liste des personnes + filtrage optimisé
========================================================= */

(() => {

    // Empêche le JS de s'exécuter deux fois
    if (window.__BPR_PERSONNE_JS__) return;
    window.__BPR_PERSONNE_JS__ = true;

    const PERSONNES_KEY = "bpr_personnes";

    let personnes = [];
    let personnesFiltrees = [];

    let rechercheTimer = null;

    /* =========================================================
       OUTILS
    ========================================================= */

    function el(id) {
        return document.getElementById(id);
    }

    function valeur(val) {
        if (val === null || val === undefined) return "";
        return String(val).trim();
    }

    function normaliserTexte(texte) {
        return valeur(texte)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }

    function echapperHTML(texte) {
        return valeur(texte)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function afficherMessage(texte, type = "success") {

        const message = el("message");

        if (!message) return;

        message.textContent = texte;

        message.className = "message " + type;

        clearTimeout(afficherMessage.timer);

        afficherMessage.timer = setTimeout(() => {
            message.textContent = "";
            message.className = "message";
        }, 2500);
    }

    /* =========================================================
       VERIFICATION CONNEXION
    ========================================================= */

    function verifierConnexion() {

        const connecte = localStorage.getItem("isLoggedIn");

        if (connecte !== "true") {

            window.location.replace("index.html");

            return false;
        }

        return true;
    }


    /* =========================================================
       ACCÈS SELON LE TERRITOIRE DU COMPTE CONNECTÉ
    ========================================================= */

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

            } catch (e) {}
        }

        return {
            role: localStorage.getItem("userRole") || "",
            province: localStorage.getItem("userProvince") || "",
            commune: localStorage.getItem("userCommune") || "",
            zone: localStorage.getItem("userZone") || "",
            colline: localStorage.getItem("userColline") || ""
        };
    }


    function personneAccessibleSelonCompte(personne) {

        const compte = obtenirCompteConnecte();

        const role = normaliserTexte(compte.role);

        const provinceCompte =
            normaliserTexte(compte.province);

        const communeCompte =
            normaliserTexte(compte.commune);

        const zoneCompte =
            normaliserTexte(compte.zone);

        const collineCompte =
            normaliserTexte(compte.colline);

        const province =
            normaliserTexte(valeur(personne.province));

        const commune =
            normaliserTexte(valeur(personne.commune));

        const zone =
            normaliserTexte(valeur(personne.zone));

        const colline =
            normaliserTexte(valeur(personne.colline));


        // Manager National / GSA / IGAS :
        // accès à toutes les personnes.
        if (
            role === "manager national" ||
            role === "gsa" ||
            role === "igas"
        ) {
            return true;
        }


        // Manager Provincial :
        // accès uniquement à sa province.
        if (role === "manager provincial") {

            return (
                !!provinceCompte &&
                province === provinceCompte
            );
        }


        // Manager Communal :
        // accès uniquement à sa province + commune.
        if (role === "manager communal") {

            return (
                !!provinceCompte &&
                !!communeCompte &&
                province === provinceCompte &&
                commune === communeCompte
            );
        }


        // Manager Zonal :
        // accès uniquement à sa province + commune + zone.
        if (role === "manager zonal") {

            return (
                !!provinceCompte &&
                !!communeCompte &&
                !!zoneCompte &&
                province === provinceCompte &&
                commune === communeCompte &&
                zone === zoneCompte
            );
        }


        // Utilisateur :
        // accès uniquement à sa province + commune + zone + colline.
        if (role === "utilisateur" || role === "user") {

            return (
                !!provinceCompte &&
                !!communeCompte &&
                !!zoneCompte &&
                !!collineCompte &&
                province === provinceCompte &&
                commune === communeCompte &&
                zone === zoneCompte &&
                colline === collineCompte
            );
        }


        // Aucun rôle reconnu = aucun accès.
        return false;
    }


    /* =========================================================
       CHARGEMENT DES PERSONNES
    ========================================================= */

    function chargerPersonnes() {

        try {

            const donnees =
                JSON.parse(
                    localStorage.getItem(PERSONNES_KEY) || "[]"
                );

            if (!Array.isArray(donnees)) {

                personnes = [];

                return;
            }

            personnes = donnees

                // Exclure les visiteurs
                .filter(p => {

                    const type = normaliserTexte(
                        p.type ||
                        p.role ||
                        p.categorie ||
                        ""
                    );

                    return ![
                        "visiteur",
                        "visiteuse",
                        "visitor",
                        "visitors"
                    ].includes(type);
                })

                // Limiter les personnes au territoire du compte connecté.
                .filter(personneAccessibleSelonCompte)

                // Normalisation UNE SEULE FOIS
                .map(p => {

                    const nomPrenom =
                        valeur(p.nomPrenom) ||
                        valeur(p.nom) ||
                        valeur(p.nomComplet) ||
                        "";

                    const genre =
                        valeur(p.sexe) ||
                        valeur(p.Genre) ||
                        valeur(p.genre) ||
                        "";

                    const province =
                        valeur(p.province);

                    const commune =
                        valeur(p.commune);

                    const zone =
                        valeur(p.zone);

                    const colline =
                        valeur(p.colline);

                    const sousColline =
                        valeur(p.sousColline) ||
                        valeur(p.sous_colline) ||
                        valeur(p.sousCollineName);

                    const chef10 =
                        valeur(p.chef10Maisons) ||
                        valeur(p.chef10) ||
                        valeur(p.nomChef10) ||
                        "";

                    const pays =
                        valeur(p.pays) || "Burundi";

                    return {

                        original: p,

                        pays: pays,

                        nomPrenom: nomPrenom,

                        genre: genre,

                        province: province,

                        commune: commune,

                        zone: zone,

                        colline: colline,

                        sousColline: sousColline,

                        chef10: chef10,

                        // Texte préparé une seule fois
                        texteRecherche: normaliserTexte(
                            [
                                nomPrenom,
                                genre,
                                pays,
                                province,
                                commune,
                                zone,
                                colline,
                                sousColline,
                                chef10
                            ].join(" ")
                        )
                    };

                });

        } catch (erreur) {

            console.error(
                "Erreur chargement personnes :",
                erreur
            );

            personnes = [];

            afficherMessage(
                "Erreur lors du chargement des personnes.",
                "error"
            );
        }
    }

    /* =========================================================
       REMPLIR LES FILTRES
    ========================================================= */

    function remplirSelect(selectId, valeurs, texteDefaut) {

        const select = el(selectId);

        if (!select) return;

        const ancienneValeur = select.value;

        const liste = Array.from(valeurs)
            .filter(v => valeur(v) !== "")
            .sort((a, b) =>
                a.localeCompare(
                    b,
                    "fr",
                    {
                        sensitivity: "base"
                    }
                )
            );

        let html =
            `<option value="">${texteDefaut}</option>`;

        for (const item of liste) {

            html += `
                <option value="${echapperHTML(item)}">
                    ${echapperHTML(item)}
                </option>
            `;
        }

        select.innerHTML = html;

        // Restaurer la valeur si elle existe toujours
        if (liste.includes(ancienneValeur)) {

            select.value = ancienneValeur;

        } else {

            select.value = "";
        }
    }


    function construireFiltres() {

        const pays = new Set();
        const provinces = new Set();
        const communes = new Set();
        const zones = new Set();
        const collines = new Set();
        const sousCollines = new Set();
        const chefs10 = new Set();

        // Une seule boucle pour construire tous les filtres
        for (const p of personnes) {

            if (p.pays)
                pays.add(p.pays);

            if (p.province)
                provinces.add(p.province);

            if (p.commune)
                communes.add(p.commune);

            if (p.zone)
                zones.add(p.zone);

            if (p.colline)
                collines.add(p.colline);

            if (p.sousColline)
                sousCollines.add(p.sousColline);

            if (p.chef10)
                chefs10.add(p.chef10);
        }

        remplirSelect(
            "filtrePays",
            pays,
            "Tous les pays"
        );

        remplirSelect(
            "filtreProvince",
            provinces,
            "Toutes les provinces"
        );

        remplirSelect(
            "filtreCommune",
            communes,
            "Toutes les communes"
        );

        remplirSelect(
            "filtreZone",
            zones,
            "Toutes les zones"
        );

        remplirSelect(
            "filtreColline",
            collines,
            "Toutes les collines"
        );

        remplirSelect(
            "filtreSousColline",
            sousCollines,
            "Toutes les sous-collines"
        );

        remplirSelect(
            "filtreChef10",
            chefs10,
            "Tous les chefs"
        );
    }

    /* =========================================================
       FILTRAGE
    ========================================================= */

    function appliquerFiltres() {

        const pays =
            normaliserTexte(
                el("filtrePays")?.value
            );

        const province =
            normaliserTexte(
                el("filtreProvince")?.value
            );

        const commune =
            normaliserTexte(
                el("filtreCommune")?.value
            );

        const zone =
            normaliserTexte(
                el("filtreZone")?.value
            );

        const colline =
            normaliserTexte(
                el("filtreColline")?.value
            );

        const sousColline =
            normaliserTexte(
                el("filtreSousColline")?.value
            );

        const chef10 =
            normaliserTexte(
                el("filtreChef10")?.value
            );

        const recherche =
            normaliserTexte(
                el("recherchePersonnes")?.value
            );


        personnesFiltrees = personnes.filter(p => {

            // Filtre Pays
            if (
                pays &&
                normaliserTexte(p.pays) !== pays
            ) {
                return false;
            }

            // Filtre Province
            if (
                province &&
                normaliserTexte(p.province) !== province
            ) {
                return false;
            }

            // Filtre Commune
            if (
                commune &&
                normaliserTexte(p.commune) !== commune
            ) {
                return false;
            }

            // Filtre Zone
            if (
                zone &&
                normaliserTexte(p.zone) !== zone
            ) {
                return false;
            }

            // Filtre Colline
            if (
                colline &&
                normaliserTexte(p.colline) !== colline
            ) {
                return false;
            }

            // Filtre Sous-colline
            if (
                sousColline &&
                normaliserTexte(p.sousColline) !== sousColline
            ) {
                return false;
            }

            // Filtre Chef de 10 maisons
            if (
                chef10 &&
                normaliserTexte(p.chef10) !== chef10
            ) {
                return false;
            }

            // Recherche
            if (
                recherche &&
                !p.texteRecherche.includes(recherche)
            ) {
                return false;
            }

            return true;
        });


        afficherTableau();
    }

    /* =========================================================
       AFFICHAGE TABLEAU
    ========================================================= */

    function afficherTableau() {

        const tbody = el("tablePersonnes");

        const compteur = el("countPersonnes");

        if (!tbody) return;

        if (compteur) {

            compteur.textContent =
                personnesFiltrees.length;
        }


        if (personnesFiltrees.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td
                        colspan="9"
                        class="empty"
                    >
                        Aucune personne trouvée.
                    </td>
                </tr>
            `;

            return;
        }


        let html = "";

        personnesFiltrees.forEach((p, index) => {

            html += `
                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${echapperHTML(p.nomPrenom)}
                    </td>

                    <td>
                        ${echapperHTML(p.genre)}
                    </td>

                    <td>
                        ${echapperHTML(p.province)}
                    </td>

                    <td>
                        ${echapperHTML(p.commune)}
                    </td>

                    <td>
                        ${echapperHTML(p.zone)}
                    </td>

                    <td>
                        ${echapperHTML(p.colline)}
                    </td>

                    <td>
                        ${echapperHTML(p.sousColline)}
                    </td>

                    <td>
                        ${echapperHTML(p.chef10)}
                    </td>

                </tr>
            `;
        });


        // Une seule écriture dans le DOM
        tbody.innerHTML = html;
    }

    /* =========================================================
       RECHERCHE
    ========================================================= */

    function lancerRecherche() {

        clearTimeout(rechercheTimer);

        rechercheTimer = setTimeout(() => {

            appliquerFiltres();

        }, 100);
    }

    /* =========================================================
       REINITIALISER
    ========================================================= */

    function reinitialiserFiltres() {

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

            const select = el(id);

            if (select) {
                select.value = "";
            }
        });


        const recherche =
            el("recherchePersonnes");

        if (recherche) {

            recherche.value = "";
        }


        appliquerFiltres();

        afficherMessage(
            "Filtres réinitialisés."
        );
    }

    /* =========================================================
       ACTUALISER
    ========================================================= */

    function actualiser() {

        chargerPersonnes();

        construireFiltres();

        appliquerFiltres();

        afficherMessage(
            "Liste actualisée."
        );
    }

    /* =========================================================
       EXPORT CSV
    ========================================================= */

    function exporterCSV() {

        if (personnesFiltrees.length === 0) {

            afficherMessage(
                "Aucune personne à exporter.",
                "error"
            );

            return;
        }


        const lignes = [];

        lignes.push([
            "N°",
            "Nom et prénom",
            "Genre",
            "Province",
            "Commune",
            "Zone",
            "Colline",
            "Sous-colline",
            "Nom et prénom du chef de 10 maisons"
        ]);


        personnesFiltrees.forEach((p, index) => {

            lignes.push([

                index + 1,

                p.nomPrenom,

                p.genre,

                p.province,

                p.commune,

                p.zone,

                p.colline,

                p.sousColline,

                p.chef10

            ]);
        });


        const csv = lignes
            .map(ligne =>
                ligne.map(cellule => {

                    const texte =
                        valeur(cellule)
                            .replace(/"/g, '""');

                    return `"${texte}"`;

                }).join(";")
            )
            .join("\r\n");


        // BOM pour Excel
        const contenu =
            "\uFEFF" + csv;


        const blob =
            new Blob(
                [contenu],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const lien =
            document.createElement("a");

        lien.href = url;

        lien.download =
            "personnes_enregistrees.csv";

        document.body.appendChild(lien);

        lien.click();

        lien.remove();

        URL.revokeObjectURL(url);


        afficherMessage(
            "CSV téléchargé."
        );
    }

    /* =========================================================
       EXPORT PDF
    ========================================================= */

    function exporterPDF() {

        if (personnesFiltrees.length === 0) {

            afficherMessage(
                "Aucune personne à exporter.",
                "error"
            );

            return;
        }


        if (
            !window.jspdf ||
            !window.jspdf.jsPDF
        ) {

            afficherMessage(
                "La bibliothèque PDF n'est pas disponible.",
                "error"
            );

            return;
        }


        const { jsPDF } = window.jspdf;

        const doc =
            new jsPDF({
                orientation: "landscape",
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
            "Liste des personnes enregistrées",
            14,
            22
        );


        const head = [[

            "N°",
            "Nom et prénom",
            "Genre",
            "Province",
            "Commune",
            "Zone",
            "Colline",
            "Sous-colline",
            "Chef de 10 maisons"

        ]];


        const body =
            personnesFiltrees.map((p, index) => [

                index + 1,

                p.nomPrenom,

                p.genre,

                p.province,

                p.commune,

                p.zone,

                p.colline,

                p.sousColline,

                p.chef10

            ]);


        if (
            typeof doc.autoTable !== "function"
        ) {

            afficherMessage(
                "AutoTable n'est pas disponible.",
                "error"
            );

            return;
        }


        doc.autoTable({

            head: head,

            body: body,

            startY: 28,

            theme: "grid",

            styles: {
                fontSize: 7,
                cellPadding: 2
            },

            headStyles: {
                fontSize: 7
            },

            margin: {
                left: 8,
                right: 8
            }
        });


        doc.save(
            "personnes_enregistrees.pdf"
        );


        afficherMessage(
            "PDF téléchargé."
        );
    }

    /* =========================================================
       DECONNEXION
    ========================================================= */

    function deconnexion() {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");

        localStorage.removeItem(
            "bpr_manager_connecte"
        );

        localStorage.removeItem(
            "bpr_current_user"
        );

        window.location.replace(
            "index.html"
        );
    }

    /* =========================================================
       EVENEMENTS
    ========================================================= */

    function initialiserEvenements() {

        // Filtres
        const filtres = [

            "filtrePays",
            "filtreProvince",
            "filtreCommune",
            "filtreZone",
            "filtreColline",
            "filtreSousColline",
            "filtreChef10"

        ];


        filtres.forEach(id => {

            const select = el(id);

            if (!select) return;

            select.addEventListener(
                "change",
                appliquerFiltres
            );
        });


        // Recherche
        const recherche =
            el("recherchePersonnes");

        if (recherche) {

            recherche.addEventListener(
                "input",
                lancerRecherche
            );
        }


        const btnRecherche =
            el("btnRecherche");

        if (btnRecherche) {

            btnRecherche.addEventListener(
                "click",
                appliquerFiltres
            );
        }


        // Reset
        const btnReset =
            el("btnReset");

        if (btnReset) {

            btnReset.addEventListener(
                "click",
                reinitialiserFiltres
            );
        }


        // Actualiser
        const btnActualiser =
            el("btnActualiser");

        if (btnActualiser) {

            btnActualiser.addEventListener(
                "click",
                actualiser
            );
        }


        // CSV
        const btnCSV =
            el("btnExportCSV");

        if (btnCSV) {

            btnCSV.addEventListener(
                "click",
                exporterCSV
            );
        }


        // PDF
        const btnPDF =
            el("btnExportPDF");

        if (btnPDF) {

            btnPDF.addEventListener(
                "click",
                exporterPDF
            );
        }


        // Déconnexion
        const btnDeconnexion =
            el("btnDeconnexion");

        if (btnDeconnexion) {

            btnDeconnexion.addEventListener(
                "click",
                deconnexion
            );
        }
    }

    /* =========================================================
       INITIALISATION
    ========================================================= */

    function init() {

        if (!verifierConnexion()) {
            return;
        }

        chargerPersonnes();

        construireFiltres();

        initialiserEvenements();

        appliquerFiltres();
    }


    document.addEventListener(
        "DOMContentLoaded",
        init
    );

})();