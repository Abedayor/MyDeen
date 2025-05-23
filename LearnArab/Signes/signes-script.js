let lastScrollTop = 0;
let ticking = false;

const contentContainer = document.getElementById("contentContainer");
const topBar = document.getElementById("topBar");

if (contentContainer && topBar) {
    contentContainer.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollTop = contentContainer.scrollTop;

                if (scrollTop > lastScrollTop && scrollTop > 15) {
                    topBar.classList.add("hidden");
                    contentContainer.style.marginTop = '0';
                } else if (scrollTop < lastScrollTop) {
                    topBar.classList.remove("hidden");
                    contentContainer.style.marginTop = '2.4rem';
                }

                lastScrollTop = Math.max(scrollTop, 0);
                ticking = false;
            });

            ticking = true;
        }
    });
}

// Redirection au clic sur le bouton accueil
document.getElementById("homeButton")?.addEventListener("click", () => {
    window.location.href = "../../index.html";
});

// Retour à l’accueil avec la touche Échap
document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
        document.getElementById("homeButton")?.click();
    }
});

    const translations = {
        en: {
            title: "MyDeen - Signs of the Quran",
            settings: "Settings",
            theme: "Theme",
            aboutTitle: "About",
            aboutText: "Educational app dedicated to learning the Arabic alphabet and the Quran.",
            usefulLinks: "Useful Links",
            alphabetLink: "Alphabet",
            homeB: "Home",
            text_header: "Stopping and Connecting Signs in the Quran",
            "waqf-lazim": "Waqf Lāzim – Obligatory stop",
            "waqf-jaiz": "Waqf Jā'iz – Recommended stop",
            "liaison": "Preferred continuation – Light stop",
            "saktah": "Saktah – Very brief pause",
            "la": "Lā – Do not stop",
            "sajda": "Sajda – Prostration sign",
            "hizb": "Rubʿ Hizb – Section mark",
            "madd": "Madd – Elongation",
            "jaiz2": "Waqf Jā'iz – Preferred stop",
            "sukun": "Sukun – Absence of vowel",
            "shadda": "Shadda – Consonant doubling",
            "alif-wasla": "Alif Wasla – Alif pronounced only at sentence start",
            "numero": "Verse number – End of a verse",
            "double-arret": "Double stop – Reciter’s choice",
            "idgham": "Idghām Shafawi – ن assimilated into م with visible mim",
            "fathatan": "Fathatan – Double vowel 'an'",
            "kasratan": "Kasratan – Double vowel 'in'",
            "dammatan": "Dammatan – Double vowel 'un'",
            "khafiyyah": "Alif Khafiyyah – Hidden Alif (not written)"
        },
        fr: {
            title: "MyDeen - Signes du Coran",
            settings: "Paramètres",
            theme: "Thème",
            aboutTitle: "À propos",
            aboutText: "Application éducative dédiée à l'apprentissage de l'alphabet arabe et du Coran.",
            usefulLinks: "Liens utiles",
            alphabetLink: "Alphabet",
            homeB: "Page d'accueil",
            text_header: "Signes d'arrêt et de liaison du Quran",
            "waqf-lazim": "Waqf Lāzim – Arrêt obligatoire",
            "waqf-jaiz": "Waqf Jā'iz – Arrêt recommandé",
            "liaison": "Liaison préférable – Waqf léger",
            "saktah": "Saktah – Très légère arrêt",
            "la": "Lā – Ne pas s'arrêter",
            "sajda": "Sajda – Prosternation",
            "hizb": "Rubʿ Hizb – Séparation",
            "madd": "Madd – Allongement",
            "jaiz2": "Waqf Ja'iz – Arrêt préférable",
            "sukun": "Sukun – Absence de voyelle",
            "shadda": "Shadda – Doublement de consonne",
            "alif-wasla": "Alif Wasla – Alif qui se prononce que au début de phrase",
            "numero": "Numéro de verset – Fin d'un verset",
            "double-arret": "Deux arrêts possibles – Choix laissé au récitant",
            "idgham": "Idghām Shafawi – Assimilation du ن en م avec mim apparent",
            "fathatan": "Fathatan – Voyelle double \"an\"",
            "kasratan": "Kasratan – Voyelle double \"in\"",
            "dammatan": "Dammatan – Voyelle double \"un\"",
            "khafiyyah": "Alif Khafiyyah – Alif (non écrit)"
        },
        de: {
            title: "MyDeen – Zeichen des Korans",
            settings: "Einstellungen",
            theme: "Thema",
            aboutTitle: "Über uns",
            aboutText: "Bildungs-App zum Erlernen des arabischen Alphabets und des Korans.",
            usefulLinks: "Nützliche Links",
            alphabetLink: "Alphabet",
            homeB: "Startseite",
            text_header: "Anhalte- und Verbindungssymbole im Koran",
            "waqf-lazim": "Waqf Lāzim – Obligatorischer Halt",
            "waqf-jaiz": "Waqf Jā'iz – Empfohlener Halt",
            "liaison": "Bevorzugte Fortsetzung – Leichter Halt",
            "saktah": "Saktah – Sehr kurze Pause",
            "la": "Lā – Kein Halt",
            "sajda": "Sajda – Niederwerfungszeichen",
            "hizb": "Rubʿ Hizb – Abschnittsmarkierung",
            "madd": "Madd – Verlängerung",
            "jaiz2": "Waqf Jā'iz – Bevorzugter Halt",
            "sukun": "Sukun – Fehlender Vokal",
            "shadda": "Shadda – Doppelkonsonant",
            "alif-wasla": "Alif Wasla – Alif nur am Satzanfang ausgesprochen",
            "numero": "Versnummer – Ende eines Verses",
            "double-arret": "Doppelter Halt – Wahl des Rezitators",
            "idgham": "Idghām Shafawi – ن verschmilzt mit م mit sichtbarem Mim",
            "fathatan": "Fathatan – Doppelvokal 'an'",
            "kasratan": "Kasratan – Doppelvokal 'in'",
            "dammatan": "Dammatan – Doppelvokal 'un'",
            "khafiyyah": "Alif Khafiyyah – Verborgener Alif (nicht geschrieben)"
        },
        es: {
            title: "MyDeen - Signos del Corán",
            settings: "Configuraciones",
            theme: "Tema",
            aboutTitle: "Acerca de",
            aboutText: "Aplicación educativa dedicada al aprendizaje del alfabeto árabe y del Corán.",
            usefulLinks: "Enlaces útiles",
            alphabetLink: "Alfabeto",
            homeB: "Inicio",
            text_header: "Signos de pausa y enlace en el Corán",
            "waqf-lazim": "Waqf Lāzim – Pausa obligatoria",
            "waqf-jaiz": "Waqf Jā'iz – Pausa recomendada",
            "liaison": "Continuación preferida – Pausa ligera",
            "saktah": "Saktah – Pausa muy breve",
            "la": "Lā – No detenerse",
            "sajda": "Sajda – Signo de postración",
            "hizb": "Rubʿ Hizb – Marca de sección",
            "madd": "Madd – Prolongación",
            "jaiz2": "Waqf Jā'iz – Pausa preferida",
            "sukun": "Sukun – Ausencia de vocal",
            "shadda": "Shadda – Duplicación de consonante",
            "alif-wasla": "Alif Wasla – Alif pronunciado solo al inicio de la oración",
            "numero": "Número de versículo – Fin de un versículo",
            "double-arret": "Doble pausa – Elección del recitador",
            "idgham": "Idghām Shafawi – ن asimilado en م con mim visible",
            "fathatan": "Fathatan – Vocal doble 'an'",
            "kasratan": "Kasratan – Vocal doble 'in'",
            "dammatan": "Dammatan – Vocal doble 'un'",
            "khafiyyah": "Alif Khafiyyah – Alif oculta (no escrita)"
        },
        it: {
            title: "MyDeen - Segni del Corano",
            settings: "Impostazioni",
            theme: "Tema",
            aboutTitle: "Informazioni",
            aboutText: "Applicazione educativa dedicata all'apprendimento dell'alfabeto arabo e del Corano.",
            usefulLinks: "Link utili",
            alphabetLink: "Alfabeto",
            homeB: "Home",
            text_header: "Segni di pausa e di collegamento nel Corano",
            "waqf-lazim": "Waqf Lāzim – Pausa obbligatoria",
            "waqf-jaiz": "Waqf Jā'iz – Pausa raccomandata",
            "liaison": "Continuazione preferita – Pausa leggera",
            "saktah": "Saktah – Pausa molto breve",
            "la": "Lā – Non fermarsi",
            "sajda": "Sajda – Segno di prosternazione",
            "hizb": "Rubʿ Hizb – Segno di sezione",
            "madd": "Madd – Allungamento",
            "jaiz2": "Waqf Jā'iz – Pausa preferita",
            "sukun": "Sukun – Assenza di vocale",
            "shadda": "Shadda – Raddoppio di consonante",
            "alif-wasla": "Alif Wasla – Alif pronunciata solo all'inizio della frase",
            "numero": "Numero del versetto – Fine del versetto",
            "double-arret": "Doppia pausa – Scelta del recitatore",
            "idgham": "Idghām Shafawi – ن assimilata in م con mim visibile",
            "fathatan": "Fathatan – Doppia vocale 'an'",
            "kasratan": "Kasratan – Doppia vocale 'in'",
            "dammatan": "Dammatan – Doppia vocale 'un'",
            "khafiyyah": "Alif Khafiyyah – Alif nascosta (non scritta)"
        },
        pt: {
            title: "MyDeen - Sinais do Alcorão",
            settings: "Configurações",
            theme: "Tema",
            aboutTitle: "Sobre",
            aboutText: "Aplicativo educativo dedicado ao aprendizado do alfabeto árabe e do Alcorão.",
            usefulLinks: "Links úteis",
            alphabetLink: "Alfabeto",
            homeB: "Início",
            text_header: "Sinais de pausa e ligação no Alcorão",
            "waqf-lazim": "Waqf Lāzim – Parada obrigatória",
            "waqf-jaiz": "Waqf Jā'iz – Parada recomendada",
            "liaison": "Continuação preferida – Parada leve",
            "saktah": "Saktah – Pausa muito breve",
            "la": "Lā – Não parar",
            "sajda": "Sajda – Sinal de prosternamento",
            "hizb": "Rubʿ Hizb – Marca de seção",
            "madd": "Madd – Alongamento",
            "jaiz2": "Waqf Jā'iz – Parada preferida",
            "sukun": "Sukun – Ausência de vogal",
            "shadda": "Shadda – Consoante dobrada",
            "alif-wasla": "Alif Wasla – Alif pronunciado apenas no início da frase",
            "numero": "Número do versículo – Fim de um versículo",
            "double-arret": "Parada dupla – Escolha do recitador",
            "idgham": "Idghām Shafawi – ن assimilado em م com mim visível",
            "fathatan": "Fathatan – Vogal dupla 'an'",
            "kasratan": "Kasratan – Vogal dupla 'in'",
            "dammatan": "Dammatan – Vogal dupla 'un'",
            "khafiyyah": "Alif Khafiyyah – Alif oculta (não escrita)"
        },
        tr: {
            title: "MyDeen - Kur'an'ın İşaretleri",
            settings: "Ayarlar",
            theme: "Tema",
            aboutTitle: "Hakkında",
            aboutText: "Arap alfabesi ve Kur'an öğrenimine adanmış eğitim uygulaması.",
            usefulLinks: "Faydalı bağlantılar",
            alphabetLink: "Alfabe",
            homeB: "Ana Sayfa",
            text_header: "Kur'an'daki duraklama ve bağlama işaretleri",
            "waqf-lazim": "Waqf Lāzim – Zorunlu durak",
            "waqf-jaiz": "Waqf Jā'iz – Tavsiye edilen durak",
            "liaison": "Tercih edilen devam – Hafif durak",
            "saktah": "Saktah – Çok kısa durak",
            "la": "Lā – Durma",
            "sajda": "Sajda – Secde işareti",
            "hizb": "Rubʿ Hizb – Bölüm işareti",
            "madd": "Madd – Uzatma",
            "jaiz2": "Waqf Jā'iz – Tercih edilen durak",
            "sukun": "Sukun – Ünlü eksikliği",
            "shadda": "Shadda – Ünsüz ikilemesi",
            "alif-wasla": "Alif Wasla – Cümle başında okunan Elif",
            "numero": "Ayet numarası – Ayetin sonu",
            "double-arret": "Çift durak – Okuyucunun seçimi",
            "idgham": "Idghām Shafawi – ن harfi م harfine asimile edilir, mim görünür",
            "fathatan": "Fathatan – Çift ünlü 'an'",
            "kasratan": "Kasratan – Çift ünlü 'in'",
            "dammatan": "Dammatan – Çift ünlü 'un'",
            "khafiyyah": "Alif Khafiyyah – Gizli Elif (yazılmamış)"
        },
        ar: {
            title: "ماي دين - إشارات من القرآن",
            settings: "الإعدادات",
            theme: "المظهر",
            aboutTitle: "حول التطبيق",
            aboutText: "تطبيق تعليمي مخصص لتعلم الحروف العربية والقرآن الكريم.",
            usefulLinks: "روابط مفيدة",
            alphabetLink: "الحروف",
            homeB: "الصفحة الرئيسية",
            text_header: "علامات الوقف والوصل في القرآن",
            "waqf-lazim": "وقف لازم – توقف إلزامي",
            "waqf-jaiz": "وقف جائز – توقف مستحب",
            "liaison": "استمرار مفضل – وقف خفيف",
            "saktah": "سكتة – وقفة قصيرة جداً",
            "la": "لا – لا تتوقف",
            "sajda": "سجدة – علامة السجود",
            "hizb": "ربع حزب – علامة الفاصل",
            "madd": "مد – إطالة",
            "jaiz2": "وقف جائز – توقف مفضل",
            "sukun": "سكون – غياب الحركة",
            "shadda": "شدة – تشديد الحرف",
            "alif-wasla": "ألف وصلة – تُلفظ فقط في بداية الجملة",
            "numero": "رقم الآية – نهاية الآية",
            "double-arret": "وقف مزدوج – الخيار للقارئ",
            "idgham": "إدغام شفوي – ن تُدمج في م مع ظهور الميم",
            "fathatan": "فتحتان – حركة مزدوجة 'أن'",
            "kasratan": "كسرتان – حركة مزدوجة 'إن'",
            "dammatan": "ضمتان – حركة مزدوجة 'أُن'",
            "khafiyyah": "ألف خفية – ألف غير مكتوبة"
        }
    };


// Initialisation du menu paramètres
function initSettingsMenuEvents() {
    applyTranslations();
    applyActiveLanguageClass();

    const settingsIcon = document.getElementById("settingsIcon");
    const settingsMenu = document.getElementById("settingsMenu");
    const closeBtn = document.getElementById("closeSettings");
    const darkModeBtn = document.getElementById("darkModeToggle");
    const sepiaModeBtn = document.getElementById("sepiaModeToggle");
    const globeIcon = document.querySelector(".globe");
    const langueMenu = document.querySelector(".langue");

    if (!settingsIcon || !settingsMenu) return;

    // Ouvrir/fermer le menu paramètres
    settingsIcon.onclick = () => {
        settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
    };

    // Fermer le menu paramètres avec la croix
    closeBtn?.addEventListener("click", () => {
        settingsMenu.style.display = "none";
    });

    // Ouvrir/fermer le menu de langue
    globeIcon?.addEventListener("click", () => {
        const isVisible = langueMenu.style.display === "flex";
        langueMenu.style.display = isVisible ? "none" : "flex";
    });

    // Clic en dehors des menus pour les fermer
    document.addEventListener("click", (e) => {
        if (!settingsMenu.contains(e.target) && e.target !== settingsIcon) {
            settingsMenu.style.display = "none";
        }
        if (!langueMenu.contains(e.target) && e.target !== globeIcon) {
            langueMenu.style.display = "none";
        }
    });

    // Sélection du thème
    darkModeBtn?.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "mdinight-blue");
        localStorage.setItem("theme", "midnight-blue");
        darkModeBtn.classList.add("active");
        sepiaModeBtn?.classList.remove("active");
    });

    sepiaModeBtn?.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "mydeen");
        localStorage.setItem("theme", "mydeen");
        sepiaModeBtn.classList.add("active");
        darkModeBtn?.classList.remove("active");
    });

    // Choix de la langue
    document.querySelectorAll(".langue-option").forEach(option => {
        option.addEventListener("click", () => {
            const selectedLang = option.id;
            localStorage.setItem("language", selectedLang);
            applyActiveLanguageClass();
            applyTranslations();
            langueMenu.style.display = "none";
        });
    });
}

// Appliquer la classe active au thème sélectionné
function applyActiveThemeClass() {
    const currentTheme = localStorage.getItem("theme") || "mydeen";
    const darkBtn = document.getElementById("darkModeToggle");
    const sepiaBtn = document.getElementById("sepiaModeToggle");

    darkBtn?.classList.remove("active");
    sepiaBtn?.classList.remove("active");

    if (currentTheme === "midnight-blue") {
        darkBtn?.classList.add("active");
    } else {
        sepiaBtn?.classList.add("active");
    }
}

// Appliquer la classe active à la langue sélectionnée
function applyActiveLanguageClass() {
    const currentLang = localStorage.getItem("language") || "en";

    document.querySelectorAll(".langue-option").forEach(btn => {
        btn.classList.toggle("active", btn.id === currentLang);
    });

    // Style RTL pour l'arabe
    document.body.classList.toggle("arabic", currentLang === "ar");
}

function applyTranslations() {
        const lang = localStorage.getItem("language") || "en";
        const t = translations[lang];

        if (lang === 'ar') {
            document.body.style.fontFamily = 'Uthmani';
            document.body.classList.add('lang-ar'); // ajoute la classe spéciale
        } else {
            document.body.style.fontFamily = '';
            document.body.classList.remove('lang-ar'); // retire la classe si pas arabe
        }

        const elementsToTranslate = [
        { id: 'title', key: 'title' },
        { id: 'settingsTitle', key: 'settings' },
        { id: 'themeLabel', key: 'theme' },
        { id: 'aboutTitle', key: 'aboutTitle' },
        { id: 'aboutText', key: 'aboutText' },
        { id: 'usefulLinks', key: 'usefulLinks' },
        { id: 'alphabetLink', key: 'alphabetLink' },
        { id: 'homeB', key: 'homeB' },
        { id: 'text_header', key: 'text_header'},
        { id: 'titre-waqf-lazim', key: 'waqf-lazim' },
        { id: 'titre-waqf-jaiz', key: 'waqf-jaiz' },
        { id: 'titre-liaison', key: 'liaison' },
        { id: 'titre-saktah', key: 'saktah' },
        { id: 'titre-la', key: 'la' },
        { id: 'titre-sajda', key: 'sajda' },
        { id: 'titre-hizb', key: 'hizb' },
        { id: 'titre-madd', key: 'madd' },
        { id: 'titre-jaiz2', key: 'jaiz2' },
        { id: 'titre-sukun', key: 'sukun' },
        { id: 'titre-shadda', key: 'shadda' },
        { id: 'titre-alif-wasla', key: 'alif-wasla' },
        { id: 'titre-numero', key: 'numero' },
        { id: 'titre-double-arret', key: 'double-arret'},
        { id: 'titre-idgham', key: 'idgham' },
        { id: 'titre-fathatan', key: 'fathatan' },
        { id: 'titre-kasratan', key: 'kasratan' },
        { id: 'titre-dammatan', key: 'dammatan' },
        { id: 'titre-khafiyyah', key: 'khafiyyah' }
        ];

         elementsToTranslate.forEach(({ id, key }) => {
        const el = document.getElementById(id);
        if (el && t[key]) {
            el.textContent = t[key];
        }
    });


        applyActiveLanguageClass();
    }

// Appliquer le thème sauvegardé au chargement
document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "mydeen");

// Initialisation
initSettingsMenuEvents();
