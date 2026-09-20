
/* =========================================================
   🇧🇮 BURUNDI PEOPLE REGISTRY
   🤖 BPR ASSISTANT - JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const botButton = document.getElementById("botButton");
    const botWindow = document.getElementById("botWindow");
    const closeBot = document.getElementById("closeBot");
    const botInput = document.getElementById("botInput");
    const sendBot = document.getElementById("sendBot");
    const botMessages = document.getElementById("botMessages");

    const quickQuestions =
        document.querySelectorAll(".quick-question");


    /* =====================================================
       KUGENZURA KO ELEMENTS ZOSE ZIRIHO
    ===================================================== */

    if (
        !botButton ||
        !botWindow ||
        !closeBot ||
        !botInput ||
        !sendBot ||
        !botMessages
    ) {
        console.warn("BPR Bot: certains éléments HTML manquent.");
        return;
    }


    /* =====================================================
       LOCAL STORAGE KEYS
    ===================================================== */

    const MENAGES_KEY = "bpr_menages";
    const PERSONNES_KEY = "bpr_personnes";
    const VISITEURS_KEY = "bpr_visiteurs";


    /* =====================================================
       FUNCTIONS - LOCAL STORAGE
    ===================================================== */

    function lireJSON(key) {

        try {

            const data = localStorage.getItem(key);

            if (!data) {
                return [];
            }

            const parsed = JSON.parse(data);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Erreur localStorage:",
                key,
                error
            );

            return [];
        }
    }


    function getMenages() {
        return lireJSON(MENAGES_KEY);
    }


    function getPersonnes() {
        return lireJSON(PERSONNES_KEY);
    }


    function getVisiteurs() {
        return lireJSON(VISITEURS_KEY);
    }


    /* =====================================================
       NORMALISATION
    ===================================================== */

    function normaliser(value) {

        return String(value || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }


    function texte(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        if (typeof value === "object") {

            if (Array.isArray(value)) {
                return value.join(" ");
            }

            return "";
        }

        return String(value).trim();
    }


    /* =====================================================
       OBTENIR UNE VALEUR PAR PLUSIEURS NOMS
    ===================================================== */

    function valeur(obj, keys) {

        if (!obj || typeof obj !== "object") {
            return "";
        }

        for (const key of keys) {

            if (
                obj[key] !== undefined &&
                obj[key] !== null &&
                String(obj[key]).trim() !== ""
            ) {
                return obj[key];
            }
        }

        return "";
    }


    /* =====================================================
       IDENTIFIANTS
    ===================================================== */

    function idPersonne(personne) {

        return texte(
            valeur(personne, [
                "id",
                "_id",
                "ID",
                "uuid",
                "identifiant",
                "personneId",
                "person_id",
                "numero"
            ])
        );
    }


    function idMenage(menage) {

        return texte(
            valeur(menage, [
                "id",
                "_id",
                "ID",
                "uuid",
                "identifiant",
                "menageId",
                "menage_id",
                "numero",
                "code",
                "reference"
            ])
        );
    }


    function idMenagePersonne(personne) {

        return texte(
            valeur(personne, [
                "menageId",
                "menage_id",
                "idMenage",
                "id_menage",
                "householdId",
                "household_id",
                "foyerId",
                "foyer_id"
            ])
        );
    }


    /* =====================================================
       NOM
    ===================================================== */

    function nomPersonne(personne) {

        if (!personne) {
            return "";
        }

        const nomComplet = valeur(personne, [
            "nomComplet",
            "nom_complet",
            "fullName",
            "name",
            "nomPrenom"
        ]);

        if (nomComplet) {
            return texte(nomComplet);
        }

        const nom = texte(
            valeur(personne, [
                "nom",
                "lastName",
                "surname",
                "familyName"
            ])
        );

        const prenom = texte(
            valeur(personne, [
                "prenom",
                "prénom",
                "firstName"
            ])
        );

        return [nom, prenom]
            .filter(Boolean)
            .join(" ")
            .trim();
    }


    /* =====================================================
       SEXE
    ===================================================== */

    function sexePersonne(personne) {

        return texte(
            valeur(personne, [
                "sexe",
                "genre",
                "gender"
            ])
        );
    }


    /* =====================================================
       AGE
    ===================================================== */

    function agePersonne(personne) {

        const age = valeur(personne, [
            "age",
            "âge"
        ]);

        if (age !== "") {
            return texte(age);
        }

        const date = valeur(personne, [
            "dateNaissance",
            "date_naissance",
            "birthDate",
            "dob"
        ]);

        if (!date) {
            return "";
        }

        const naissance = new Date(date);

        if (isNaN(naissance.getTime())) {
            return "";
        }

        const aujourdHui = new Date();

        let ageCalcule =
            aujourdHui.getFullYear() -
            naissance.getFullYear();

        const mois =
            aujourdHui.getMonth() -
            naissance.getMonth();

        if (
            mois < 0 ||
            (
                mois === 0 &&
                aujourdHui.getDate() <
                naissance.getDate()
            )
        ) {
            ageCalcule--;
        }

        return String(ageCalcule);
    }


    /* =====================================================
       LOCALISATION
    ===================================================== */

    function localisationMenage(menage) {

        return {

            pays: texte(
                valeur(menage, [
                    "pays",
                    "country"
                ])
            ),

            province: texte(
                valeur(menage, [
                    "province"
                ])
            ),

            commune: texte(
                valeur(menage, [
                    "commune"
                ])
            ),

            zone: texte(
                valeur(menage, [
                    "zone"
                ])
            ),

            colline: texte(
                valeur(menage, [
                    "colline",
                    "quartier"
                ])
            ),

            sousColline: texte(
                valeur(menage, [
                    "sousColline",
                    "sous_colline",
                    "sous-colline"
                ])
            ),

            chef10: texte(
                valeur(menage, [
                    "chef10Maisons",
                    "chef_10_maisons",
                    "nomChef10Maisons"
                ])
            )
        };
    }


    /* =====================================================
       TROUVER MENAGE PAR ID
    ===================================================== */

    function trouverMenage(id) {

        const menages = getMenages();

        const cible = normaliser(id);

        return menages.find(function (menage) {

            return normaliser(idMenage(menage)) === cible;

        }) || null;
    }


    /* =====================================================
       PERSONNES D'UN MENAGE
    ===================================================== */

    function personnesDuMenage(menage) {

        if (!menage) {
            return [];
        }

        const id = idMenage(menage);

        const personnes = getPersonnes();

        return personnes.filter(function (personne) {

            const idP = idMenagePersonne(personne);

            return (
                id &&
                idP &&
                normaliser(idP) === normaliser(id)
            );

        });
    }


    /* =====================================================
       VISITEURS D'UN MENAGE
    ===================================================== */

    function visiteursDuMenage(menage) {

        if (!menage) {
            return [];
        }

        const id = idMenage(menage);

        const visiteurs = getVisiteurs();

        return visiteurs.filter(function (visiteur) {

            const idV = texte(
                valeur(visiteur, [
                    "menageId",
                    "menage_id",
                    "idMenage",
                    "id_menage",
                    "householdId",
                    "household_id"
                ])
            );

            return (
                id &&
                idV &&
                normaliser(idV) === normaliser(id)
            );

        });
    }


    /* =====================================================
       STATISTIQUES
    ===================================================== */

    function statistiques() {

        const menages = getMenages();
        const personnes = getPersonnes();
        const visiteurs = getVisiteurs();

        let hommes = 0;
        let femmes = 0;

        personnes.forEach(function (personne) {

            const sexe =
                normaliser(
                    sexePersonne(personne)
                );

            if (
                sexe === "masculin" ||
                sexe === "homme" ||
                sexe === "m"
            ) {
                hommes++;
            }

            if (
                sexe === "feminin" ||
                sexe === "femme" ||
                sexe === "f"
            ) {
                femmes++;
            }

        });

        return {
            menages: menages.length,
            personnes: personnes.length,
            visiteurs: visiteurs.length,
            hommes: hommes,
            femmes: femmes
        };
    }


    /* =====================================================
       AJOUTER MESSAGE BOT
    ===================================================== */

    function ajouterMessageBot(message) {

        const wrapper =
            document.createElement("div");

        wrapper.className = "bot-message";

        wrapper.innerHTML = `
            <div class="message-avatar">
                🤖
            </div>

            <div class="message-content">
                <strong>BPR Assistant</strong>
                <p>${echapperHTML(message)}</p>
            </div>
        `;

        botMessages.appendChild(wrapper);

        scrollMessages();
    }


    /* =====================================================
       AJOUTER MESSAGE UTILISATEUR
    ===================================================== */

    function ajouterMessageUtilisateur(message) {

        const div =
            document.createElement("div");

        div.className = "user-message";

        div.textContent = message;

        botMessages.appendChild(div);

        scrollMessages();
    }


    /* =====================================================
       SECURITE HTML
    ===================================================== */

    function echapperHTML(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       SCROLL
    ===================================================== */

    function scrollMessages() {

        botMessages.scrollTop =
            botMessages.scrollHeight;
    }


    /* =====================================================
       CHERCHER PERSONNE PAR NOM
    ===================================================== */

    function rechercherPersonne(question) {

        const personnes = getPersonnes();

        const mots = normaliser(question)
            .split(/\s+/)
            .filter(function (mot) {
                return mot.length >= 3;
            });

        const resultats =
            personnes.filter(function (personne) {

                const nom =
                    normaliser(
                        nomPersonne(personne)
                    );

                if (!nom) {
                    return false;
                }

                return mots.some(function (mot) {

                    return nom.includes(mot);

                });

            });

        return resultats.slice(0, 5);
    }


    /* =====================================================
       REPONSE POUR UNE PERSONNE
    ===================================================== */

    function reponsePersonne(personne) {

        const nom =
            nomPersonne(personne) ||
            "Personne sans nom";

        const sexe =
            sexePersonne(personne) ||
            "Non renseigné";

        const age =
            agePersonne(personne) ||
            "Non renseigné";

        return (
            "👤 " + nom +
            "\n\n" +
            "Sexe : " + sexe +
            "\n" +
            "Âge : " + age
        );
    }


    /* =====================================================
       RECHERCHER UNE PROVINCE
    ===================================================== */

    function personnesProvince(province) {

        const personnes = getPersonnes();
        const menages = getMenages();

        const resultats = [];

        personnes.forEach(function (personne) {

            const idM =
                idMenagePersonne(personne);

            const menage =
                menages.find(function (m) {

                    return (
                        idM &&
                        normaliser(idMenage(m)) ===
                        normaliser(idM)
                    );

                });

            if (!menage) {
                return;
            }

            const loc =
                localisationMenage(menage);

            if (
                normaliser(loc.province)
                .includes(normaliser(province))
            ) {
                resultats.push(personne);
            }

        });

        return resultats;
    }


    /* =====================================================
       GENERER REPONSE
    ===================================================== */

    function genererReponse(question) {

        const q = normaliser(question);

        const stats = statistiques();

        /* ---------------------------------------------
           SALUTATION
        --------------------------------------------- */

        if (
            q.includes("bonjour") ||
            q.includes("salut") ||
            q.includes("muraho") ||
            q.includes("hello") ||
            q.includes("mwaramutse")
        ) {

            return (
                "Muraho neza! 👋🇧🇮\n\n" +
                "Ndi BPR Assistant. " +
                "Noshobora kugufasha gukoresha " +
                "Burundi People Registry."
            );
        }


        /* ---------------------------------------------
           AIDE
        --------------------------------------------- */

        if (
            q.includes("aide") ||
            q.includes("help") ||
            q.includes("fasha") ||
            q.includes("ubufasha") ||
            q.includes("nshaka kumenya")
        ) {

            return (
                "🤖 Noshobora kugufasha kuri:\n\n" +

                "🏠 Ménages\n" +
                "👥 Personnes\n" +
                "👤 Visiteurs\n" +
                "📊 Statistiques\n" +
                "🔎 Recherche\n" +
                "📝 Inscription\n" +
                "📍 Localisation\n\n" +

                "Akarorero:\n" +
                "• Ménages zingahe?\n" +
                "• Abantu bangana iki?\n" +
                "• Hari visiteurs bangahe?\n" +
                "• Nshaka kurondera Jean"
            );
        }


        /* ---------------------------------------------
           STATISTIQUES
        --------------------------------------------- */

        if (
            q.includes("statistique") ||
            q.includes("statistiques") ||
            q.includes("stats") ||
            q.includes("dashboard")
        ) {

            return (
                "📊 STATISTIQUES BPR\n\n" +

                "🏠 Ménages : " +
                stats.menages + "\n\n" +

                "👥 Personnes : " +
                stats.personnes + "\n\n" +

                "👨 Hommes : " +
                stats.hommes + "\n\n" +

                "👩 Femmes : " +
                stats.femmes + "\n\n" +

                "👤 Visiteurs : " +
                stats.visiteurs
            );
        }


        /* ---------------------------------------------
           MENAGES
        --------------------------------------------- */

        if (
            q.includes("menage") ||
            q.includes("ménage") ||
            q.includes("famille") ||
            q.includes("imiryango") ||
            q.includes("foyer")
        ) {

            return (
                "🏠 Hari " +
                stats.menages +
                " ménage(s) enregistré(s) muri BPR."
            );
        }


        /* ---------------------------------------------
           PERSONNES
        --------------------------------------------- */

        if (
            q.includes("personne") ||
            q.includes("personnes") ||
            q.includes("bantu") ||
            q.includes("abantu")
        ) {

            return (
                "👥 Hari " +
                stats.personnes +
                " personne(s) enregistrée(s) muri BPR."
            );
        }


        /* ---------------------------------------------
           HOMMES
        --------------------------------------------- */

        if (
            q.includes("homme") ||
            q.includes("hommes") ||
            q.includes("abagabo") ||
            q.includes("abapfasoni")
        ) {

            return (
                "👨 Abagabo / hommes: " +
                stats.hommes
            );
        }


        /* ---------------------------------------------
           FEMMES
        --------------------------------------------- */

        if (
            q.includes("femme") ||
            q.includes("femmes") ||
            q.includes("abagore")
        ) {

            return (
                "👩 Abagore / femmes: " +
                stats.femmes
            );
        }


        /* ---------------------------------------------
           VISITEURS
        --------------------------------------------- */

        if (
            q.includes("visiteur") ||
            q.includes("visiteurs") ||
            q.includes("visitor") ||
            q.includes("abasura")
        ) {

            return (
                "👤 Hari " +
                stats.visiteurs +
                " visiteur(s) enregistré(s)."
            );
        }


        /* ---------------------------------------------
           INSCRIPTION
        --------------------------------------------- */

        if (
            q.includes("inscription") ||
            q.includes("kwandika") ||
            q.includes("enregistrer") ||
            q.includes("enregistrement")
        ) {

            return (
                "📝 Kugira wandike ménage nshasha:\n\n" +
                "1️⃣ Ja kuri 'Inscription'.\n" +
                "2️⃣ Uzuza amakuru y'umuryango.\n" +
                "3️⃣ Ongeramwo abana n'abandi bantu.\n" +
                "4️⃣ Kanda 'Enregistrer le ménage'."
            );
        }


        /* ---------------------------------------------
           RECHERCHE
        --------------------------------------------- */

        if (
            q.includes("recherche") ||
            q.includes("chercher") ||
            q.includes("kurondera") ||
            q.includes("rechercher")
        ) {

            const resultats =
                rechercherPersonne(question);

            if (resultats.length > 0) {

                let reponse =
                    "🔎 Nabonye:\n\n";

                resultats.forEach(function (personne, index) {

                    reponse +=
                        (index + 1) +
                        ". " +
                        (
                            nomPersonne(personne) ||
                            "Sans nom"
                        ) +
                        "\n";

                });

                return reponse;
            }

            return (
                "🔎 Nta muntu nabonye ahuye n'ico wanditse.\n\n" +
                "Gerageza kwandika izina ryose canke igice c'izina."
            );
        }


        /* ---------------------------------------------
           PROVINCE
        --------------------------------------------- */

        const provinces = [
            "Buhumuza",
            "Bujumbura",
            "Burunga",
            "Butanyerera",
            "Gitega"
        ];

        for (const province of provinces) {

            if (q.includes(normaliser(province))) {

                const resultats =
                    personnesProvince(province);

                return (
                    "📍 " +
                    province +
                    "\n\n" +
                    "👥 Personnes trouvées : " +
                    resultats.length
                );
            }
        }


        /* ---------------------------------------------
           QUESTION AGE
        --------------------------------------------- */

        if (
            q.includes("age") ||
            q.includes("âge") ||
            q.includes("imyaka")
        ) {

            return (
                "🎂 Noshobora kukwereka imyaka y'umuntu " +
                "niba date de naissance canke âge vyanditswe muri BPR."
            );
        }


        /* ---------------------------------------------
           LISTE
        --------------------------------------------- */

        if (
            q.includes("liste") ||
            q.includes("listes")
        ) {

            return (
                "📋 Kugira ubone liste y'abantu canke ménages, " +
                "ja kuri page 'Liste'."
            );
        }


        /* ---------------------------------------------
           ACCUEIL
        --------------------------------------------- */

        if (
            q.includes("accueil") ||
            q.includes("home")
        ) {

            return (
                "🏠 Urashobora gusubira kuri page " +
                "'Accueil' kugira ubone dashboard ya BPR."
            );
        }


        /* ---------------------------------------------
           MERCI
        --------------------------------------------- */

        if (
            q.includes("merci") ||
            q.includes("murakoze") ||
            q.includes("thanks")
        ) {

            return (
                "Ntakibazo! 😊🇧🇮\n" +
                "BPR Assistant yama yiteguye kugufasha."
            );
        }


        /* ---------------------------------------------
           REPONSE PAR DEFAUT
        --------------------------------------------- */

        return (
            "🤖 Sinatahuye neza ikibazo cawe.\n\n" +

            "Gerageza kimwe muri ibi:\n\n" +

            "🏠 Ménages zingahe?\n" +
            "👥 Abantu bangana iki?\n" +
            "👤 Visiteurs bangahe?\n" +
            "📊 Mpa statistiques\n" +
            "🔎 Kurondera umuntu Jean\n" +
            "📝 Nandikisha gute ménage?\n" +
            "❓ Aide"
        );
    }


    /* =====================================================
       ENVOYER MESSAGE
    ===================================================== */

    function envoyerMessage(message) {

        message = String(message || "").trim();

        if (!message) {
            return;
        }

        ajouterMessageUtilisateur(message);

        botInput.value = "";

        /* Indicateur de réflexion */

        const typing =
            document.createElement("div");

        typing.className = "bot-message";

        typing.id = "botTyping";

        typing.innerHTML = `
            <div class="message-avatar">
                🤖
            </div>

            <div class="message-content">
                <strong>BPR Assistant</strong>
                <p>⌛ Ndiko ndarondera...</p>
            </div>
        `;

        botMessages.appendChild(typing);

        scrollMessages();


        /* Réponse */

        setTimeout(function () {

            const oldTyping =
                document.getElementById("botTyping");

            if (oldTyping) {
                oldTyping.remove();
            }

            const reponse =
                genererReponse(message);

            ajouterMessageBot(reponse);

        }, 450);
    }


    /* =====================================================
       OUVRIR BOT
    ===================================================== */

    botButton.addEventListener(
        "click",
        function () {

            if (
                botWindow.style.display === "block"
            ) {

                botWindow.style.display = "none";

            } else {

                botWindow.style.display = "block";

                setTimeout(function () {
                    botInput.focus();
                }, 100);

            }

        }
    );


    /* =====================================================
       FERMER BOT
    ===================================================== */

    closeBot.addEventListener(
        "click",
        function () {

            botWindow.style.display = "none";

        }
    );


    /* =====================================================
       ENVOYER AVEC BOUTON
    ===================================================== */

    sendBot.addEventListener(
        "click",
        function () {

            envoyerMessage(
                botInput.value
            );

        }
    );


    /* =====================================================
       ENTRÉE CLAVIER
    ===================================================== */

    botInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                envoyerMessage(
                    botInput.value
                );

            }

        }
    );


    /* =====================================================
       QUESTIONS RAPIDES
    ===================================================== */

    quickQuestions.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        button.getAttribute(
                            "data-question"
                        );

                    if (question) {

                        envoyerMessage(question);

                    }

                }
            );

        }
    );


    /* =====================================================
       OUVRIR AVEC RACCOURCI
       Ctrl + B
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "b"
            ) {

                event.preventDefault();

                botButton.click();

            }

        }
    );


    /* =====================================================
       RAFRAÎCHIR QUAND LOCALSTORAGE CHANGE
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key === MENAGES_KEY ||
                event.key === PERSONNES_KEY ||
                event.key === VISITEURS_KEY
            ) {

                console.log(
                    "BPR Assistant: données actualisées."
                );

            }

        }
    );


    /* =====================================================
       MESSAGE DE DEMARRAGE
    ===================================================== */

    console.log(
        "🇧🇮 BPR Assistant chargé avec succès."
    );

});
