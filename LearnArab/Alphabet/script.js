document.addEventListener("DOMContentLoaded", () => {
    const alphabetSection = document.getElementById("alphabet-section");
    const container = document.createElement("div");
    container.className = "letter-container";
    alphabetSection.appendChild(container); // append in alphabetSection, not body


    const ArabicLetters = [
        { "letter": "أ", "name": "Alif", "translit": "a", "audio": "audio/alif.mp3" },
        { "letter": "ب", "name": "Ba", "translit": "b", "audio": "audio/ba.mp3" },
        { "letter": "ت", "name": "Ta", "translit": "t", "audio": "audio/ta.mp3" },
        { "letter": "ث", "name": "Tha", "translit": "th", "audio": "audio/tha.mp3" },
        { "letter": "ج", "name": "Jim", "translit": "j", "audio": "audio/jim.mp3" },
        { "letter": "ح", "name": "Ha", "translit": "ḥ", "audio": "audio/hha.mp3" },
        { "letter": "خ", "name": "Kha", "translit": "kh", "audio": "audio/kha.mp3" },
        { "letter": "د", "name": "Dal", "translit": "d", "audio": "audio/daal.mp3" },
        { "letter": "ذ", "name": "Dhal", "translit": "dh", "audio": "audio/thaal.mp3" },
        { "letter": "ر", "name": "Ra", "translit": "r", "audio": "audio/ra.mp3" },
        { "letter": "ز", "name": "Zay", "translit": "z", "audio": "audio/zay.mp3" },
        { "letter": "س", "name": "Sin", "translit": "s", "audio": "audio/siin.mp3" },
        { "letter": "ش", "name": "Shin", "translit": "sh", "audio": "audio/shiin.mp3" },
        { "letter": "ص", "name": "Sad", "translit": "ṣ", "audio": "audio/saad.mp3" },
        { "letter": "ض", "name": "Dad", "translit": "ḍ", "audio": "audio/daad.mp3" },
        { "letter": "ط", "name": "Ta'", "translit": "ṭ", "audio": "audio/taa.mp3" },
        { "letter": "ظ", "name": "Zha", "translit": "ẓ", "audio": "audio/thaa.mp3" },
        { "letter": "ع", "name": "Ain", "translit": "ʿ", "audio": "audio/ayn.mp3" },
        { "letter": "غ", "name": "Ghain", "translit": "gh", "audio": "audio/ghayn.mp3" },
        { "letter": "ف", "name": "Fa", "translit": "f", "audio": "audio/fa.mp3" },
        { "letter": "ق", "name": "Qaf", "translit": "q", "audio": "audio/qaf.mp3" },
        { "letter": "ك", "name": "Kaf", "translit": "k", "audio": "audio/kaf.mp3" },
        { "letter": "ل", "name": "Lam", "translit": "l", "audio": "audio/lam.mp3" },
        { "letter": "م", "name": "Mim", "translit": "m", "audio": "audio/mim.mp3" },
        { "letter": "ن", "name": "Nun", "translit": "n", "audio": "audio/nuun.mp3" },
        { "letter": "هـ", "name": "Ha'", "translit": "h", "audio": "audio/ha.mp3" },
        { "letter": "و", "name": "Waw", "translit": "w", "audio": "audio/waw.mp3" },
        { "letter": "ي", "name": "Ya", "translit": "y", "audio": "audio/ya.mp3" }
    ];

    ArabicLetters.forEach(item => {
        const letterDiv = document.createElement("div");
        letterDiv.className = "letter-box";

        letterDiv.innerHTML = `
            <div class = "Len">
                <div class="letter">${item.letter}</div>
                <div class="name">${item.name}</div>
            </div>
            <div class = "audioPart">
                <img src = "../../images/speaker-none.svg" class = "megaphone">
            </div>
        `;

        container.appendChild(letterDiv);

        const megaphone = letterDiv.querySelector(".megaphone"); 
        const audio = new Audio(item.audio);

        megaphone.addEventListener("click", () => {
            megaphone.src = "../../images/speaker-high.svg";
            audio.currentTime = 0;
            audio.play();
        });

        audio.addEventListener("ended", () => {
            megaphone.src = "../../images/speaker-none.svg";
        });
    });
});


    const placeSection = document.getElementById("place-letter");
    const letterData = [
        {
            base: "ا",
            name: "Alif",
            forms: { isolated: "ا", initial: "ا", medial: "ـا", final: "ـا" }
        },
        {
            base: "ب",
            name: "Ba",
            forms: { isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب" }
        },
        {
            base: "ت",
            name: "Ta",
            forms: { isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت" }
        },
        {
            base: "ث",
            name: "Tha",
            forms: { isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث" }
        },
        {
            base: "ج",
            name: "Jim",
            forms: { isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج" }
        },
        {
            base: "ح",
            name: "Ha",
            forms: { isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح" }
        },
        {
            base: "خ",
            name: "Kha",
            forms: { isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ" }
        },
        {
            base: "د",
            name: "Dal",
            forms: { isolated: "د", initial: "د", medial: "ـد", final: "ـد" }
        },
        {
            base: "ذ",
            name: "Dhal",
            forms: { isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ" }
        },
        {
            base: "ر",
            name: "Ra",
            forms: { isolated: "ر", initial: "ر", medial: "ـر", final: "ـر" }
        },
        {
            base: "ز",
            name: "Zay",
            forms: { isolated: "ز", initial: "ز", medial: "ـز", final: "ـز" }
        },
        {
            base: "س",
            name: "Sin",
            forms: { isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس" }
        },
        {
            base: "ش",
            name: "Shin",
            forms: { isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش" }
        },
        {
            base: "ص",
            name: "Sad",
            forms: { isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص" }
        },
        {
            base: "ض",
            name: "Dad",
            forms: { isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض" }
        },
        {
            base: "ط",
            name: "Taʼ",
            forms: { isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط" }
        },
        {
            base: "ظ",
            name: "Zah",
            forms: { isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ" }
        },
        {
            base: "ع",
            name: "Ain",
            forms: { isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع" }
        },
        {
            base: "غ",
            name: "Ghain",
            forms: { isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ" }
        },
        {
            base: "ف",
            name: "Fa",
            forms: { isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف" }
        },
        {
            base: "ق",
            name: "Qaf",
            forms: { isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق" }
        },
        {
            base: "ك",
            name: "Kaf",
            forms: { isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك" }
        },
        {
            base: "ل",
            name: "Lam",
            forms: { isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل" }
        },
        {
            base: "م",
            name: "Mim",
            forms: { isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم" }
        },
        {
            base: "ن",
            name: "Nun",
            forms: { isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن" }
        },
        {
            base: "هـ",
            name: "Haʼ",
            forms: { isolated: "هـ", initial: "هـ", medial: "ـهـ", final: "ـه" }
        },
        {
            base: "و",
            name: "Waw",
            forms: { isolated: "و", initial: "و", medial: "ـو", final: "ـو" }
        },
        {
            base: "ي",
            name: "Ya",
            forms: { isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي" }
        }
    ];


    const letterTitle = document.createElement("h2");
    letterTitle.id = 'letterTitle'
    letterTitle.textContent = "Formes des lettres selon leur position";

    const SousTitre = document.createElement('p')
    SousTitre.id = "SousTitre"
    SousTitre.textContent = "En effet, en arabe chaque lettre a 4 façon d'être écrite en fonction de si elle est placée seul, au début, au milieu ou a la fin d'un mot"

    placeSection.appendChild(letterTitle);
    placeSection.appendChild(SousTitre)

    const table = document.createElement("table");
    table.className = "form-table";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th id="th_lettre">Lettre</th>
        <th id="th_nom">Nom</th>
        <th id="th_isolee">Isolée</th>
        <th id="th_initiale">Initiale</th>
        <th id="th_milieu">Milieu</th>
        <th id="th_finale">Finale</th>`;

    table.appendChild(headerRow);

    letterData.forEach(letter => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="letter">${letter.base}</td>
            <td>${letter.name}</td>
            <td>${letter.forms.isolated}</td>
            <td>${letter.forms.initial}</td>
            <td>${letter.forms.medial}</td>
            <td>${letter.forms.final}</td>
        `;
        table.appendChild(row);
    });

    placeSection.appendChild(table);

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
            title: "MyDeen - Alphabet",
            settings: "Settings",
            theme: "Theme",
            aboutTitle: "About",
            aboutText: "Educational app dedicated to learning the Arabic alphabet and the Quran.",
            usefulLinks: "Useful Links",
            signesBtn: "Stopping and Linking Signs in the Quran",
            homeB: "Home",
            text_header: "Arabic Alphabet",
            th_lettre: "Letter",
            th_nom: "Name",
            th_isolee: "Isolated",
            th_initiale: "Initial",
            th_milieu: "Medial",
            th_finale: "Final",
            letter_title: "Letter shapes according to their position",
            letter_subtitle: "In Arabic, each letter has 4 different forms depending on whether it appears alone, at the beginning, in the middle, or at the end of a word.",
        },
        fr: {
            title: "MyDeen - Alphabet",
            settings: "Paramètres",
            theme: "Thème",
            aboutTitle: "À propos",
            aboutText: "Application éducative dédiée à l'apprentissage de l'alphabet arabe et du Coran.",
            usefulLinks: "Liens utiles",
            signesBtn: "Les Signes d'arrêt et de liaison du Quran",
            homeB: "Page d'acceuil",
            text_header: "Alphabet arabe",
            th_lettre: "Lettre",
            th_nom: "Nom",
            th_isolee: "Isolée",
            th_initiale: "Initiale",
            th_milieu: "Milieu",
            th_finale: "Finale",
            letter_title: "Formes des lettres selon leur position",
            letter_subtitle: "En effet, en arabe chaque lettre a 4 façons d'être écrite en fonction de si elle est placée seule, au début, au milieu ou à la fin d'un mot.",
        },
        de: {
            title: "MyDeen – Alphabet",
            settings: "Einstellungen",
            theme: "Thema",
            aboutTitle: "Über uns",
            aboutText: "Bildungs-App zum Erlernen des arabischen Alphabets und des Korans.",
            usefulLinks: "Nützliche Links",
            signesBtn: "Stopp- und Verbindungszeichen im Koran",
            homeB: "Startseite",
            text_header: "Arabisches Alphabet",
            th_lettre: "Buchstabe",
            th_nom: "Name",
            th_isolee: "Isoliert",
            th_initiale: "Initial",
            th_milieu: "Mitte",
            th_finale: "Final",
            letter_title: "Buchstabenformen je nach Position",
            letter_subtitle: "Im Arabischen hat jeder Buchstabe vier verschiedene Formen, je nachdem, ob er allein steht, am Anfang, in der Mitte oder am Ende eines Wortes vorkommt."
        },
        es: {
            title: "MyDeen - Alfabeto",
            settings: "Configuraciones",
            theme: "Tema",
            aboutTitle: "Acerca de",
            aboutText: "Aplicación educativa dedicada al aprendizaje del alfabeto árabe y del Corán.",
            usefulLinks: "Enlaces útiles",
            signesBtn: "Signos de parada y enlace en el Corán",
            homeB: "Inicio",
            text_header: "Alfabeto árabe",
            th_lettre: "Letra",
            th_nom: "Nombre",
            th_isolee: "Aislada",
            th_initiale: "Inicial",
            th_milieu: "Medial",
            th_finale: "Final",
            letter_title: "Formas de las letras según su posición",
            letter_subtitle: "En árabe, cada letra tiene 4 formas distintas dependiendo de si aparece sola, al inicio, en el medio o al final de una palabra."
        },
        it: {
            title: "MyDeen - Alfabeto",
            settings: "Impostazioni",
            theme: "Tema",
            aboutTitle: "Informazioni",
            aboutText: "Applicazione educativa dedicata all'apprendimento dell'alfabeto arabo e del Corano.",
            usefulLinks: "Link utili",
            signesBtn: "Segni di arresto e collegamento nel Corano",
            homeB: "Home",
            text_header: "Alfabeto arabo",
            th_lettre: "Lettera",
            th_nom: "Nome",
            th_isolee: "Isolata",
            th_initiale: "Iniziale",
            th_milieu: "Mediana",
            th_finale: "Finale",
            letter_title: "Forme delle lettere in base alla posizione",
            letter_subtitle: "In arabo, ogni lettera ha 4 forme diverse a seconda che si trovi da sola, all'inizio, nel mezzo o alla fine di una parola." 
        },
        pt: {
            title: "MyDeen - Alfabeto",
            settings: "Configurações",
            theme: "Tema",
            aboutTitle: "Sobre",
            aboutText: "Aplicativo educativo dedicado ao aprendizado do alfabeto árabe e do Alcorão.",
            usefulLinks: "Links úteis",
            signesBtn: "Sinais de parada e ligação no Alcorão", 
            homeB: "Início",
            text_header: "Alfabeto árabe",
            th_lettre: "Letra",
            th_nom: "Nome",
            th_isolee: "Isolada",
            th_initiale: "Inicial",
            th_milieu: "Meio",
            th_finale: "Final",
            letter_title: "Formas das letras conforme a posição",
            letter_subtitle: "De fato, no árabe cada letra tem 4 formas diferentes dependendo se está sozinha, no início, no meio ou no final de uma palavra."
        },
        tr: {
            title: "MyDeen - Alfabe",
            settings: "Ayarlar",
            theme: "Tema",
            aboutTitle: "Hakkında",
            aboutText: "Arap alfabesi ve Kur'an öğrenimine adanmış eğitim uygulaması.",
            usefulLinks: "Faydalı bağlantılar",
            signesBtn: "Kur'an'daki Durdurma ve Bağlama İşaretleri",
            homeB: "Ana Sayfa",
            text_header: "Arap alfabesi",
            th_lettre: "Harf",
            th_nom: "İsim",
            th_isolee: "Ayrık",
            th_initiale: "Başta",
            th_milieu: "Ortada",
            th_finale: "Sonda",
            letter_title: "Harflerin konumlarına göre şekilleri",
            letter_subtitle: "Arapçada her harf, kelimenin başında, ortasında, sonunda veya tek başına olmasına göre 4 farklı şekilde yazılır."
        },
        ar: {
            title: "ماي دين - الحروف",
            settings: "الإعدادات",
            theme: "المظهر",
            aboutTitle: "حول التطبيق",
            aboutText: "تطبيق تعليمي مخصص لتعلم الحروف العربية والقرآن الكريم.",
            usefulLinks: "روابط مفيدة",
            signesBtn: "علامات الوقف والوصل في القرآن",
            homeB: "الصفحة الرئيسية",
            text_header: "الحروف العربية",
            th_lettre: "الحرف",
            th_nom: "الاسم",
            th_isolee: "منفصل",
            th_initiale: "أولي",
            th_milieu: "وسطي",
            th_finale: "نهائي",
            letter_title: "أشكال الحروف حسب موقعها",
            letter_subtitle: "في اللغة العربية، لكل حرف أربعة أشكال مختلفة حسب موقعه: منفصل، في البداية، في الوسط، أو في نهاية الكلمة.",        
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
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        darkModeBtn.classList.add("active");
        sepiaModeBtn?.classList.remove("active");
    });

    sepiaModeBtn?.addEventListener("click", () => {
        document.documentElement.setAttribute("data-theme", "sepia");
        localStorage.setItem("theme", "sepia");
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
    const currentTheme = localStorage.getItem("theme") || "sepia";
    const darkBtn = document.getElementById("darkModeToggle");
    const sepiaBtn = document.getElementById("sepiaModeToggle");

    darkBtn?.classList.remove("active");
    sepiaBtn?.classList.remove("active");

    if (currentTheme === "dark") {
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
        if (lang === 'ar') {
            document.body.style.fontFamily = 'Uthmani';
            document.body.classList.add('lang-ar'); // ajoute la classe spéciale
        } else {
            document.body.style.fontFamily = '';
            document.body.classList.remove('lang-ar'); // retire la classe si pas arabe
        }

        const t = translations[lang];

        const PageTitle = document.getElementById('title')
        if (PageTitle) PageTitle.textContent = t.title
    
        const settingsTitle = document.getElementById("settingsTitle");
        if (settingsTitle) settingsTitle.textContent = t.settings;
    
        const themeLabel = document.getElementById("themeLabel");
        if (themeLabel) themeLabel.textContent = t.theme;
    
        const aboutTitle = document.getElementById('aboutTitle')
        if (aboutTitle) aboutTitle.textContent = t.aboutTitle

        const aboutText = document.getElementById('aboutText')
        if (aboutText) aboutText.textContent = t.aboutText

        const usefulLinks = document.getElementById('usefulLinks')
        if (usefulLinks) usefulLinks.textContent = t.usefulLinks

        const alphabetLink = document.getElementById('alphabetLink')
        if (alphabetLink) alphabetLink.textContent = t.alphabetLink

        const HomeLink = document.getElementById('homeB')
        if (HomeLink) HomeLink.textContent = t.homeB

        const signesBtn = document.getElementById("signesBtn");
        if (signesBtn) signesBtn.textContent = t.signesBtn;

        const text_header = document.getElementById('text_header')
        if (text_header) text_header.textContent = t.text_header

        const th_lettre = document.getElementById('th_lettre');
        if (th_lettre) th_lettre.innerHTML = t.th_lettre;

        const th_nom = document.getElementById('th_nom');
        if (th_nom) th_nom.innerHTML = t.th_nom;

        const th_isolee = document.getElementById('th_isolee');
        if (th_isolee) th_isolee.innerHTML = t.th_isolee;

        const th_initiale = document.getElementById('th_initiale');
        if (th_initiale) th_initiale.innerHTML = t.th_initiale;

        const th_milieu = document.getElementById('th_milieu');
        if (th_milieu) th_milieu.innerHTML = t.th_milieu;

        const th_finale = document.getElementById('th_finale');
        if (th_finale) th_finale.innerHTML = t.th_finale;

        const letterTitle = document.getElementById("letterTitle");
        if (letterTitle) letterTitle.textContent = t.letter_title

        const SousTitre =document.getElementById("SousTitre");
        if (SousTitre) SousTitre.textContent = t.letter_subtitle

        applyActiveLanguageClass();
    }

// Appliquer le thème sauvegardé au chargement
document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "sepia");

// Initialisation
initSettingsMenuEvents();

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
