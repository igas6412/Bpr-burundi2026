

import {
    creerCompte,
    chargerComptes,
    modifierCompte,
    supprimerCompte,
    compteConnecte
} from "./bpr-firebase.js";

// ======================================================

// COMPTE.JS

// BURUNDI PEOPLE REGISTRY

// Province > Commune > Zone > Colline / Quartier

// ======================================================





// ======================================================

// 1. COMMUNES PAR PROVINCE

// ======================================================



const COMMUNES_PAR_PROVINCE = {

Buhumuza: [

        "Butaganzwa",

        "Butihinda",

        "Cankuzo",

        "Gisagara",

        "Gisuru",

        "Muyinga",

        "Ruyigi"

    ],



    Bujumbura: [

        "Bubanza",

        "Bukinanyana",

        "Cibitoke",

        "Isare",

        "Mpanda",

        "Mugere",

        "Mugina",

        "Muhuta",

        "Mukaza",

        "Ntahangwa",

        "Rwibaga"

    ],



    Burunga: [

        "Bururi",

        "Makamba",

        "Matana",

        "Musongati",

        "Nyanza",

        "Rumonge",

        "Rutana"

    ],



    Butanyerera: [

        "Busoni",

        "Kayanza",

        "Kiremba",

        "Kirundo",

        "Matongo",

        "Muhanga",

        "Ngozi",

        "Tangara"

    ],



    Gitega: [

        "Bugendana",

        "Gishubi",

        "Gitega",

        "Karusi",

        "Kiganda",

        "Muramvya",

        "Mwaro",

        "Nyabihanga",

        "Shombo"

    ]

};







const BUJUMBURA = {



    // =========================

    // 1. COMMUNE BUBANZA

    // =========================

    "BUBANZA": {



        "Bubanza": [

            "Quartier Bubanza",

            "Quartier Buhororo",

            "Quartier Giko",

            "Quartier Matonge",

            "Quartier Ruvumvu"

        ],



        "Buvyuko": [

            "Cimbizi",

            "Muhanza",

            "Muhenga",

            "Nyabitaka",

            "Rugunga",

            "Rurabo",

            "Zina"

        ],



        "Kivyuka": [

            "Busiga",

            "Gashinge",

            "Gatare",

            "Kiziba",

            "Munanira"

        ],



        "Mitakataka": [

            "Gahongore",

            "Gatura",

            "Kagirigiri",

            "Mitakataka"

        ],



        "Muramba": [

            "Ciya",

            "Gitanga",

            "Gitsira",

            "Karinzi",

            "Kivyiru",

            "Mugombu",

            "Muramba",

            "Mwanda",

            "Ngara",

            "Rabiro"

        ],



        "Musigati": [

            "Buhurika",

            "Bukinga",

            "Dondi",

            "Kanazi",

            "Kayange",

            "Mpishi",

            "Mugombarima",

            "Musigati",

            "Nyarusange"

        ],



        "Muyebe": [

            "Bubenga",

            "Butaha",

            "Masare",

            "Mugoma",

            "Muyebe",

            "Ruvyimvya"

        ],



        "Ntamba": [

            "Mpinga",

            "Ntamba",

            "Rugeyo",

            "Rusekabuye",

            "Rushiha"

        ]

    },





    // =========================

    // 2. COMMUNE BUKINANYANA

    // =========================

    "BUKINANYANA": {



        "Buganda": [

            "Cuny(u)",

            "Gasenyi",

            "Kaburantswa",

            "Ruhagarika"

        ],



        "Buhayira": [

            "Buhayira",

            "Kabuye",

            "Muzenga",

            "Remera",

            "Rugano"

        ],



        "Bumba": [

            "Bumba",

            "Butara",

            "Munyinya",

            "Nderama",

            "Rtyazo",

            "Ruhembe",

            "Runege"

        ],



        "Buzirasazi": [

            "Gasheke",

            "Gitera",

            "Jerama",

            "Maranga",

            "Nyarurinzi"

        ],



        "Gahabura": [

            "Gahabura",

            "Mikoni",

            "Murengera",

            "Rangira",

            "Rubaya"

        ],



        "Masango": [

            "Kibati",

            "Masango",

            "Mwungo",

            "Nyarumba",

            "Sehe"

        ],



        "Ndava": [

            "Kansega",

            "Muremera",

            "Mwunguzi",

            "Ndava",

            "Nimba",

            "Nyamitanga"

        ],



        "Ndora": [

            "Bihembe",

            "Bitare",

            "Burimbi",

            "Giserama",

            "Kabondo",

            "Kibaya",

            "Myave",

            "Nyamyeha",

            "Nyarubugu"

        ],



        "Rusenda": [

            "Kabere",

            "Nyampinda",

            "Nyangwe",

            "Rusenda",

            "Shimwe"

        ]

    },





    // =========================

    // 3. COMMUNE CIBITOKE

    // =========================

    "CIBITOKE": {



        "Buhindo": [

            "Buhindo",

            "Butega",

            "Kagimbu",

            "Kahirwa",

            "Kajerama",

            "Kivumvu"

        ],



        "Cibitoke": [

            "Murambi",

            "Quartier Cibitoke",

            "Quartier Kagazi",

            "Quartier Karurama",

            "Quartier Rusiga"

        ],



        "Kiramira": [

            "Kiramira",

            "Mihiza",

            "Rusororo",

            "Ruvumera"

        ],



        "Murwi": [

            "Bubogora",

            "Gitohere",

            "Manege",

            "Masha",

            "Mirombero",

            "Murwi",

            "Mushanga"

        ],



        "Ngoma": [

            "Mahande",

            "Mugimbu",

            "Ngoma",

            "Nyabubuye"

        ],



        "Rugombo": [

            "Dogodogo",

            "Mparambo",

            "Rugererege",

            "Samwe",

            "Quartier Munyika",

            "Quartier Nyakaganda"

        ],



        "Rukana": [

            "Gabiro",

            "Gicaca",

            "Musenyi",

            "Ruhwa",

            "Rukana"

        ]

    },





    // =========================

    // 4. COMMUNE ISARE

    // =========================

    "ISARE": {



        "Kibuye": [

            "Buyimba",

            "Kibuye",

            "Nyarukere",

            "Rusha",

            "Sagara"

        ],



        "Kirama": [

            "Gasenyi",

            "Gatebe",

            "Kavya",

            "Mutumirwa",

            "Rubaya",

            "Rutunda"

        ],



        "Mageyo": [

            "Buhanda",

            "Gitwe",

            "Karugamba",

            "Kinama",

            "Mageyo",

            "Muhororo",

            "Muyabara"

        ],



        "Martyazo": [

            "Burenza",

            "Butega",

            "Kanyinya",

            "Kigunga",

            "Kinyinya",

            "Magarure"

        ],



        "Mubimbi": [

            "Gisagara",

            "Kiziba",

            "Mubimbi",

            "Muzazi",

            "Nyankuba"

        ],



        "Rushubi": [

            "Bibare",

            "Caranka",

            "Cirisha",

            "Nyarumpongo",

            "Rushubi",

            "Rutegama"

        ],



        "Ryarusera": [

            "Gakenke",

            "Gishubi",

            "Kayoyo",

            "Mugomere",

            "Muhweza",

            "Mwura",

            "Zinga"

        ]

    },





    // =========================

    // 5. COMMUNE MPANDA

    // =========================

    "MPANDA": {



        "Buringa": [

            "Buringa",

            "Mpanda",

            "Ninga",

            "Nyeshanga",

            "Ruhahe"

        ],



        "Butanuka": [

            "Butanuka",

            "Butembe",

            "Kanenga",

            "Kivyibusha",

            "Ruziba"

        ],



        "Gihanga": [

            "Buramata",

            "Gihanga",

            "Kizina",

            "Murira",

            "Rumotomoto"

        ],



        "Mpanda": [

            "Gahwazi",

            "Gatagura",

            "Gifurwe",

            "Masha",

            "Nyomvyi"

        ],



        "Mudubugu": [

            "Busongo",

            "Cabiza",

            "Gihungwe",

            "Kagwema",

            "Muyange",

            "Rugunga"

        ],



        "Musenyi": [

            "Murengeza",

            "Musenyi",

            "Nyamabere",

            "Rubira",

            "Rugenge"

        ],



        "Muzinda": [

            "Butanuka",

            "Kibenga",

            "Kirengane",

            "Mutara",

            "Muzinda"

        ],



        "Ruce": [

            "Giseza",

            "Kabanga",

            "Ruce",

            "Rutake",

            "Rwamvurwe"

        ],



        "Rugazi": [

            "Bugume",

            "Karambira",

            "Kayange",

            "Kibuye",

            "Nyenkarange",

            "Rugazi"

        ]

    },





    // =========================

    // 6. COMMUNE MUGERE

    // =========================

    "MUGERE": {



        "Buhanda": [

            "Bugongo",

            "Buhanda",

            "Masenga",

            "Nyankere",

            "Nyarwedeka",

            "Rukingiro",

            "Ruvyagira"

        ],



        "Gomvyi": [

            "Bubanza",

            "Burima",

            "Kayengwe",

            "Gakara",

            "Gomvyi",

            "Murambi",

            "Ntobo",

            "Rubanda",

            "Rutovu"

        ],



        "Kabezi": [

            "Kabezi",

            "Migera",

            "Masama",

            "Mwaza"

        ],



        "Kanyosha": [

            "Quartier Busoro",

            "Quartier Gisyo",

            "Quartier Kajiji",

            "Quartier Musama",

            "Quartier Nkenga"

        ],



        "Kinindo": [

            "Quartier Kibenga",

            "Quartier Kinindo",

            "Quartier Rukamo"

        ],



        "Kiyenzi": [

            "Buhina",

            "Gisovu",

            "Musugi",

            "Nyamaboko",

            "Rukuba",

            "Ruvumu"

        ],



        "Mubone": [

            "Gitenga",

            "Kimina",

            "Mubone",

            "Rugembe"

        ],



        "Musaga": [

            "Quartier Gasekebuye",

            "Quartier Gitaramuka",

            "Quartier Kamesa",

            "Quartier Kinanira",

            "Quartier Mpimba",

            "Quartier Muzenga",

            "Quartier Urumuri"

        ],



        "Ramba": [

            "Gakungwe",

            "Kiremba",

            "Mena",

            "Ramba"

        ],



        "Ruyaga": [

            "Bigwa",

            "Buhonga",

            "Buzige",

            "Mboza",

            "Mwico",

            "Ruyaga"

        ],



        "Ruziba": [

            "Kizingwe",

            "Mugere",

            "Ngabwe",

            "Nyabugete",

            "Ruziba"

        ]

    },





    // =========================

    // 7. COMMUNE MUGINA

    // =========================

    "MUGINA": {



        "Buhoro": [

            "Buhoro",

            "Busesa",

            "Mayuki",

            "Mukaka",

            "Nyarusebeyi",

            "Rumvya"

        ],



        "Butahana": [

            "Gafumbegeti",

            "Gahoma",

            "Gakerekwa",

            "Mageyo",

            "Muhungu",

            "Nyabungere",

            "Rungogo",

            "Rutorero"

        ],



        "Mabayi": [

            "Gitukura",

            "Kabere",

            "Kibande",

            "Mukoma",

            "Nyagaseke",

            "Rushiha"

        ],



        "Mugina": [

            "Butaramuka",

            "Bwayi",

            "Marumpu",

            "Mugina"

        ],



        "Nyamakarabo": [

            "Gitumba",

            "Nyamakarabo",

            "Nyempundu"

        ],



        "Rubona": [

            "Kagurutsi",

            "Gisumo",

            "Ngoma",

            "Nyamihana",

            "Rubona"

        ],



        "Rugajo": [

            "Gitebe",

            "Muyange",

            "Mwarangabo",

            "Kirinzi",

            "Rubirizi",

            "Rugajo",

            "Rugendo",

            "Rusagara"

        ],



        "Ruhororo": [

            "Gasebeyi",

            "Miremera",

            "Ruhororo"

        ],



        "Ruziba": [

            "Camakombe",

            "Rushima",

            "Ruziba"

        ]

    },





    // =========================

    // 8. COMMUNE MUHUTA

    // =========================

    "MUHUTA": {



        "Bugarama": [

            "Bugarama",

            "Kagona",

            "Kayombe",

            "Nyabungere"

        ],



        "Busenge": [

            "Burazi",

            "Busenge",

            "Canda",

            "Gasebeyi",

            "Gihondo",

            "Rubura"

        ],



        "Gitaza": [

            "Gasange",

            "Gitaza",

            "Kibingo",

            "Mubanga",

            "Mubone",

            "Rutunga"

        ],



        "Magara": [

            "Burangwa",

            "Cashi",

            "Kazigo",

            "Magara",

            "Mugendo",

            "Vuma"

        ],



        "Muhuta": [

            "Buringa",

            "Buyenzi",

            "Gitunda",

            "Kirombwe",

            "Muhuta"

        ],



        "Ruteme": [

            "Bambo",

            "Mihororo",

            "Ruteme",

            "Nyaruyaga"

        ],



        "Rutongo": [

            "Higiro",

            "Kanzaganya",

            "Kizuga",

            "Masara",

            "Murago",

            "Rutongo",

            "Ruyobera",

            "Sakonga"

        ]

    },





    // =========================

    // 9. COMMUNE MUKAZA

    // =========================

    "MUKAZA": {



        "Buyenzi": [

            "Quartier Kanzigiri",

            "Quartier Ruvumera",

            "Quartier Swahili"

        ],



        "Bwiza": [

            "Quartier Bwiza"

        ],



        "Mukaza": [

            "Quartier Kabondo",

            "Quartier Kiriri",

            "Quartier Mukaza",

            "Quartier Neendandumwe",

            "Quartier Ratiro",

            "Quartier Rohero",

            "Quartier Rweza"

        ],



        "Muyira": [

            "Bigoma",

            "Coga",

            "Kavumu",

            "Kirombwe",

            "Mirama",

            "Muyira",

            "Rubizi"

        ],



        "Nyakabiga": [

            "Quartier Mugoboka",

            "Quartier Mutanga",

            "Quartier Nyakabiga",

            "Quartier Rumuri"

        ]

    },





    // =========================

    // 10. COMMUNE NTAHANGWA

    // =========================

    "NTAHANGWA": {



        "Benga": [

            "Benga",

            "Karunga",

            "Kwigere"

        ],



        "Buterere": [

            "Quartier Bumwe",

            "Quartier Kabusa",

            "Quartier Kiyange",

            "Quartier Mubone",

            "Quartier Mugaruro",

            "Quartier Muhuza",

            "Quartier Mwezi",

            "Quartier Mwizero"

        ],



        "Cibitoke": [

            "Quartier Buhuriro",

            "Quartier Humuriza",

            "Quartier Mahoro",

            "Quartier Muhuza",

            "Quartier Mutakura",

            "Quartier Mwizero",

            "Quartier Nyamwiza"

        ],



        "Gatumba": [

            "Quartier Cuhiro",

            "Quartier Gaharawe",

            "Quartier Keza",

            "Quartier Mahotera",

            "Quartier Murinzi",

            "Quartier Mushasha",

            "Quartier Rusizi",

            "Quartier Vugizo",

            "Quartier Warubondo"

        ],



        "Gihosha": [

            "Gitare",

            "Huriro",

            "Kigobe",

            "Muyaga",

            "Nyabagere",

            "Sanganiro",

            "Sangwe",

            "Taba",

            "Winterekwa"

        ],



        "Kamenge": [

            "Gikizi",

            "Gituro",

            "Heha",

            "Kavumu",

            "Mirango",

            "Mukozi",

            "Songa",

            "Teza",

            "Twinyoni",

            "Twizerane"

        ],



        "Kinama": [

            "Bubanza",

            "Buhinyuza",

            "Bururi",

            "Carama",

            "Gitega",

            "Kanga",

            "Muco",

            "Muramvya",

            "Mutaga",

            "Muyinga",

            "Ngozi",

            "Ruyigi"

        ],



        "Kirekura": [

            "Budahirwa",

            "Bugoma",

            "Kivogero",

            "Mikangara",

            "Nyaruhama"

        ],



        "Mutimbuzi": [

            "Bigwati",

            "Buhomba",

            "Masanganzira",

            "Mugirigiri",

            "Mutimbuzi",

            "Muzazi",

            "Samariro"

        ],



        "Ngagara": [

            "Gateka",

            "Mahinguriro",

            "Majambere",

            "Mubano",

            "Mugisha",

            "Muhinga",

            "Muhizi",

            "Ngagara",

            "Rukundo"

        ],



        "Nyambuye": [

            "Gishingano",

            "Nyakibande",

            "Nyambuye"

        ],



        "Rubirizi": [

            "Gahahe",

            "Gahwama",

            "Gasenyi",

            "Gatunguru",

            "Karama",

            "Nyabunyegeri",

            "Rubirizi"

        ],



        "Rukaramu": [

            "Quartier Gakumbu",

            "Quartier Kagera",

            "Quartier Kajaga",

            "Quartier Kinyinya",

            "Quartier Ruvyagira",

            "Tenga"

        ]

    },





    // =========================

    // 11. COMMUNE RWIBAGA

    // =========================

    "RWIBAGA": {



        "Bikanka": [

            "Bikanka",

            "Kigozi",

            "Ndayi"

        ],



        "Jenda": [

            "Buhoro",

            "Jenda",

            "Kanyunya",

            "Mugoyi",

            "Nyarushanga",

            "Rwibaga",

            "Vyuya"

        ],



        "Kankima": [

            "Kibira",

            "Nyamugari"

        ],



        "Kigina": [

            "Karama",

            "Kigina",

            "Kinama",

            "Mugendo"

        ],



        "Matara": [

            "Kizunga",

            "Matara",

            "Mukonko"

        ],



        "Mugongo": [

            "Rutambiro",

            "Mwumba"

        ],



        "Mukike": [

            "Mayuyu",

            "Nyarumanga",

            "Rurambira",

            "Ruzibazi"

        ],



        "Nyabibondo": [

            "Gasarara",

            "Mayemba",

            "Mbare",

            "Muhuha",

            "Nyabibondo"

        ],



        "Nyabiraba": [

            "Bubaji",

            "Kinyami",

            "Musenyi",

            "Nyabiraba",

            "Raro"

        ],



        "Rukina": [

            "Mutobo",

            "Ruhororo",

            "Rukina"

        ]

    }

};



// ======================================================

// 2. BUJUMBURA

// Commune > Zone > Colline / Quartier

// ======================================================





const BUHUMUZA = {



    // =========================

    // COMMUNE BUTAGANZWA

    // =========================

    "BUTAGANZWA": {



        "Bisinde": [

            "Bisinde",

            "Bugarama",

            "Karambi",

            "Kazimya",

            "Nyabigugo",

            "Rutimbura",

            "Rutonganyikwa"

        ],



        "Biyorwa": [

            "Biyorwa",

            "Burenza",

            "Masazi",

            "Mihama",

            "Mpame",

            "Nyamugari",

            "Nyarubabi",

            "Rugata",

            "Taba"

        ],



        "Mugege": [

            "Bigera",

            "Caragata",

            "Gakonk(o)",

            "Kivumu",
            
            "Mpungwe",

            "Mugege",

            "Muhene",

            "Musenga",

            "Nyangurabe",

            "Nyankende",

            "Rubambagire"

        ],



        "Muriza": [

            "Bartye",

            "Gasasa",

            "Gikiwye",

            "Gishubi",

            "Kanyinya",

            "Kirambi",

            "Kiyabu",

            "Muriza",

            "Nyaburondwe",

            "Nyamiyaga",

            "Nyarurambi"

        ],



        "Rugongo": [

            "Kirangara",

            "Kivoga",

            "Kizigama",

            "Maramvya",

            "Nyagashubi",

            "Nyange",

            "Rugongo"

        ]

    },





    // =========================

    // COMMUNE BUTHINDA

    // =========================

    "BUTHINDA": {



        "Butarugera": [

            "Buhorana",

            "Kavumu",

            "Kinyuku",

            "Kobero",

            "Ntaruka",

            "Rabiro",

            "Tangara",

            "Wingoma"

        ],



        "Buthinda": [

            "Bucamihigo",

            "Buthinda",

            "Maramvya",

            "Munyinya",

            "Ngara",

            "Rukira",

            "Rushombo"

        ],



        "Burambira": [

            "Burambira",

            "Burenza",

            "Gikingo",

            "Gisabuzwa",

            "Migwa",

            "Nyarusanga"

        ],



        "Buvumbi": [

            "Buvumbi",

            "Gahahe",

            "Gitega",

            "Masaka",

            "Nyamihondi",

            "Zaga"

        ],



        "Gashoho": [

            "Bwisha",

            "Cihonda",

            "Gashoho",

            "Gishambusha",

            "Gitwa",

            "Kagari",

            "Kinyami",

            "Muruta",

            "Muyange",

            "Nkohwa"

        ],



        "Gisanze": [

            "Bonero",

            "Busasa",

            "Gisebeyi",

            "Muzingi",

            "Rugerero"

        ],



        "Giteranyi": [

            "Bisiga",

            "Gas(e)nyi",

            "Giteranyi",

            "Karugunda",

            "Nonwe",

            "Rugese",

            "Rukungere",

            "Rumandari",

            "Shoza"

        ],



        "Kamaramagambo": [

            "Cagizo",

            "Gatwenzi",

            "Kamaramagambo",

            "Kibande",

            "Kinonora",

            "Maruri",

            "Mugongo",

            "Murehe",

            "Rwamfu"

        ],



        "Masaka": [

            "Cagakori",

            "Kayove",

            "Kijumbura",

            "Masaka",

            "Ngomo",

            "Nzove",

            "Rukusha"

        ],



        "Mugano": [

            "Kabogo",

            "Mangoma",

            "Mika",

            "Mugano",

            "Mukoni",

            "Ndava",

            "Rubenga"

        ],



        "Nyagatovu": [

            "Bunyarikiga",

            "Buvumbi",

            "Kobero",

            "Murama",

            "Musama",

            "Gitaramuka",

            "Nyagatovu"

        ],



        "Ruzo": [

            "Bugoma",

            "Kabira",

            "Kagugo",

            "Kidasha",

            "Rusenyi",

            "Ruzo",

            "Vumasi"

        ],



        "Tura": [

            "Buhangara",

            "Gakoni",

            "Kinarira",

            "Kinyami",

            "Mibakwe",

            "Mihigo",

            "Murama",

            "Tura"

        ]

    },





    // =========================

    // COMMUNE CANKUZO

    // =========================

    "CANKUZO": {



        "Cankuzo": [

            "Cankuzo",

            "Gatunguru",

            "Kabeza",

            "Kabuga",

            "Kavumu",

            "Mugenda",

            "Mugongo",

            "Mugozi",

            "Muhweza",

            "Musenyi",

            "Muterero",

            "Muyaga",

            "Nyabisindu",

            "Nyakivunu",

            "Nyamusega"

        ],



        "Gitanga": [

            "Gitanga",

            "Kibungo",

            "Kigaga",

            "Mashiga",

            "Nyamtonogo",

            "Rujungu",

            "Saswe",

            "Shinge"

        ],



        "Kigamba": [

            "Gatunguru",

            "Gisenga",

            "Humure",

            "Kazibaziba",

            "Kigamba",

            "Kivumu",

            "Nyarurambi",

            "Rusagara",

            "Rwamvura"

        ],



        "Minyare": [

            "Karago",

            "Murehe",

            "Nyakerera",

            "Nyarutiti",

            "Rutoke"

        ]

    },





    // =========================

    // COMMUNE GISAGARA

    // =========================

    "GISAGARA": {



        "Bumba": [

            "Budega",

            "Bumba",

            "Bunyere",

            "Muka",

            "Nkoro",

            "Nyamwiyanke",

            "Rusigabanz(i)"

        ],



        "Camazi": [

            "Camazi",

            "Gisoko",

            "Mburi",

            "Muzire",

            "Rabiro",

            "Ruramba"

        ],



        "Cendajuru": [

            "Cendajuru",

            "Gahoko",

            "Kabageni",

            "Kibande",

            "Kigarika",

            "Kiruhura",

            "Kiyange"

        ],



        "Gisagara": [

            "Gerero",

            "Gisagara",

            "Gitanga",

            "Gitwenge",

            "Kagoma",

            "Kibogoye",

            "Kigati",

            "Kirambi",

            "Muganza",

            "Muhingamo",

            "Murago",

            "Nyuro",

            "Ramba",

            "Rubabara"

        ],



        "Mugera": [

            "Busumanyi",

            "Kaniha",

            "Mugera",

            "Musemo"

        ],



        "Mishiha": [

            "Buyongwe",

            "Gikonko",

            "Mishiha",

            "Munzenze",

            "Rutsindu"

        ],



        "Mwiruzi": [

            "Kibimba",

            "Mwiruzi",

            "Rugerero",

            "Rukwega",

            "Runihira"

        ],



        "Nyamugari": [

            "Busyana",

            "Gashigwe",

            "Gitaramuka",

            "Nyamugari",

            "Rukoyoyo"

        ],



        "Twinkwavu": [

            "Gisoro",

            "Misugi",

            "Nyagisovu",

            "Nyakuguma",

            "Twinkwavu"

        ]

    },





    // =========================

    // COMMUNE GISURU

    // =========================

    "GISURU": {



        "Gisuru": [

            "Bugama",

            "Bunyambo",

            "Gahinga",

            "Gisuru",

            "Itahe",

            "Kabingo",

            "Kinama",

            "Kireka",

            "Muhindo",

            "Murehe",

            "Ntende",

            "Nyabigabiro",

            "Rusange",

            "Ruyaga",

            "Rwerambere"

        ],



        "Kabanga": [

            "Kabanga",

            "Kigangabuko",

            "Munazi",

            "Musumba",

            "Nyamigina",

            "Nyamusasa",

            "Ruveri"

        ],



        "Kinyinya": [

            "Bugongo",

            "Gasunu",

            "Gataba",

            "Karindo",

            "Kibari",

            "Kinyinya"

        ]

    },





    // =========================

    // COMMUNE MUYINGA

    // =========================

    "MUYINGA": {



        "Bwasare": [

            "Butirabura",

            "Bwasare",

            "Gishuha",

            "Jani",

            "Kagugwe",

            "Kaguhu",

            "Karama",

            "Rukinzo"

        ],



        "Buhinyuza": [

            "Buhinyuza",

            "Karehe",

            "Kibimba",

            "Mabago",

            "Nyabucugu",

            "Nyaruhengeri",

            "Nyarunazi",

            "Rugazi"

        ],



        "Cumba": [

            "Burenza",

            "Butihinda",

            "Bwica",

            "Cumba",

            "Kiringanire",

            "Mizuga",

            "Nyamirambo",

            "Nyarusange",

            "Ruganigwa"

        ],



        "Gasave": [

            "Bugungu",

            "Bunywana",

            "Butihinda",

            "Gasave",

            "Gitaramuka",

            "Karongwe",

            "Kiyange",

            "Muramba",

            "Ntobwe"

        ],



        "Gasorwe": [

            "Bihogo",

            "Gikiwye",

            "Karambo",

            "Karira",

            "Kinama",

            "Kiryama",

            "Masasu",

            "Rusimbuko"

        ],



        "Higiro": [

            "Higiro",

            "Karimbi",

            "Kigoganya",

            "Ngobomo",

            "Nyarubambwe",

            "Nyungu"

        ],



        "Jarama": [

            "Burasira",

            "Gihongo",

            "Jarama",

            "Kara",

            "Nyagishiru",

            "Nyankurazo",

            "Rugongo",

            "Ruvumu"

        ],



        "Kiyanza": [

            "Bonero",

            "Bubaji",

            "Ciyando",

            "Gahekenya",

            "Gasenyi",

            "Gitaba",

            "Kibongera",

            "Kigajo",

            "Kiyanza",

            "Mukungu",

            "Musenga",

            "Rurtayo"

        ],



        "Kayenzi": [

            "Kayenzi",

            "Kibongera",

            "Mageni",

            "Musenga",

            "Nkoyoyo",

            "Rusengo"

        ],



        "Kiremba": [

            "Gasuru",

            "Kimanga",

            "Kiremba",

            "Kivubo",

            "Kizi",

            "Martyazo"

        ],



        "Munagano": [

            "Buhurana",

            "Gatovu",

            "Munagano",

            "Musenyi",

            "Ntamba",

            "Nyamarumba",

            "Sanzwe"

        ],



        "Murama": [

            "Gasasa",

            "Kavumu",

            "Mubuga",

            "Murama",

            "Mwurire",

            "Rusumo",

            "Ryabihira"

        ],



        "Mwakiro": [

            "Bugonza",

            "Butobwe",

            "Gakombe",

            "Gihoza",

            "Kabingo",

            "Karehe",

            "Kibande",

            "Kibwirwa",

            "Muyange",

            "Mwakiro"

        ],



        "Muyinga": [

            "Bugomora",

            "Burima",

            "Cibari",

            "Gahororo",

            "Gitongwe",

            "Karemera",

            "Kiryama",

            "Kivoga",

            "Rwimbogo",

            "Quartier Kibogoye",

            "Quartier Kinyota",

            "Quartier Kwibuye",

            "Quartier Mukoni",

            "Quartier Muyinga"

        ],



        "Rugabano": [

            "Bukwanzi",

            "Gahemba",

            "Gisuma",

            "Kadenge",

            "Kavungagoma",

            "Mukugunza",

            "Rugabano",

            "Rukanya",

            "Rusheri"

        ],



        "Rugari": [

            "Bunywana",

            "Gatongati",

            "Kinazi",

            "Mahonda",

            "Migogo",

            "Rugari",

            "Rutoke",

            "Ruyiyi"

        ]

    },





    // =========================

    // COMMUNE RUYIGI

    // =========================

    "RUYIGI": {



        "Busoro": [

            "Busoro",

            "Gasenyi",

            "Kigusu",

            "Rubavu"

        ],



        "Butezi": [

            "Kirasira",

            "Nkongwe",

            "Rugoti",

            "Sorero"

        ],



        "Bwagiriza": [

            "Bwagiriza",

            "Gashurushuru",

            "Munyinya",

            "Nombe",

            "Rubaragaza",

            "Rutegama",

            "Senga"

        ],



        "Kayongozi": [

            "Busuma",

            "Caga",

            "Kanisha",

            "Mibanga",

            "Nkanda"

        ],



        "Kirambi": [

            "Bigombo",

            "Gatwaro",

            "Kirambi",

            "Nyamugari",

            "Nyarunazi",

            "Ruvyagira"

        ],



        "Mubira": [

            "Gitwa",

            "Mubira",

            "Mugogo",

            "Muyange"

        ],



        "Bweru": [

            "Bweru",

            "Gashawe",

            "Masama",

            "Mubavu",

            "Ntunda",

            "Nzozi"

        ],



        "Rusengo": [

            "Bunogera",

            "Buruhukiro",

            "Gisoro",

            "Kirambi",

            "Migege",

            "Nganji",

            "Nyagutoha"

        ],



        "Ruyigi": [

            "Dutwe",

            "Gahemba",

            "Kigamba",

            "Ngarama",

            "Nyarunazi",

            "Ruhwago",

            "Rukaragata",

            "Ruyigi",

            "Quartier Gasanda",

            "Quartier Kinyabakecuru",

            "Quartier Sanzu"

        ]

    }

};

const GITEGA = {



    // =========================

    // COMMUNE BUGENDANA

    // =========================

    "BUGENDANA": {



        "Bitare": [

            "Bitare",

            "Carire",

            "Gaterama",

            "Gitongo",

            "Kibasi",

            "Kibungo",

            "Runyeri"

        ],



        "Bugendana": [

            "Cishwa",

            "Jenda",

            "Mugitega",

            "Mukoro",

            "Mwwire",

            "Nkanda",

            "Rwingiri"

        ],



        "Gitongo": [

            "Gitongo",

            "Masango",

            "Muririmbo",

            "Muyange",

            "Muzenga",

            "Mwumba",

            "Nkon(g)we"

        ],



        "Mugera": [

            "Gitora",

            "Mirama",

            "Nyamagana",

            "Rushanga"

        ],



        "Mutaho": [

            "Bigera",

            "Mushikanwa",

            "Mutaho",

            "Nyabisaka",

            "Nyangungu",

            "Quartier Bigera",

            "Quartier Kigwati"

        ],



        "Mutoyi": [

            "Mutoyi",

            "Kivuvu",

            "Nyagisenyi",

            "Nyakeru"

        ],



        "Rwisabi": [

            "Gerengabo",

            "Kidasha",

            "Kinyinya",

            "Kivoga",

            "Ngoma",

            "Nzove",

            "Rurengera"

        ]

    },





    // =========================

    // COMMUNE GISHUBI

    // =========================

    "GISHUBI": {



        "Bukirasazi": [

            "Bukirasazi",

            "Migoni",

            "Mpingwe",

            "Nyambuye",

            "Rugoma",

            "Rwinyana",

            "Shaya"

        ],



        "Bukoro": [

            "Bihomvora",

            "Bikingi",

            "Bukoro",

            "Jurwe",

            "Masare",

            "Muhororo"

        ],



        "Buraza": [

            "Bubaji",

            "Buraza",

            "Buriza",

            "Gicum(b)i",

            "Kabumbe",

            "Musebeyi",

            "Ndava"

        ],



        "Butezi": [

            "Butemba",

            "Butezi",

            "Muyange",

            "Ndago"

        ],



        "Gishubi": [

            "Bukwayu",

            "Gishubi",

            "Mugozi",

            "Muhuzu",

            "Munyinya",

            "Nyakigina",

            "Remera",

            "Ruhande"

        ],



        "Kavumu": [

            "Kibagara",

            "Kibaya",

            "Kinyonzo",

            "Mahonda",

            "Murama",

            "Nyakarambo",

            "Nyamugari"

        ],



        "Kibere": [

            "Bunyuka",

            "Kibere",

            "Nyamisure",

            "Rugabano",

            "Rukoki"

        ],



        "Kibuye": [

            "Buhanda",

            "Gasongati",

            "Kibuye",

            "Ruhinda",

            "Ruvumu",

            "Tema"

        ],



        "Mahonda": [

            "Bibate",

            "Bugega",

            "Gisura",

            "Gitaramuka",

            "Mahonda",

            "Maza",

            "Mugano",

            "Rweza"

        ],



        "Mugaruro": [

            "Bucana",

            "Gatare",

            "Gatoze",

            "Kejari",

            "Mikore",

            "Mugaruro",

            "Muhagaze",

            "Mujejuru",

            "Rukiga",

            "Rwitamba"

        ],



        "Murambi": [

            "Gahembe",

            "Gatwaro",

            "Gitaramuka",

            "Murambi"

        ],



        "Nyabiraba": [

            "Cimba",

            "Kayogoro",

            "Murangara",

            "Murehe",

            "Ntunda",

            "Nyamutobo",

            "Yanza"

        ],



        "Nyabitanga": [

            "Gikuka",

            "Kigomera",

            "Kigufi",

            "Musenga",

            "Ndago",

            "Nyakinazi",

            "Nyamirama",

            "Nyamugari",

            "Rurimbi"

        ],



        "Nyarusange": [

            "Biziya",

            "Gasenyi",

            "Kabimba",

            "Kigara",

            "Muzima",

            "Nyarubenga",

            "Tye"

        ],



        "Ryansoro": [

            "Mirango",

            "Murenge",

            "Ngaruzwa",

            "Ntunda",

            "Nyentambwe",

            "Rusaga"

        ]

    },





    // =========================

    // COMMUNE GITEGA

    // =========================

    "GITEGA": {



        "Buhevyi": [

            "Buhoro",

            "Kagoma",

            "Kanyonga",

            "Rukobe",

            "Rutegama"

        ],



        "Buhinda": [

            "Buhinda",

            "Gihamagara",

            "Kibogoye",

            "Kirambi",

            "Kiremba",

            "Kugitega",

            "Mugomera",

            "Penivere",

            "Ruhan(z)a"

        ],



        "Giheta": [

            "Bihororo",

            "Gisuru",

            "Kibogoye",

            "Kiremera",

            "Korane",

            "Muremera",

            "Ruhanza",

            "Rutegama"

        ],



        "Itaba": [

            "Butare",

            "Gisigara",

            "Itaba",

            "Kanyinya",

            "Karemba",

            "Kinyaruko",

            "Macu",

            "Mutanga",

            "Nkima"

        ],



        "Kabanga": [

            "Gih(e)he",

            "Gihugu",

            "Kaguhu",

            "Kibimba",

            "Murayi",

            "Musama",

            "Muyange",

            "Nyamugari",

            "Rweru"

        ],



        "Kiriba": [

            "Gasanu",

            "Gisara",

            "Gishuha",

            "Kamonyi",

            "Kibande",

            "Kiriba",

            "Masasu",

            "Rubarasi",

            "Rwingiri"

        ],



        "Makebuko": [

            "Bugambisha",

            "Gasasa",

            "Kagege",

            "Makebuko",

            "Mavuvu",

            "Ngundu",

            "Ntita",

            "Rwanda",

            "Rwesero"

        ],



        "Maramvya": [

            "Buga",

            "Janja",

            "Karoba",

            "Kiyange",

            "Murago",

            "Musave",

            "Muyange",

            "Rusagara",

            "Rwezamenyo",

            "Simba"

        ],



        "Mariza": [

            "Bukinga",

            "Kanyinya",

            "Mitim(i)re",

            "Mubuga",

            "Nyarunazi"

        ],



        "Mubuga": [

            "Bukwazo",

            "Karenda",

            "Kimanama",

            "Mirama",

            "Mubuga",

            "Mukanda",

            "Muri(r)we",

            "Ngobeke"

        ],



        "Mungwa": [

            "Bihanga",

            "Kibiri",

            "Rutoke",

            "Rweza",

            "Quartier Butamuheba",

            "Quartier Jimbi",

            "Quartier Karera",

            "Quartier Mugoboka",

            "Quartier Mungwa",

            "Quartier Ntobwe"

        ],



        "Murenda": [

            "Butobwe",

            "Gasagara",

            "Gasenyi",

            "Muhororo",

            "Murenda",

            "Mwanzari",

            "Mwumba",

            "Nyamangandika",

            "Rutaniganika"

        ],



        "Nyamugari": [

            "Quartier Bwoga",

            "Quartier Magarama",

            "Quartier Musave",

            "Quartier Mushasha",

            "Quartier Musin(za)",

            "Quartier Nyabisindu",

            "Quartier Nyabututsi",

            "Quartier Nyamugari",

            "Quartier Rango",

            "Quartier Shatanya",

            "Quartier Yoba"

        ],



        "Rutegama": [

            "Higiro",

            "Gitamo",

            "Nyakibingo",

            "Quartier Birohe",

            "Quartier Ceru",

            "Quartier Mahonda",

            "Quartier Mugutu",

            "Quartier Rubarasi",

            "Quartier Rukoba",

            "Quartier Rutegama",

            "Quartier Songa",

            "Quartier Zege",

            "Rubamvyi"

        ]

    },





    // =========================

    // COMMUNE KARUSI

    // =========================

    "KARUSI": {



        "Bugenyuzi": [

            "Bugenyuzi",

            "Canzikiro",

            "Cuba",

            "Gashanga",

            "Kanazi",

            "Kigufi",

            "Kiranda",

            "Muramba",

            "Muyange",

            "Nyagoba"

        ],



        "Buhiga": [

            "Buhiga",

            "Gitanga",

            "Karunyinya",

            "Magamba",

            "Mwoya",

            "N(z)ibariha",

            "Ramvya",

            "Ruvumu",

            "Rwingoma"

        ],



        "Buhindye": [

            "Buhindye",

            "Gishikanwa",

            "Kidahwe",

            "Nyamwrambo",

            "Rwandagaro",

            "Teme"

        ],



        "Buhinyuza": [

            "Buhinyuza",

            "Bushiramhebo",

            "Gisenyi",

            "Kanyange",

            "Nkoronko",

            "Rutegama"

        ],



        "Cirambo": [

            "Cirambo",

            "Kinyota",

            "Kiyange",

            "Maramvya",

            "Rusagara",

            "Rwizingwe"

        ],



        "Gisimbawaga": [

            "Butaha",

            "Gasera",

            "Gisimbawaga",

            "Kibuye",

            "Mutara"

        ],



        "Gitaramuka": [

            "Gasasa",

            "Gitaramuka",

            "Kagwa",

            "Kibenga",

            "Nyurutovu",

            "Rubuga"

        ],



        "Kibumbwe": [

            "Gasekanya",

            "Kibumbwe",

            "Mugende",

            "Muvumu",

            "Nyakabugu"

        ],



        "Mayenzi": [

            "Burenza",

            "Cigati",

            "Gasenyi",

            "Karamba",

            "Mayenzi",

            "Rudazara",

            "Rutonganikwa",

            "Ruyaga",

            "Shanga"

        ],



        "Mubaragaza": [

            "Kigoma",

            "Mubaragaza",

            "Musenga",

            "Sagara",

            "Yagizo"

        ],



        "Muhweza": [

            "Banda",

            "Kajeri",

            "Karuri",

            "Muhweza",

            "Nyamabega",

            "Rukamba"

        ],



        "Mutumba": [

            "Bibara",

            "Kanyinya",

            "Rabiro",

            "Rwangara"

        ],



        "Ntunda": [

            "Bikinga",

            "Bugwana",

            "Kigozi",

            "Ngayane",

            "Ntunda"

        ],



        "Nyamugari": [

            "Quartier Kigoma",

            "Quartier Kigwati",

            "Quartier Nyamugari",

            "Quartier Rubimba"

        ],



        "Nyaruhinda": [

            "Gahahe",

            "Gahashi",

            "Gitandu",

            "Nyaruhinda",

            "Ruhata"

        ],



        "Rugazi": [

            "Bonero",

            "Burenza",

            "Mubaya",

            "Munyinya",

            "Rugazi",

            "Rusengo",

            "Tambo"

        ]

    },





    // =========================

    // COMMUNE KIGANDA

    // =========================

    "KIGANDA": {



        "Buhangura": [

            "Buhangura",

            "Burenza",

            "Janga",

            "Masama",

            "Mubuga",

            "Rugari"

        ],



        "Gasura": [

            "Gasenyi",

            "Kabuye",

            "Kigabiro",

            "Murehe",

            "Net(e)",

            "Taba"

        ],



        "Gatabo": [

            "Kivyei",

            "Martyazo",

            "Murambi",

            "Nyagisozi",

            "Quartier Gatabo"

        ],



        "Kanyami": [

            "Gahweza",

            "Kanyami",

            "Musongati",

            "Nduga"

        ],



        "Kiganda": [

            "Burenza",

            "Kaneru",

            "Kiganda",

            "Nkomwe"

        ],



        "Mushikamo": [

            "Bupfunda",

            "Munyinya",

            "Murinzi",

            "Musave",

            "Mushikamo",

            "Nkonyovu",

            "Nyakararo",

            "Nyamitwenzi"

        ],



        "Renga": [

            "Kayange",

            "Renga",

            "Rumbumba",

            "Ruvumu"

        ],



        "Rutegama": [

            "Bubanda",

            "Camumandu",

            "Cumba",

            "Gashinga",

            "Kinyoni",

            "Marumane",

            "Munanira",

            "Nyarukere",

            "Nyarunazi",

            "Rutegama",

            "Quartier Buryohe",

            "Quartier Gasange"

        ]

    },





    // =========================

    // COMMUNE MURAMVYA

    // =========================

    "MURAMVYA": {



        "Bugarama": [

            "Busimba",

            "Kibogoye",

            "Mp(e)he",

            "Quartier Bugarama"

        ],



        "Bukeye": [

            "Gahaga",

            "Gikonge",

            "Kivogero",

            "Rweto",

            "Shumba"

        ],



        "Kibumbu": [

            "Birwana",

            "Buyaga",

            "Kirika",

            "Rabiro",

            "Quartier Kibumbu"

        ],



        "Mbuye": [

            "Kigina",

            "Kirimbera",

            "Kiziba",

            "Mbuye",

            "Migezi",

            "Mugerera",

            "Murama",

            "Mwegera",

            "Nyakijiwra",

            "Rwuya",

            "Teka",

            "Temere"

        ],



        "Muramvya": [

            "Biganda",

            "Burambana",

            "Masango",

            "Murambi",

            "Muramvya",

            "Musagara",

            "Quartier Mubarazi",

            "Quartier Muramvya"

        ],



        "Nyarucamo": [

            "Buhorwa",

            "Gaharo",

            "Kiziguro",

            "Musumba",

            "Nyarucamo"

        ],



        "Shombo": [

            "Gatwaro",

            "Mirinzi",

            "Mubira",

            "Remera",

            "Ruhinga",

            "Shombo"

        ]

    },





    // =========================

    // COMMUNE MWARO

    // =========================

    "MWARO": {



        "Bisoro": [

            "Buburu",

            "Gitaramuka",

            "Kiganda",

            "Mabaya",

            "Musumba"

        ],



        "Gatwe": [

            "Bwakira",

            "Kanyami",

            "Mago",

            "Maramvya",

            "Nyagitongati",

            "Nyamugari",

            "Rwuya"

        ],



        "Gisozi": [

            "Buburu",

            "Gisozi",

            "Kibimba",

            "Musivya",

            "Ndava",

            "Nyamiyaga",

            "Rweza",

            "Quartier Nyarukinya",

            "Quartier Ruyange"

        ],



        "Kanka": [

            "Buhabwa",

            "Kanka",

            "Kariba",

            "Masango",

            "Nyabisiga",

            "Rubamvye"

        ],



        "Kayokwe": [

            "Benja",

            "Kibogoye",

            "Musama",

            "Ruramba",

            "Rusivya",

            "Ruvumu",

            "Saswe"

        ],



        "Makamba": [

            "Gasenyi",

            "Kirambi",

            "Makamba",

            "Nyamiyaga",

            "Nyamurenge",

            "Rwintare"

        ],



        "Muyebe": [

            "Bisoro",

            "Gitunga",

            "Migende",

            "Murehe",

            "Muyebe",

            "Nyakibari",

            "Rwankangoma"

        ],



        "Mwaro": [

            "Bisha",

            "Gatare",

            "Gihinga",

            "Kizi",

            "Ngara",

            "Nkundusi",

            "Rurtyazo",

            "Quartier Gasumo",

            "Quartier Kagoma",

            "Quartier Ruvumera"

        ],



        "Nyakararo": [

            "Butegana",

            "Kiyange",

            "Mugero",

            "Musimbwe",

            "Nyagahware",

            "Nyakirwa"

        ],



        "Rorero": [

            "Kirika",

            "Kivoga",

            "Mashunzi",

            "Munanira"

        ]

    },





    // =========================

    // COMMUNE NYABIHANGA

    // =========================

    "NYABIHANGA": {



        "Fota": [

            "Fota",

            "Gahondo",

            "Gatsinga",

            "Kig(ar)ama",

            "Ngore"

        ],



        "Kibungere": [

            "Buhogo",

            "Kavumu",

            "Kibungere",

            "Martyazo",

            "Musongati",

            "Muyebe"

        ],



        "Matongo": [

            "Kamushiha",

            "Matongo",

            "Ngoro",

            "Nyabisaka",

            "Nyamurenge"

        ],



        "Mbogora": [

            "Buteg(e)ye",

            "Gihoma",

            "Kivomwa",

            "Mbogora",

            "Migera",

            "Muhaganya",

            "Muyange",

            "Nyarubayi"

        ],



        "Munago": [

            "Gitaramuka",

            "Kibogoye",

            "Kibungo",

            "Magamba",

            "Munago",

            "Nyamitore"

        ],



        "Murago": [

            "Bugera",

            "Higiro",

            "Kabogi",

            "Murago",

            "Rango"

        ],



        "Musama": [

            "Gisirtye",

            "Iteka",

            "Kirambi",

            "Musama",

            "Nyamb(i)anga"

        ],



        "Ndava": [

            "Butazi",

            "Gitaba",

            "Mpanuka",

            "Muyogoro",

            "Ndava"

        ],



        "Nyabihanga": [

            "Gatwe",

            "Kivuzo",

            "Miterama",

            "Mubuga",

            "Murama",

            "Taba"

        ],



        "Nyarucamo": [

            "Bugorora",

            "Bunyan(g)e",

            "Kiga",

            "Nkurunzi",

            "Nyakomag(o)"

        ],



        "Rusaka": [

            "Gikebuka",

            "Kibimba",

            "Kiy(e)ge",

            "Martyazo",

            "Mpumbu",

            "Mureba",

            "Nyagashanga",

            "Nyamugari",

            "Rusaka",

            "Shana",

            "Quartier Gasekebuye",

            "Quartier Gihim"

        ],



        "Yanza": [

            "Kinyovu",

            "Mahonda",

            "Murambi",

            "Namande",

            "Rucunda"

        ]

    },





    // =========================

    // COMMUNE SHOMBO

    // =========================

    "SHOMBO": {



        "Gatonde": [

            "Gatonde",

            "Gitibu",

            "Mazita",

            "Nyenzi",

            "Ruvumu",

            "Taba"

        ],



        "Gihohazi": [

            "Bikinga",

            "Gihohazi",

            "Kib(e)zi",

            "Mugero",

            "Murago",

            "Ramba"

        ],



        "Gikombe": [

            "Butwe",

            "Gaharo",

            "Gikombe"

        ],



        "Masabo": [

            "Kabwira",

            "Mugoboka",

            "Ruharo",

            "Rusasa",

            "Ruyogoro",

            "Rwimbogo"

        ],



        "Masama": [

            "Butamenwa",

            "Masama",

            "Rugwiza",

            "Ruhuma",

            "Rwinka"

        ],



        "Mugogo": [

            "Kizongoma",

            "Mugogo",

            "Ruvumu",

            "Ruyaga",

            "Taba"

        ],



        "Munanira": [

            "Gahororo",

            "Kivoga",

            "Munanira",

            "Mushikanwa",

            "Rugarina",

            "Rutegama"

        ],



        "Nyabibuye": [

            "Bukirasazi",

            "Gatabo",

            "Gitaramuka",

            "Kiryama",

            "Nyabibuye"

        ],



        "Nyabikere": [

            "Maramvya",

            "Mbabazi",

            "Mubanga",

            "Ngugo",

            "Nyarunazi",

            "Ruyogoro",

            "Rwandagaro",

            "Quartier Gatamba"

        ],



        "Nyarurambi": [

            "Kigora",

            "Kiyange",

            "Muhigo",

            "Muhororo"

        ],



        "Rusamaza": [

            "Bihembe",

            "Gasenyi",

            "Gasi(v)ya",

            "Muzenga",

            "Nyamiyaga",

            "Rusamaza"

        ],



        "Rusi": [

            "Kivoga",

            "Mujengwa",

            "Rusi",

            "Shombo"

        ]

    }

};





const BURUNGA = {



    // =========================

    // COMMUNE BURURI

    // =========================

    "BURURI": {



        "Bamba": [

            "Jungwe",

            "Kagwa",

            "Nyamiyaga",

            "Nyarwaga",

            "Ruvumu"

        ],



        "Binyuro": [

            "Bugeni",

            "Bwatemba",

            "Gihinga",

            "Gitwaro",

            "Mubuga",

            "Ntunda"

        ],



        "Bururi": [

            "Gisanze",

            "Mahonda",

            "Mudahandwa",

            "Mugozi",

            "Murago",

            "Tongwe",

            "Quartier Bururi",

            "Quartier Kigwati",

            "Quartier Rumonyi"

        ],



        "Condi": [

            "Gikwazo",

            "Kagimbu",

            "Kivubo",

            "Nyabucokwe",

            "Rutoke",

            "Sanzu"

        ],



        "Burunga": [

            "Burunga",

            "Kiganda",

            "Mubuga",

            "Rukanda"

        ],



        "Gitsiro": [

            "Kabwayi",

            "Kigutu",

            "Kirungu",

            "Mirango",

            "Mushishi"

        ],



        "Kajondi": [

            "Gihanga",

            "Gikizi",

            "Kajondi",

            "Musenyi",

            "Ruringanizo"

        ],



        "Muhweza": [

            "Gikana",

            "Gitobo",

            "Muhweza",

            "Musongati",

            "Mwarusi"

        ],



        "Munini": [

            "Buhinga",

            "Burenza",

            "Gahago",

            "Gasenyi",

            "Gatanga",

            "Munini",

            "Muyange",

            "Nyarugera"

        ],



        "Muzenga": [

            "Burarana",

            "Muzima",

            "Nyavyamo",

            "Rushemeza",

            "Rwankona",

            "Quartier Kiremba"

        ],



        "Rutovu": [

            "Kijima",

            "Kinyonzo",

            "Munyinya",

            "Mutangaro",

            "Muzenga",

            "Ruhando"

        ],



        "Vyanda": [

            "Kagoma",

            "Karehe",

            "Karirimvya",

            "Migera",

            "Nyakabenga",

            "Rweza"

        ]

    },





    // =========================

    // COMMUNE MAKAMBA

    // =========================

    "MAKAMBA": {



        "Bukeye": [

            "Bukeye",

            "Busoro",

            "Gikama",

            "Murambi",

            "Nyakazi",

            "Nyarubanga"

        ],



        "Bigina": [

            "Bigina",

            "Gasenga",

            "Kibara",

            "Mayange",

            "Mudaturwa",

            "Mukingo",

            "Musasa",

            "Sampeke"

        ],



        "Nyantakara": [

            "Gitaba",

            "Mugeregere",

            "Muguruka",

            "Nyantakara"

        ],



        "Canda": [

            "Canda",

            "Kirare",

            "Nyankara"

        ],



        "Dunga": [

            "Dunga",

            "Kigaza",

            "Rusovu",

            "Shaka"

        ],



        "Gatabo": [

            "Buga",

            "Gatabo",

            "Nkaramanyenye",

            "Rutenderi"

        ],



        "Gitaba": [

            "Cunamwe",

            "Gitaba",

            "Karonge",

            "Mahembe",

            "Mpinga",

            "Mugutu",

            "Murambi",

            "Murango"

        ],



        "Kayogoro": [

            "Borera",

            "Butare",

            "Kabizi",

            "Kibimba",

            "Muyaga",

            "Quartier Buhirwe",

            "Quartier Gitaramuka",

            "Quartier Mushasha",

            "Quartier Swahili"

        ],



        "Kibago": [

            "Jimbi",

            "Kibago",

            "Kivoga",

            "Mbizi",

            "Rubimba",

            "Ruyange"

        ],



        "Kiyange": [

            "Kabanga",

            "Kiyange",

            "Masaswe",

            "Migongo",

            "Nyabigina",

            "Nyarutuntu",

            "Rusunwe"

        ],



        "Makamba": [

            "Kayoba",

            "Muresi",

            "Quartier Gitwa",

            "Quartier Kigarama",

            "Quartier Kigwati",

            "Quartier Kirama",

            "Quartier Mukenke",

            "Quartier Muyogo",

            "Quartier Nyaburumba",

            "Quartier Nyankoni",

            "Quartier Rugarama",

            "Quartier Rukanko",

            "Quartier Swahili"

        ],



        "Mugeni": [

            "Buhema",

            "Bujondi",

            "Kigomagoma",

            "Kiyange",

            "Mugeni"

        ],



        "Nyange": [

            "Mihongo",

            "Ndago",

            "Ruremba"

        ]

    },





    // =========================

    // COMMUNE MATANA

    // =========================

    "MATANA": {



        "Gasibe": [

            "Bitezi",

            "Gitanga",

            "Kinyinya",

            "Ntega",

            "Sakinyonga"

        ],



        "Gisarenda": [

            "Butwe",

            "Gisarenda",

            "Mahango",

            "Ruzira"

        ],



        "Kibezi": [

            "Donge",

            "Kibezi",

            "Mpota",

            "Musho"

        ],



        "Kivumu": [

            "Gakaranka",

            "Kivumu"

        ],



        "Munini": [

            "Gahanda",

            "Kinwa",

            "Kiryama",

            "Mutsinda",

            "Rutundwe",

            "Rwego"

        ],



        "Mahwa": [

            "Kampezi",

            "Mahwa",

            "Ndava",

            "Nyabikenke"

        ],



        "Matana": [

            "Bihanga",

            "Gisisye",

            "Matana",

            "Mugano"

        ],



        "Muheka": [

            "Muheka",

            "Musenyi",

            "Taba"

        ],



        "Mugamba": [

            "Burasira",

            "Coma",

            "Ntentamaza",

            "Nyatubuye",

            "Rukere",

            "Taba"

        ],



        "Mwumba": [

            "Gitara",

            "Gitaramuka",

            "Gozi",

            "Mwumba"

        ],



        "Ndago": [

            "Jenda",

            "Ndago"

        ],



        "Nyagasasa": [

            "Mubira",

            "Ndengo",

            "Nyakigano",

            "Nyamugari",

            "Ruhinga",

            "Ruko"

        ],



        "Ruvumvu": [

            "Rusama",

            "Tara",

            "Yengero"

        ],



        "Songa": [

            "Kigabiro",

            "Muzamba",

            "Songa"

        ],



        "Vyuya": [

            "Gataka",

            "Kirinzi",

            "Mugomera",

            "Nyakimonyi",

            "Vyuya"

        ]

    },





    // =========================

    // COMMUNE MUSONGATI

    // =========================

    "MUSONGATI": {



        "Butezi": [

            "Buhogo",

            "Butezi",

            "Kabingo",

            "Kibimba",

            "Mutwana",

            "Mwebeya",

            "Nkanka",

            "Rubanga",

            "Shasha"

        ],



        "Gakungu": [

            "Gakungu",

            "Mugombwa",

            "Murara",

            "Murembera",

            "Mwango",

            "Ngomante",

            "Nyabakara",

            "Nyamateke"

        ],



        "Gatakazi": [

            "Gatakazi",

            "Kagunga",

            "Maganahe",

            "Rusunu",

            "Yove"

        ],



        "Giharo": [

            "Bayaga",

            "Bukeno",

            "Giharo",

            "Gitanga",

            "Kanyererwe",

            "Mura",

            "Musenyi",

            "Nkurye"

        ],



        "Kayero": [

            "Gihera",

            "Gitaba",

            "Juragati",

            "Kayove",

            "Munyika",

            "Musotera",

            "Ngarama",

            "Nyamiyaga",

            "Rorero"

        ],



        "Kiguhu": [

            "Buranga",

            "Gasasa",

            "Kiguhu",

            "Mbuye",

            "Mihama",

            "Nyakabanda",

            "Nyakazu"

        ],



        "Mpinga": [

            "Butambara",

            "Butamya",

            "Gihinga",

            "Kagoma",

            "Kibanda",

            "Kigamba",

            "Maganahe",

            "Mpinga",

            "Muganza"

        ],



        "Mugondo": [

            "Bayumbu",

            "Gasenga",

            "Gasozi",

            "Mugondo",

            "Negara",

            "Ntonzi",

            "Rasa",

            "Rutoke"

        ],



        "Musongati": [

            "Buhinga",

            "Giheta",

            "Kamaramagambo",

            "Nyabigozi",

            "Nyabisindu",

            "Runyoni"

        ],



        "Muzye": [

            "Buyaga",

            "Gatonga",

            "Murehe",

            "Muzye",

            "Nyembuye",

            "Shembe"

        ],



        "Ngoma": [

            "Cero",

            "Makakwe",

            "Mungwa",

            "Munywero",

            "Musagara",

            "Ngoma",

            "Nyabibuye"

        ],



        "Shanga": [

            "Gisasa",

            "Karera",

            "Mabawe",

            "Mbuza",

            "Nyangazi",

            "Nyanza",

            "Rugunga",

            "Shanga"

        ]

    },





    // =========================

    // COMMUNE NYANZA

    // =========================

    "NYANZA": {



        "Gishiha": [

            "Jongwe",

            "Kiyazi",

            "Mutobo",

            "Nyarubano",

            "Rurambira",

            "Rutegama"

        ],



        "Gitara": [

            "Bikobe",

            "Budaketwa",

            "Musenyi",

            "Nyamugari",

            "Ruvuga"

        ],



        "Kabonga": [

            "Gasaba",

            "Gisenga",

            "Kabonga",

            "Mukerezi",

            "Nyabigina"

        ],



        "Kayogoro": [

            "Bukunda",

            "Burima",

            "Karinzi",

            "Kigamba",

            "Mivo",

            "Mubondo",

            "Nyabitabo"

        ],



        "Kayove": [

            "Gahandu",

            "Gikuzi",

            "Martyazo",

            "Mazuru",

            "Murinda",

            "Ndoba"

        ],



        "Kazirabageni": [

            "Biniganyi",

            "Buheka",

            "Kazirabageni",

            "Kiderege"

        ],



        "Mabanda": [

            "Gikombe",

            "Gikurazo",

            "Kibimba",

            "Mabanda",

            "Mara",

            "Mutwazi",

            "Nkondo",

            "Quartier Mudaturwa",

            "Quartier Mushasha",

            "Quartier Nyabusunzu",

            "Quartier Sagara",

            "Quartier Samvura"

        ],



        "Mpinga": [

            "Gitaba",

            "Kagege",

            "Kigamba",

            "Mudende",

            "Rubanda"

        ],



        "Mukubano": [

            "Kabo",

            "Mugumure",

            "Mukubano",

            "Ruvumera"

        ],



        "Mukungu": [

            "Mukimba",

            "Mukungu",

            "Rimbo",

            "Rubindi"

        ],



        "Muyange": [

            "Muyange",

            "Mwimbiro",

            "Nyabutare",

            "Rangi",

            "Ruvyagira"

        ],



        "Nyanza": [

            "Bukeye",

            "Kabondo",

            "Mugerama",

            "Mvugo",

            "Quartier Bogorwa",

            "Quartier Bukeye",

            "Quartier Gitunda",

            "Quartier Isanganiro",

            "Quartier Kigembezi",

            "Quartier Ngoro",

            "Quartier Nyamirongo",

            "Quartier Swahili"

        ],



        "Vugizo": [

            "Higiro",

            "Karonge",

            "Kigombe",

            "Mbizi",

            "Mugu",

            "Nyamirinzi",

            "Rabiro"

        ]

    },





    // =========================

    // COMMUNE RUMONGE

    // =========================

    "RUMONGE": {



        "Buruhukiro": [

            "Gitwe",

            "Karagara",

            "Muhanda",

            "Murambi",

            "Nyagasaka"

        ],



        "Burambi": [

            "Bisaka",

            "Busaga",

            "Gahinda",

            "Gitaramuka",

            "Rwaniro"

        ],



        "Buyengero": [

            "Kanyinya",

            "Mabanza",

            "Mujigo",

            "Nkizi",

            "Runyinya"

        ],



        "Gatete": [

            "Busebwa",

            "Gatete",

            "Mugara",

            "Mutambara"

        ],



        "Kigwena": [

            "Cabara",

            "Gashasha",

            "Kanenge",

            "Mayengo",

            "Nyakuguma"

        ],



        "Kizuka": [

            "Gatwe",

            "Kagongo",

            "Kizuka",

            "Mibanda",

            "Mwange"

        ],



        "Maramvya": [

            "Busura",

            "Gisenyi",

            "Gishiha",

            "Magana",

            "Maramvya",

            "Muzi"

        ],



        "Mariza": [

            "Buhinyuza",

            "Buyenzi",

            "Rumonyi",

            "Rutwenzi"

        ],



        "Minago": [

            "Karonke",

            "Minago",

            "Muhuzu",

            "Muturirwa",

            "Rutumo"

        ],



        "Mudende": [

            "Gasenyi",

            "Kinama",

            "Kirama",

            "Mudende",

            "Sebeyi"

        ],



        "Muzenga": [

            "Banda",

            "Gitsinda",

            "Karambi",

            "Nyacambuko",

            "Nyamurunga",

            "Rubirizi"

        ],



        "Rumonge": [

            "Quartier Birimba",

            "Quartier Gihwanya",

            "Quartier Iteba",

            "Quartier Kanyenkoko",

            "Quartier Mugomere",

            "Quartier Nkayamba",

            "Quartier Rukinga",

            "Quartier Swahili"

        ],



        "Rusabagi": [

            "Gakonko",

            "Gatobo",

            "Gitaba",

            "Gitongwe",

            "Murara",

            "Murenge"

        ]

    },





    // =========================

    // COMMUNE RUTANA

    // =========================

    "RUTANA": {



        "Bukemba": [

            "Bukemba",

            "Gihoffi",

            "Kabanga",

            "Murama"

        ],



        "Butare": [

            "Bugiga",

            "Butare",

            "Muyombwe",

            "Rubanga",

            "Ruranga"

        ],



        "Gitaba": [

            "Bugunga",

            "Buta",

            "Gasakuza",

            "Gaterama",

            "Gatongati",

            "Gitaba",

            "Kinganda",

            "Maramvya",

            "Mika",

            "Mungwa",

            "Nyamure",

            "Nyanzuki",

            "Ruregeya"

        ],



        "Gitanga": [

            "Bigina",

            "Cikinga",

            "Gatwaro",

            "Gitanga",

            "Kazeba",

            "Kiremba",

            "Museno",

            "Ntuku",

            "Nyabikenke"

        ],



        "Kinzan(za)": [

            "Cunda",

            "Kabago",

            "Kabanga",

            "Kinzan(za)",

            "Kivoma",

            "Maramvya",

            "Nyamabuye",

            "Rukobe"

        ],



        "Kivoga": [

            "Gitaramuka",

            "Kivoga",

            "Matutu",

            "Musenyi",

            "Nyarumimba",

            "Ramvya"

        ],



        "Nyakuguma": [

            "Gisenyi",

            "Musongati",

            "Mutsind(o)zi",

            "Muyange",

            "Ngoma",

            "Nyagisambwe",

            "Nyakuguma",

            "Samahuge"

        ],



        "Rongero": [

            "Butambara",

            "Butovyi",

            "Karinzi",

            "Kibinzi",

            "Mwayi",

            "Ntuku",

            "Rongero",

            "Rushemeza",

            "Rusunu"

        ],



        "Rutana": [

            "Gakobe",

            "Gaseri",

            "Gifurzo",

            "Jomati",

            "Karibu",

            "Kayove",

            "Nyarubere",

            "Rushungura",

            "Shoti",

            "Quartier Gahuna",

            "Quartier Karindo",

            "Quartier Kigwati",

            "Quartier Majambere",

            "Quartier Mikurira",

            "Quartier Mugembe",

            "Quartier Rongero"

        ]

    }

};



const BUTANYERERA = {



    // =========================

    // COMMUNE BUSONI

    // =========================

    "BUSONI": {



        "Baziro": [

            "Baziro",

            "Bucana",

            "Gihinga",

            "Kivumu",

            "Marembo",

            "Mirwa"

        ],



        "Bugorora": [

            "Bugorora",

            "Buhevyi",

            "Kaduduri",

            "Kibonobono",

            "Mutarishwa"

        ],



        "Buhoro": [

            "Buhoro",

            "Bunywera",

            "Karambo",

            "Minyago",

            "Rusara"

        ],



        "Busoni": [

            "Burara",

            "Gatare",

            "Gatete",

            "Kigoma",

            "Kivo",

            "Munazi",

            "Nyakizu"

        ],



        "Bwambarangwe": [

            "Budahunga",

            "Butegana",

            "Kabirizi",

            "Kabuyenge",

            "Mukenke"

        ],



        "Cumba": [

            "Burwana",

            "Cumba",

            "Nkomero",

            "Tonga"

        ],



        "Gisenyi": [

            "Gisenyi",

            "Higiro",

            "Kibonde",

            "Marembo",

            "Muhuzu",

            "Murambi",

            "Nyabisindu",

            "Rugarama",

            "Rwibikara"

        ],



        "Gitobe": [

            "Butahana",

            "Butihinda",

            "Gahosha",

            "Gasuga",

            "Rungazi"

        ],



        "Kabanga": [

            "Buhimba",

            "Buringa",

            "Kabanga",

            "Karambo",

            "Kididiri",

            "Rurende"

        ],



        "Kimeza": [

            "Gasave",

            "Kibazi",

            "Kimeza",

            "Mugongo",

            "Ruyenzi"

        ],



        "Mukerwa": [

            "Kagege",

            "Kiravumba",

            "Mugobe",

            "Mukerwa",

            "Munyinya",

            "Renga",

            "Runyinya"

        ],



        "Murore": [

            "Gatemere",

            "Murore",

            "Nyabugeni",

            "Rutabo",

            "Ruyaga",

            "Rurira"

        ],



        "Nyagisozi": [

            "Gitete",

            "Kumana",

            "Muvyuko",

            "Muyange",

            "Nyagisozi",

            "Nyange",

            "Ruheha",

            "Sigu"

        ],



        "Nyenzi": [

            "Mubuga",

            "Ngoma",

            "Nyenzi",

            "Ruhongore"

        ],



        "Shore": [

            "Bigombo",

            "Coga",

            "Santunda",

            "Shore"

        ]

    },





    // =========================

    // COMMUNE KAYANZA

    // =========================

    "KAYANZA": {



        "Jene": [

            "Jene",

            "Kibuba",

            "Kigeri",

            "Mugovi",

            "Mutana",

            "Ngoma",

            "Ruhinga",

            "Rusambi",

            "Ryamukona",

            "Songero",

            "Yandaro"

        ],



        "Kabarore": [

            "Caguka",

            "Gikingo",

            "Kidunduri",

            "Kirehe",

            "Kivuvu",

            "Mugera",

            "Mugongo",

            "Munege",

            "Nyamisagara"

        ],



        "Kabuye": [

            "Benga",

            "Kinyamukizi",

            "Kinzobe",

            "Maruri",

            "Migege",

            "Mpanga",

            "Ntarambo",

            "Nyabikaranka",

            "Nyangwe",

            "Ryirengereye",

            "Shikanoni"

        ],



        "Kayanza": [

            "Bubezi",

            "Cukiro",

            "Gahahe",

            "Karinizi",

            "Kinga",

            "Mihigo",

            "Murago",

            "Mwendo",

            "Nyabihanga",

            "Quartier Kirema",

            "Quartier Musave"

        ],



        "Mparamirundi": [

            "Bigera",

            "Cendajuru",

            "Gahini",

            "Gitemezi",

            "Kinyami",

            "Magana",

            "Makombe",

            "Mihama",

            "Mparamirundi",

            "Munyange",

            "Mutsinda",

            "Nyamisebo",

            "Tubiri"

        ],



        "Murima": [

            "Canzara",

            "Gacu",

            "Gihororo",

            "Kavumu",

            "Kibingo",

            "Magamba",

            "Murima",

            "Nkuba",

            "Ruvomo",

            "Rwimare"

        ],



        "Muruta": [

            "Busambo",

            "Buziraguhindwa",

            "Karunyinya",

            "Kavoga",

            "Manini",

            "Muruta",

            "Myugar(i)ro",

            "Nyamiyogoro",

            "Remera",

            "Yanza"

        ],



        "Nkonge": [

            "Campazi",

            "Gishubi",

            "Mikuba",

            "Mutana",

            "Nkonge",

            "Nyakibari",

            "Ruvumu"

        ],



        "Nyabihogo": [

            "Gitwa",

            "Muhweza",

            "Nemba",

            "Nyabihogo",

            "Ruhande"

        ],



        "Rugazi": [

            "Buvumo",

            "Buyumpu",

            "Dusasa",

            "Gashiru",

            "Gisagara",

            "Kibati",

            "Tondero",

            "Yanza"

        ],



        "Rukere": [

            "Caratsi",

            "Karama",

            "Manga",

            "Randa",

            "Rorero"

        ],



        "Rwegura": [

            "Kaserege",

            "Kibakwe",

            "Kibaya",

            "Mpfunda",

            "Muganza",

            "Rwangongwe",

            "Rwegura"

        ]

    },





    // =========================

    // COMMUNE KIREMBA

    // =========================

    "KIREMBA": {



        "Birambi": [

            "Buhigiranka",

            "Gashingwe",

            "Gatwe",

            "Kigina",

            "Kinyovu",

            "Masama",

            "Martyazo",

            "Muremera",

            "Mushonge",

            "Rurama",

            "Shinge",

            "Shoza"

        ],



        "Bugina": [

            "Bitagazwa",

            "Bunogera",

            "Kibuye",

            "Kidasha",

            "Kivoga",

            "Migongo",

            "Nkomero",

            "Nyabikenke",

            "Nyamarobe",

            "Ragwe"

        ],



        "Cindonyi": [

            "Bisiga",

            "Kagoti",

            "Kidasha",

            "Kirungu",

            "Nyambo",

            "Rubaya",

            "Rusave"

        ],



        "Gakere": [

            "Cayi",

            "Gakere",

            "Kibande",

            "Kibezi",

            "Kiremera",

            "Kiyange",

            "Munagano",

            "Ngeramigongo",

            "Ruvumu"

        ],



        "Giheta": [

            "Bihangare",

            "Bitambwe",

            "Congori",

            "Gicumbi",

            "Kidobori",

            "Masama",

            "Muhuzu",

            "Nyamurenge"

        ],



        "Kiremba": [

            "Cagwa",

            "Gahororo",

            "Gatwaro",

            "Gitsuka",

            "Gitaro",

            "Kiremba",

            "Masasu",

            "Mugerera",

            "Musanga",

            "Ruhama",

            "Ruyumpu",

            "Rwimbogo"

        ],



        "Marangara": [

            "Burenge",

            "Gisekuro",

            "Kagina",

            "Kigoma",

            "Kigufi",

            "Kizenga",

            "Makaba",

            "Ndihwe",

            "Nyakibari",

            "Nyamugari",

            "Nyanza",

            "Ruramba"

        ],



        "Musasa": [

            "Buhama",

            "Butare",

            "Canamo",

            "Kabanga",

            "Kabari",

            "Kagarama",

            "Masoro",

            "Mufigi",

            "Musasa",

            "Ruhata",

            "Rutobo"

        ],



        "Nyamugari": [

            "Burenza",

            "Gikomero",

            "Higiro",

            "Mutara",

            "Nyunzwe",

            "Renga",

            "Rugomba",

            "Runda"

        ],



        "Nyamurenza": [

            "Gaseregwa",

            "Gicu",

            "Gikingo",

            "Gitare",

            "Kaganda",

            "Kagoma",

            "Kajaga",

            "Mubung(e)re",

            "Mugende",

            "Nyabikenke",

            "Nyarusange"

        ]

    },





    // =========================

    // COMMUNE KIRUNDO

    // =========================

    "KIRUNDO": {



        "Bugabira": [

            "Gacamirindi",

            "Ntaho",

            "Ruhehe",

            "Rusugi"

        ],



        "Bukuba": [

            "Bwinyana",

            "Canziro",

            "Gahe",

            "Muramba",

            "Muyebe",

            "Nyagatovu",

            "Nyabihanga",

            "Rwisuri"

        ],



        "Cendajuru": [

            "Canika",

            "Cendajuru",

            "Kabirizi",

            "Kigobe",

            "Kiziba"

        ],



        "Cewe": [

            "Ceru",

            "Cewe",

            "Rukuramigabo",

            "Runyonza"

        ],



        "Gashingwa": [

            "Burarana",

            "Gashingwa",

            "Kavumu",

            "Kiraro",

            "Kirima",

            "Martyazo",

            "Nyakibanda",

            "Nyamivuma",

            "Nyamyumba",

            "Rugeri"

        ],



        "Gihosha": [

            "Gakana",

            "Gihosha",

            "Kinyangurube",

            "Mutara",

            "Mwenya",

            "Rugero",

            "Shinge"

        ],



        "Gikuyo": [

            "Bugera",

            "Busenyi",

            "Cumba",

            "Gikuyo",

            "Kanyinya",

            "Karamagi",

            "Mataka",

            "Rambo"

        ],



        "Kavomo": [

            "Kavomo",

            "Kireka",

            "Kiyanza",

            "Muramba",

            "Yaranda"

        ],



        "Kigina": [

            "Gaturanda",

            "Gitorongero",

            "Karisha",

            "Kigina",

            "Nyabikenke"

        ],



        "Kigoma": [

            "Kigoma",

            "Muyange",

            "Nyamata",

            "Rugando",

            "Rugasa",

            "Saruduha",

            "Shenga"

        ],



        "Kiri": [

            "Cimo",

            "Kiribu",

            "Mubuga",

            "Mugombwa",

            "Munyinya",

            "Ngaragu",

            "Ntembe"

        ],



        "Kirundo": [

            "Murama",

            "Quartier Bushaza",

            "Quartier Kavogero",

            "Quartier Kumahoro",

            "Quartier Rupfunda",

            "Quartier Windora"

        ],



        "Kiyonza": [

            "Cindonyi",

            "Cinuma",

            "Gasagara",

            "Kiyonza",

            "Ninda",

            "Nunga",

            "Nyakarama",

            "Rubuga",

            "Rutamo"

        ],



        "Mugendo": [

            "Burungarire",

            "Carubambo",

            "Kinyovu",

            "Makombe",

            "Mariza",

            "Mugendo",

            "Ntango",

            "Rutagara",

            "Sasa"

        ],



        "Murungurira": [

            "Gitwenzi",

            "Kamenya",

            "Kanyagu",

            "Kigina",

            "Murungurira",

            "Susa"

        ],



        "Ntega": [

            "Gasave",

            "Kigaga",

            "Mihigo",

            "Monge",

            "Ntega",

            "Nyabisindu",

            "Nyemera",

            "Rugese"

        ],



        "Nyamabuye": [

            "Bwiza",

            "Gitwe",

            "Kamwayi",

            "Muyumpu",

            "Nyamabuye",

            "Rukondokondo",

            "Ryagihana"

        ],



        "Runyank(e)zi": [

            "Bugorora",

            "Gisitwe",

            "Mwendo",

            "Ngendo",

            "Rukore",

            "Runyank(e)zi"

        ],



        "Rushubije": [

            "Gatwe",

            "Kanabugiri",

            "Muyinza",

            "Nk(o)rwe",

            "Nyakibingo",

            "Rushubije",

            "Rwimbogo"

        ],



        "Vumbi": [

            "Butsimba",

            "Gasura",

            "Gikomero",

            "Kabuye",

            "Mbasi",

            "Nyabikenke",

            "Rwimanzovu",

            "Shororo",

            "Vumbi"

        ]

    },





    // =========================

    // COMMUNE MATONGO

    // =========================

    "MATONGO": {



        "Banga": [

            "Banga",

            "Bihunge",

            "Matongo",

            "Mpemba",

            "Munini",

            "Murambi",

            "Mutarure",

            "Nyakibingo",

            "Rudene"

        ],



        "Burarana": [

            "Burarana",

            "Butuharana",

            "Bwisange",

            "Kijuri",

            "Mikamba",

            "Nyarurambi",

            "Ruvumu"

        ],



        "Busangana": [

            "Burarana",

            "Busangana",

            "Busekera",

            "Gashishima",

            "Kiger(e)ka",

            "Nyambo",

            "Rwantsinda",

            "Rusha"

        ],



        "Butaganzwa": [

            "Busokoza",

            "Gahise",

            "Gatabo",

            "Mufumya",

            "Muremera",

            "Nkango",

            "Nyarurama",

            "Rukambara"

        ],



        "Gatara": [

            "Gakenke",

            "Gihororo",

            "Karambi",

            "Kivuruga",

            "Muhingira",

            "Murago",

            "Nyarurambi",

            "Ruhengeri"

        ],



        "Kabuye": [

            "Camizi",

            "Gitwe",

            "Kabuye",

            "Kinyovu",

            "Munyinya",

            "Musonge",

            "Nt(e)ko",

            "Rukoma"

        ],



        "Mbirizi": [

            "Kanyankuru",

            "Karurusi",

            "Kibaribari",

            "Kibayi",

            "Kibenga",

            "Mbirizi",

            "Mudusi",

            "Munini",

            "Rubagabaga"

        ],



        "Ngoro": [

            "Gisyo",

            "Gitwen(g)e",

            "Kabungo",

            "Kigume",

            "Migende",

            "Ngendo",

            "Ngoro",

            "Nteko",

            "Rwankuba",

            "Shinya"

        ],



        "Ninga": [

            "Bumba",

            "Gikung(e)re",

            "Munyinya",

            "Ninga",

            "Rugoma"

        ],



        "Nyabibuye": [

            "Kigarama",

            "Kigwandi",

            "Kiryama",

            "Musema",

            "Nyabibuye",

            "Shembati"

        ],



        "Ruganza": [

            "Bandaga",

            "Burengo",

            "Bwayi",

            "Gasare",

            "Kibavu",

            "Kivumu",

            "Muganza",

            "Mvumyu",

            "Ngoro",

            "Nyarumanga",

            "Ruganza"

        ]

    },





    // =========================

    // COMMUNE MUHANGA

    // =========================

    "MUHANGA": {



        "Bisha": [

            "Bisha",

            "Bishuri",

            "Gatare",

            "Kabuye",

            "Karehe",

            "Nyabitwe",

            "Nyamonde",

            "Rubirizi",

            "Tara"

        ],



        "Gaheta": [

            "Butanyerera",

            "Gacokwe",

            "Gipfuyya",

            "Karama",

            "Muzumure",

            "Nyabiyogi"

        ],



        "Gahombo": [

            "Businde",

            "Butezi",

            "Gahombo",

            "Gakuro",

            "Gishunzi",

            "Karin(zi)",

            "Kinyonga",

            "Kivoga",

            "Kiyange",

            "Mikoni",

            "Rukago",

            "Ruzingati"

        ],



        "Gikomero": [

            "Gikomero",

            "Kaguruka",

            "Kiguruka",

            "Kirahamira",

            "Musagara",

            "Rubungu",

            "Rusave"

        ],



        "Muhanga": [

            "Gaharo",

            "Gashubika",

            "Kibimba",

            "Mbaba",

            "Muhanga",

            "Musama",

            "Mwendo",

            "Ngoma",

            "Rugamba",

            "Rushenza"

        ],



        "Mbazi": [

            "Ceyerezi",

            "Gasenyi",

            "Gatozo",

            "Kanyundo",

            "Masanze",

            "Mbogwe",

            "Mbazi",

            "Ndava",

            "Nyamwera",

            "Sakinyinya"

        ],



        "Mubogora": [

            "Bushoka",

            "Gatura",

            "Gisara",

            "Gitamo",

            "Kivuzo",

            "Mubogora",

            "Nyamitanga",

            "Nyarurambi",

            "Rubanga",

            "Rushubi"

        ],



        "Nzewe": [

            "Bigugo",

            "Butwe",

            "Gasave",

            "Jimbi",

            "Kavuvuma",

            "Kivuvuma",

            "Mwenene",

            "Nzewe",

            "Rukanu",

            "Shurugumya"

        ],



        "Rango": [

            "Gihororo",

            "Gitibu",

            "Nyabibuye",

            "Nyarusange",

            "Rama",

            "Rango",

            "Ruhinga"

        ]

    },





    // =========================

    // COMMUNE NGOZI

    // =========================

    "NGOZI": {



        "Buhiga": [

            "Busoro",

            "Gahwazi",

            "Gakeceri",

            "Kinyana",

            "Makombe",

            "Masama"

        ],



        "Busiga": [

            "Bitambwe",

            "Caga",

            "Kididiri",

            "Kigufi",

            "Mihigo",

            "Muremera",

            "Mutumba",

            "Muyogoro",

            "Nyange",

            "Rubari",

            "Rugori",

            "Rwanyege"

        ],



        "Buye": [

            "Buye",

            "Hayiro",

            "Muremera",

            "Mushitsi",

            "Nyaruganda",

            "Nzove"

        ],



        "Gatsinda": [

            "Buhanda",

            "Buzagirahamwe",

            "Gatsinda",

            "Gitundwe",

            "Kayanza",

            "Kibindi",

            "Murama",

            "Rukarazo",

            "Rwarangabo",

            "Sabenarwa"

        ],



        "Makaba": [

            "Gihoma",

            "Kivuzo",

            "Makaba",

            "Nkero",

            "Rwahirwa"

        ],



        "Mivo": [

            "Cigurimie",

            "Gasebeyi",

            "Gitwero",

            "Hina",

            "Kambati",

            "Kiruri",

            "Mirango",

            "Mivo",

            "Mwungere"

        ],



        "Mubuga": [

            "Bwiza",

            "Gahengeri",

            "Kavumu",

            "Kayogoro",

            "Mubuga",

            "Nyaruntana",

            "Sare",

            "Shango"

        ],



        "Mugomera": [

            "Burima",

            "Kimenyi",

            "Mugomera",

            "Ntaho",

            "Nyabihanga",

            "Nyanza",

            "Ruhongore"

        ],



        "Mwumba": [

            "Bugorora",

            "Gakenke",

            "Gihama",

            "Gitasi",

            "Kabasazi",

            "Kagozi",

            "Karungura",

            "Ntembe"

        ],



        "Ngozi": [

            "Quartier Camugani",

            "Quartier Gabiro",

            "Quartier Gisagara",

            "Quartier Kanyami",

            "Quartier Kinyami",

            "Quartier Muremera",

            "Quartier Rubuye",

            "Quartier Rusuguti",

            "Quartier Shikiro"

        ],



        "Rukeco": [

            "Gitaba",

            "Kavumu",

            "Kimagara",

            "Mpongodoto",

            "Murambi",

            "Nyabizinu",

            "Rumbaga"

        ],



        "Rwibiriro": [

            "Burenza",

            "Butaganda",

            "Cahi",

            "Kabataha",

            "Rwibiriro"

        ]

    },





    // =========================

    // COMMUNE TANGARA

    // =========================

    "TANGARA": {



        "Gasezerwa": [

            "Cumba",

            "Gitaramuka",

            "Mwuka",

            "Nkanda",

            "Nyankurazo",

            "Nyuragati"

        ],



        "Gashikanwa": [

            "Cihonda",

            "Gashikanwa",

            "Kivumu",

            "Maruri",

            "Nini",

            "Rwizingwe"

        ],



        "Gatobo": [

            "Buhoro",

            "Butaganda",

            "Gitanga",

            "Musamba",

            "Ruhengeri",

            "Sigi"

        ],



        "Kabuye": [

            "Buganuka",

            "Kabuye",

            "Mubira",

            "Mukoni",

            "Mutobo",

            "Nyakibingo",

            "Nyamugari",

            "Rimiro",

            "Ruyaga"

        ],



        "Kananira": [

            "Kamira",

            "Kananira",

            "Muramba",

            "Rugabo",

            "Runini",

            "Ruyogoro"

        ],



        "Mubanga": [

            "Gitwenzi",

            "Kimezenjana",

            "Mihigo",

            "Mubanga",

            "Muhama",

            "Ntiba"

        ],



        "Musenyi": [

            "Bomba",

            "Gitwa",

            "Mafu",

            "Mirango",

            "Mugiramp(e)ke",

            "Musakazi",

            "Musenyi",

            "Nyagasebeyi",

            "Rushoka",

            "Ruyaga"

        ],



        "Ngoma": [

            "Butaha",

            "Gatukuza",

            "Kabamba",

            "Ngoma",

            "Rutanga"

        ],



        "Nyagatovu": [

            "Butezi",

            "Gikingo",

            "Kibande",

            "Mashitsi",

            "Nyagatovu",

            "Rukongwa"

        ],



        "Remera": [

            "Gatare",

            "Mafuro",

            "Remera",

            "Rusengo",

            "Rutambwe",

            "Sabunda"

        ],



        "Ruhororo": [

            "Bucamihigo",

            "Buniha",

            "Cagura",

            "Gitamo",

            "Gitanga",

            "Gitaramuka",

            "Kagoma",

            "Kinyami",

            "Rwamiko"

        ],



        "Taba": [

            "Banda",

            "Giturwe",

            "Kobero",

            "Nkoto",

            "Nyarunazi",

            "Ninyina",

            "Ryanyinya"

        ],



        "Tangara": [

            "Bwotoyi",

            "Gasekanya",

            "Gisura",

            "Kigomero",

            "Kiruhura",

            "Mbasi",

            "Myando",

            "Ngendo",

            "Nyakabanda"

        ]

    }

};



// ======================================

// PROVINCES ZOSE 5

// ======================================







// ======================================================

// 3. DATA ADMINISTRATIVE

// ======================================================



const dataAdministrative = {



    "BUHUMUZA": BUHUMUZA,

    "BUJUMBURA": BUJUMBURA,

    "GITEGA": GITEGA,

    "BURUNGA": BURUNGA,

    "BUTANYERERA": BUTANYERERA

};

// Compatibilité avec register.js (script classique).
window.COMMUNES_PAR_PROVINCE = COMMUNES_PAR_PROVINCE;
window.dataAdministrative = dataAdministrative;




// ======================================================

// 4. ELEMENTS ZA HTML

// ======================================================



const provinceUtilisateur =

    document.getElementById("provinceUtilisateur");



const communeUtilisateur =

    document.getElementById("communeUtilisateur");



const zoneUtilisateur =

    document.getElementById("zoneUtilisateur");



const collineUtilisateur =

    document.getElementById("collineUtilisateur");





// ======================================================

// 5. CHARGER COMMUNES

// ======================================================



function chargerCommunes() {



    if (!provinceUtilisateur || !communeUtilisateur) return;



    const province = provinceUtilisateur.value;



    communeUtilisateur.innerHTML =

        '<option value="">Sélectionner une commune</option>';



    if (zoneUtilisateur) {

        zoneUtilisateur.innerHTML =

            '<option value="">Sélectionner une zone</option>';



        zoneUtilisateur.disabled = true;

    }



    if (collineUtilisateur) {

        collineUtilisateur.innerHTML =

            '<option value="">Sélectionner une colline / quartier</option>';



        collineUtilisateur.disabled = true;

    }



    communeUtilisateur.disabled = true;



    if (!province) return;



    const provinceKey = province.toUpperCase();



    const provinceData =

        dataAdministrative[provinceKey];



    if (!provinceData) {

        console.error(

            "Province introuvable :",

            provinceKey

        );

        return;

    }



    Object.keys(provinceData).forEach(commune => {



        const option =

            document.createElement("option");



        option.value = commune;

        option.textContent = commune;



        communeUtilisateur.appendChild(option);

    });



    communeUtilisateur.disabled = false;

}





// ======================================================

// 6. CHARGER ZONES

// ======================================================



function chargerZones() {



    if (

        !provinceUtilisateur ||

        !communeUtilisateur ||

        !zoneUtilisateur

    ) return;



    const province =

        provinceUtilisateur.value;



    const commune =

        communeUtilisateur.value;



    zoneUtilisateur.innerHTML =

        '<option value="">Sélectionner une zone</option>';



    if (collineUtilisateur) {

        collineUtilisateur.innerHTML =

            '<option value="">Sélectionner une colline / quartier</option>';



        collineUtilisateur.disabled = true;

    }



    zoneUtilisateur.disabled = true;



    if (!province || !commune) return;



    const provinceKey =

        province.toUpperCase();



    const communeKey =

        commune.toUpperCase();



    const provinceData =

        dataAdministrative[provinceKey];



    if (!provinceData) return;



    const communeData =

        provinceData[communeKey];



    if (!communeData) {

        console.error(

            "Commune introuvable :",

            communeKey

        );

        return;

    }



    Object.keys(communeData).forEach(zone => {



        const option =

            document.createElement("option");



        option.value = zone;

        option.textContent = zone;



        zoneUtilisateur.appendChild(option);

    });



    zoneUtilisateur.disabled = false;

}





// ======================================================

// 7. CHARGER COLLINES / QUARTIERS

// ======================================================



function chargerCollines() {



    if (

        !provinceUtilisateur ||

        !communeUtilisateur ||

        !zoneUtilisateur ||

        !collineUtilisateur

    ) return;



    const province =

        provinceUtilisateur.value;



    const commune =

        communeUtilisateur.value;



    const zone =

        zoneUtilisateur.value;



    collineUtilisateur.innerHTML =

        '<option value="">Sélectionner une colline / quartier</option>';



    collineUtilisateur.disabled = true;



    if (!province || !commune || !zone) return;



    const provinceKey =

        province.toUpperCase();



    const communeKey =

        commune.toUpperCase();



    const provinceData =

        dataAdministrative[provinceKey];



    if (!provinceData) return;



    const communeData =

        provinceData[communeKey];



    if (!communeData) return;



    const collines =

        communeData[zone] || [];



    collines.forEach(colline => {



        const option =

            document.createElement("option");



        option.value = colline;

        option.textContent = colline;



        collineUtilisateur.appendChild(option);

    });



    collineUtilisateur.disabled = false;

}





// ======================================================

// 8. EVENTS

// ======================================================



if (provinceUtilisateur) {



    provinceUtilisateur.addEventListener(

        "change",

        chargerCommunes

    );

}



if (communeUtilisateur) {



    communeUtilisateur.addEventListener(

        "change",

        chargerZones

    );

}



if (zoneUtilisateur) {



    zoneUtilisateur.addEventListener(

        "change",

        chargerCollines

    );

}





// ======================================================
// 9. GESTION DES COMPTES AVEC FIREBASE
// ======================================================

const formCreerUtilisateur =
    document.getElementById("formCreerUtilisateur");

const nomUtilisateur =
    document.getElementById("nomUtilisateur");

const identifiantUtilisateur =
    document.getElementById("identifiantUtilisateur");

const motDePasseUtilisateur =
    document.getElementById("motDePasseUtilisateur");

const confirmationMotDePasse =
    document.getElementById("confirmationMotDePasse");

const roleUtilisateur =
    document.getElementById("roleUtilisateur");

const paysUtilisateur =
    document.getElementById("paysUtilisateur");

const statutUtilisateur =
    document.getElementById("statutUtilisateur");

const tableUtilisateurs =
    document.getElementById("tableUtilisateurs");

const countUtilisateurs =
    document.getElementById("countUtilisateurs");

const messageUtilisateur =
    document.getElementById("messageUtilisateur");

const btnCreerUtilisateur =
    document.getElementById("btnCreerUtilisateur");

const btnAnnulerModification =
    document.getElementById("btnAnnulerModification");


const BPR_ROLES = {
    "Utilisateur": 1,
    "Manager Zonal": 2,
    "Manager Communal": 3,
    "Manager Provincial": 4,
    "Manager National": 5
};


// ======================================================
// OUTILS
// ======================================================

function afficherMessageCompte(message, type = "info") {

    if (!messageUtilisateur) return;

    messageUtilisateur.textContent = message;
    messageUtilisateur.className =
        "message-utilisateur " + type;
}


function echapperCompte(valeur) {

    return String(valeur ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function messageErreurFirebase(erreur) {

    const code = erreur?.code || "";

    if (code === "auth/email-already-in-use") {
        return "❌ Cet identifiant existe déjà.";
    }

    if (code === "auth/weak-password") {
        return "❌ Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (code === "auth/invalid-email") {
        return "❌ Identifiant invalide.";
    }

    if (code === "permission-denied") {
        return "❌ Accès refusé par les règles Firebase.";
    }

    return erreur?.message ||
        "❌ Une erreur est survenue.";
}


// ======================================================
// CHAMPS SELON LE RÔLE DU NOUVEAU COMPTE
// ======================================================

function gererChampsSelonRole() {

    if (
        !roleUtilisateur ||
        !provinceUtilisateur ||
        !communeUtilisateur ||
        !zoneUtilisateur ||
        !collineUtilisateur
    ) {
        return;
    }

    const role = roleUtilisateur.value;

    provinceUtilisateur.disabled = true;
    communeUtilisateur.disabled = true;
    zoneUtilisateur.disabled = true;
    collineUtilisateur.disabled = true;

    if (paysUtilisateur) {
        paysUtilisateur.disabled = true;
        paysUtilisateur.value = "BURUNDI";
    }


    // Manager National : aucun territoire à choisir.
    if (role === "Manager National") {

        if (paysUtilisateur) {
            paysUtilisateur.disabled = false;
            paysUtilisateur.value = "BURUNDI";
        }

        provinceUtilisateur.value = "";
        communeUtilisateur.value = "";
        zoneUtilisateur.value = "";
        collineUtilisateur.value = "";

        return;
    }


    // Manager Provincial : province obligatoire.
    if (role === "Manager Provincial") {

        provinceUtilisateur.disabled = false;
        communeUtilisateur.value = "";
        zoneUtilisateur.value = "";
        collineUtilisateur.value = "";

        return;
    }


    // Manager Communal : province + commune.
    if (role === "Manager Communal") {

        provinceUtilisateur.disabled = false;
        communeUtilisateur.disabled = false;
        zoneUtilisateur.value = "";
        collineUtilisateur.value = "";

        return;
    }


    // Manager Zonal : province + commune + zone.
    if (role === "Manager Zonal") {

        provinceUtilisateur.disabled = false;
        communeUtilisateur.disabled = false;
        zoneUtilisateur.disabled = false;
        collineUtilisateur.value = "";

        return;
    }


    // Utilisateur : territoire complet jusqu'à la colline.
    if (role === "Utilisateur") {

        provinceUtilisateur.disabled = false;
        communeUtilisateur.disabled = false;
        zoneUtilisateur.disabled = false;
        collineUtilisateur.disabled = false;
    }
}


// ======================================================
// TERRITOIRE DU NOUVEAU COMPTE
// ======================================================

function obtenirTerritoireCompte() {

    const role =
        roleUtilisateur?.value || "";

    const territoire = {

        pays:
            paysUtilisateur?.value ||
            "BURUNDI",

        province:
            provinceUtilisateur?.value ||
            "",

        commune:
            communeUtilisateur?.value ||
            "",

        zone:
            zoneUtilisateur?.value ||
            "",

        colline:
            collineUtilisateur?.value ||
            ""

    };


    if (role === "Manager National") {

        territoire.pays = "BURUNDI";
        territoire.province = "";
        territoire.commune = "";
        territoire.zone = "";
        territoire.colline = "";
    }


    if (role === "Manager Provincial") {

        territoire.commune = "";
        territoire.zone = "";
        territoire.colline = "";
    }


    if (role === "Manager Communal") {

        territoire.zone = "";
        territoire.colline = "";
    }


    if (role === "Manager Zonal") {

        territoire.colline = "";
    }


    return territoire;
}


function verifierTerritoire() {

    const role =
        roleUtilisateur?.value || "";

    const territoire =
        obtenirTerritoireCompte();


    if (!role) {
        return "Veuillez sélectionner le type de compte.";
    }


    if (role === "Manager National") {
        return "";
    }


    if (!territoire.province) {
        return "Veuillez sélectionner une province.";
    }


    if (
        (
            role === "Manager Communal" ||
            role === "Manager Zonal" ||
            role === "Utilisateur"
        ) &&
        !territoire.commune
    ) {
        return "Veuillez sélectionner une commune.";
    }


    if (
        (
            role === "Manager Zonal" ||
            role === "Utilisateur"
        ) &&
        !territoire.zone
    ) {
        return "Veuillez sélectionner une zone.";
    }


    if (
        role === "Utilisateur" &&
        !territoire.colline
    ) {
        return "Veuillez sélectionner une colline / quartier.";
    }


    return "";
}


// ======================================================
// COMPTE CONNECTÉ
// ======================================================

function normaliserRoleBPR(role) {
    return String(role || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}

function roleCanoniqueBPR(role) {
    const r = normaliserRoleBPR(role);

    const roles = {
        "utilisateur": "Utilisateur",
        "manager zonal": "Manager Zonal",
        "manager communal": "Manager Communal",
        "manager provincial": "Manager Provincial",
        "manager national": "Manager National"
    };

    return roles[r] || "";
}

function lireSessionLocaleBPR() {
    const cles = [
        "BPR_COMPTE_CONNECTE",
        "bpr_current_user",
        "bpr_manager_connecte"
    ];

    for (const cle of cles) {
        try {
            const valeur = localStorage.getItem(cle);
            if (!valeur) continue;

            const objet = JSON.parse(valeur);
            if (objet && typeof objet === "object") {
                return objet;
            }
        } catch (erreur) {
            console.warn("Session locale invalide :", erreur);
        }
    }

    return null;
}

async function obtenirCompteCreateur() {
    let compte = null;

    // Firebase est prioritaire.
    try {
        compte = await compteConnecte();
    } catch (erreur) {
        console.warn("Session Firebase :", erreur);
    }

    // Fallback local si Firebase n'est pas encore prêt.
    if (!compte) {
        compte = lireSessionLocaleBPR();
    }

    if (!compte) {
        return null;
    }

    const role = roleCanoniqueBPR(
        compte.role ||
        compte.roleUtilisateur ||
        compte.userRole ||
        localStorage.getItem("userRole") ||
        ""
    );

    if (!role) {
        console.error("Rôle BPR introuvable dans le compte connecté.", compte);
        return null;
    }

    compte.role = role;

    // Garantit les territoires même pour une ancienne session.
    compte.pays = compte.pays || localStorage.getItem("userPays") || "BURUNDI";
    compte.province = compte.province || localStorage.getItem("userProvince") || "";
    compte.commune = compte.commune || localStorage.getItem("userCommune") || "";
    compte.zone = compte.zone || localStorage.getItem("userZone") || "";
    compte.colline = compte.colline || localStorage.getItem("userColline") || "";

    localStorage.setItem(
        "BPR_COMPTE_CONNECTE",
        JSON.stringify(compte)
    );

    return compte;
}

// ======================================================
// AUTORISATION DE CRÉER UN RÔLE
// ======================================================

function peutCreerRole(
    roleCreateur,
    roleNouveau
) {
    const createur = roleCanoniqueBPR(roleCreateur);
    const nouveau = roleCanoniqueBPR(roleNouveau);

    // Le Manager National peut créer TOUS les types de comptes.
    if (createur === "Manager National") {
        return [
            "Utilisateur",
            "Manager Zonal",
            "Manager Communal",
            "Manager Provincial",
            "Manager National"
        ].includes(nouveau);
    }

    const niveauCreateur = BPR_ROLES[createur] || 0;
    const niveauNouveau = BPR_ROLES[nouveau] || 0;

    if (!niveauCreateur || !niveauNouveau) {
        return false;
    }

    return niveauNouveau < niveauCreateur;
}


// ======================================================
// AUTORISATION TERRITORIALE
// ======================================================

function territoireAutorise(
    donnees,
    createur
) {
    if (!createur) {
        return false;
    }

    const role = roleCanoniqueBPR(
        createur.role ||
        createur.roleUtilisateur ||
        createur.userRole
    );

    // MANAGER NATIONAL : accès à tout le Burundi.
    if (role === "Manager National") {
        return true;
    }

    const provinceCreateur = String(createur.province || "").trim();
    const communeCreateur = String(createur.commune || "").trim();
    const zoneCreateur = String(createur.zone || "").trim();

    const province = String(donnees.province || "").trim();
    const commune = String(donnees.commune || "").trim();
    const zone = String(donnees.zone || "").trim();

    if (role === "Manager Provincial") {
        return province === provinceCreateur;
    }

    if (role === "Manager Communal") {
        return (
            province === provinceCreateur &&
            commune === communeCreateur
        );
    }

    if (role === "Manager Zonal") {
        return (
            province === provinceCreateur &&
            commune === communeCreateur &&
            zone === zoneCreateur
        );
    }

    return false;
}


// ======================================================
// CRÉER LE COMPTE
// ======================================================

async function creerUtilisateurFirebase() {

    const message =
        messageUtilisateur;

    const bouton =
        btnCreerUtilisateur;


    const donnees = {

        nomUtilisateur:
            nomUtilisateur?.value.trim() || "",

        identifiant:
            identifiantUtilisateur?.value.trim() || "",

        motDePasse:
            motDePasseUtilisateur?.value || "",

        confirmation:
            confirmationMotDePasse?.value || "",

        role:
            roleUtilisateur?.value || "",

        statut:
            statutUtilisateur?.value ||
            "Actif",

        ...obtenirTerritoireCompte()

    };


    if (
        !donnees.nomUtilisateur ||
        !donnees.identifiant ||
        !donnees.motDePasse ||
        !donnees.confirmation ||
        !donnees.role
    ) {

        afficherMessageCompte(
            "⚠️ Veuillez remplir tous les champs obligatoires.",
            "erreur"
        );

        return;
    }


    if (
        donnees.motDePasse.length < 6
    ) {

        afficherMessageCompte(
            "❌ Le mot de passe doit contenir au moins 6 caractères.",
            "erreur"
        );

        return;
    }


    if (
        donnees.motDePasse !==
        donnees.confirmation
    ) {

        afficherMessageCompte(
            "❌ Les mots de passe ne correspondent pas.",
            "erreur"
        );

        return;
    }


    const erreurTerritoire =
        verifierTerritoire();


    if (erreurTerritoire) {

        afficherMessageCompte(
            "❌ " + erreurTerritoire,
            "erreur"
        );

        return;
    }


    if (bouton) {

        bouton.disabled = true;
        bouton.textContent =
            "⏳ Création...";

    }


    try {

        const createur =
            await obtenirCompteCreateur();


        if (!createur) {

            throw new Error(
                "Aucun compte BPR connecté. Connectez-vous d'abord."
            );
        }


        const roleCreateur =
            roleCanoniqueBPR(createur.role);

        const roleNouveau =
            roleCanoniqueBPR(donnees.role);

        if (!roleCreateur) {
            throw new Error(
                "Le rôle du compte connecté est introuvable."
            );
        }

        if (!roleNouveau) {
            throw new Error(
                "Le rôle du nouveau compte est invalide."
            );
        }

        if (
            !peutCreerRole(
                roleCreateur,
                roleNouveau
            )
        ) {
            throw new Error(
                "Vous n'avez pas l'autorisation de créer ce type de compte."
            );
        }


        if (
            !territoireAutorise(
                donnees,
                createur
            )
        ) {

            throw new Error(
                "Ce territoire n'est pas autorisé pour votre compte."
            );
        }


        const resultat =
            await creerCompte({

                nomUtilisateur:
                    donnees.nomUtilisateur,

                identifiant:
                    donnees.identifiant,

                motDePasse:
                    donnees.motDePasse,

                role:
                    donnees.role,

                statut:
                    donnees.statut,

                province:
                    donnees.province,

                commune:
                    donnees.commune,

                zone:
                    donnees.zone,

                colline:
                    donnees.colline,

                creeParUid:
                    createur.uid || "",

                creePar:
                    createur.nomUtilisateur ||
                    createur.nom ||
                    createur.identifiant ||
                    "Administrateur",

                creeParRole:
                    createur.role || ""

            });


        if (!resultat?.success) {

            throw new Error(
                "La création du compte a échoué."
            );
        }


        afficherMessageCompte(
            "✅ Compte créé avec succès.",
            "succes"
        );


        if (formCreerUtilisateur) {
            formCreerUtilisateur.reset();
        }


        gererChampsSelonRole();


        await afficherComptesFirebase();


    } catch (erreur) {

        console.error(
            "Erreur création compte :",
            erreur
        );


        afficherMessageCompte(
            messageErreurFirebase(erreur),
            "erreur"
        );

    } finally {

        if (bouton) {

            bouton.disabled = false;

            bouton.textContent =
                "Créer le compte";

        }

    }
}


// ======================================================
// AFFICHER LES COMPTES FIREBASE
// ======================================================

async function afficherComptesFirebase() {

    try {

        const comptes =
            await chargerComptes();


        const element =
            document.getElementById(
                "tableUtilisateurs"
            );


        if (!element) {
            return;
        }


        let tbody;


        if (
            element.tagName &&
            element.tagName.toLowerCase() ===
            "table"
        ) {

            tbody =
                element.querySelector("tbody");


            if (!tbody) {

                tbody =
                    document.createElement("tbody");

                element.appendChild(tbody);
            }

        } else {

            // Si tableUtilisateurs est déjà un <tbody>.
            tbody = element;
        }


        tbody.innerHTML = "";


        if (countUtilisateurs) {

            countUtilisateurs.textContent =
                comptes.length;

        }


        if (!comptes.length) {

            const ligne =
                document.createElement("tr");

            ligne.innerHTML = `
                <td colspan="10"
                    style="text-align:center;">
                    Aucun compte enregistré.
                </td>
            `;

            tbody.appendChild(ligne);

            return;
        }


        comptes.forEach(compte => {

            const ligne =
                document.createElement("tr");


            const id =
                echapperCompte(compte.id);


            ligne.innerHTML = `

                <td>
                    ${echapperCompte(
                        compte.nomUtilisateur
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.identifiant
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.role
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.province || "-"
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.commune || "-"
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.zone || "-"
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.colline || "-"
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.statut || "Actif"
                    )}
                </td>

                <td>
                    ${echapperCompte(
                        compte.creePar || "-"
                    )}
                </td>

                <td class="actions">

                    <button
                        type="button"
                        class="btn-voir"
                        onclick="bprVoirCompte('${id}')">
                        👁️ Voir
                    </button>

                    <button
                        type="button"
                        class="btn-modifier"
                        onclick="bprModifierCompte('${id}')">
                        ✏️ Modifier
                    </button>

                    <button
                        type="button"
                        class="btn-supprimer"
                        onclick="bprSupprimerCompte('${id}')">
                        🗑️ Supprimer
                    </button>

                </td>
            `;


            tbody.appendChild(ligne);

        });


    } catch (erreur) {

        console.error(
            "Erreur chargement comptes :",
            erreur
        );


        afficherMessageCompte(
            messageErreurFirebase(erreur),
            "erreur"
        );
    }
}


// ======================================================
// VOIR UN COMPTE
// ======================================================

async function bprVoirCompte(id) {

    try {

        const comptes =
            await chargerComptes();


        const compte =
            comptes.find(
                element =>
                    element.id === id
            );


        if (!compte) {

            alert(
                "Compte introuvable."
            );

            return;
        }


        alert(
            "👤 INFORMATIONS DU COMPTE\n\n" +

            "Nom : " +
            (compte.nomUtilisateur || "-") +

            "\n\nIdentifiant : " +
            (compte.identifiant || "-") +

            "\n\nRôle : " +
            (compte.role || "-") +

            "\n\nStatut : " +
            (compte.statut || "-") +

            "\n\nProvince : " +
            (compte.province || "-") +

            "\n\nCommune : " +
            (compte.commune || "-") +

            "\n\nZone : " +
            (compte.zone || "-") +

            "\n\nColline : " +
            (compte.colline || "-") +

            "\n\nCréé par : " +
            (compte.creePar || "-")
        );


    } catch (erreur) {

        console.error(
            "Erreur affichage compte :",
            erreur
        );

        alert(
            messageErreurFirebase(erreur)
        );
    }
}


// ======================================================
// MODIFIER UN COMPTE
// ======================================================

async function bprModifierCompte(id) {

    try {

        const comptes =
            await chargerComptes();


        const compte =
            comptes.find(
                element =>
                    element.id === id
            );


        if (!compte) {

            alert(
                "Compte introuvable."
            );

            return;
        }


        const nom =
            prompt(
                "Nom de l'utilisateur :",
                compte.nomUtilisateur || ""
            );


        if (nom === null) {
            return;
        }


        const statut =
            prompt(
                "Statut :",
                compte.statut || "Actif"
            );


        if (statut === null) {
            return;
        }


        await modifierCompte(
            id,
            {

                nomUtilisateur:
                    nom.trim(),

                role:
                    compte.role || "",

                statut:
                    statut.trim(),

                province:
                    compte.province || "",

                commune:
                    compte.commune || "",

                zone:
                    compte.zone || "",

                colline:
                    compte.colline || ""

            }
        );


        alert(
            "✅ Compte modifié avec succès."
        );


        await afficherComptesFirebase();


    } catch (erreur) {

        console.error(
            "Erreur modification :",
            erreur
        );

        alert(
            messageErreurFirebase(erreur)
        );
    }
}


// ======================================================
// SUPPRIMER UN COMPTE
// ======================================================

async function bprSupprimerCompte(id) {

    try {

        const confirmation =
            confirm(
                "Voulez-vous vraiment supprimer ce compte ?"
            );


        if (!confirmation) {
            return;
        }


        await supprimerCompte(id);


        alert(
            "✅ Compte supprimé de la liste Firestore."
        );


        await afficherComptesFirebase();


    } catch (erreur) {

        console.error(
            "Erreur suppression :",
            erreur
        );

        alert(
            messageErreurFirebase(erreur)
        );
    }
}


// ======================================================
// BOUTONS HTML
// ======================================================

window.bprVoirCompte =
    bprVoirCompte;

window.bprModifierCompte =
    bprModifierCompte;

window.bprSupprimerCompte =
    bprSupprimerCompte;

window.afficherComptesFirebase =
    afficherComptesFirebase;

window.creerUtilisateur =
    creerUtilisateurFirebase;


// ======================================================
// EVENTS
// ======================================================

// IMPORTANT : un seul submit listener.
// L'ancien listener localStorage a été supprimé.

if (formCreerUtilisateur) {

    formCreerUtilisateur.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            await creerUtilisateurFirebase();

        }
    );
}


if (roleUtilisateur) {

    roleUtilisateur.addEventListener(
        "change",
        gererChampsSelonRole
    );
}


if (btnAnnulerModification) {

    btnAnnulerModification.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            if (formCreerUtilisateur) {
                formCreerUtilisateur.reset();
            }

            if (btnCreerUtilisateur) {
                btnCreerUtilisateur.textContent =
                    "Créer le compte";
            }

            if (btnAnnulerModification) {
                btnAnnulerModification.style.display =
                    "none";
            }

            gererChampsSelonRole();

            afficherMessageCompte(
                "Modification annulée.",
                "info"
            );
        }
    );

    btnAnnulerModification.style.display =
        "none";
}


// ======================================================
// INITIALISATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        gererChampsSelonRole();

        await afficherComptesFirebase();

    }
);