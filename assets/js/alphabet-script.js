document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "midnight-blue");
    const alphabetSection = document.getElementById("alphabet-section");
    const container = document.createElement("div");
    container.className = "letter-container";
    alphabetSection.appendChild(container); // append in alphabetSection, not body


    const ArabicLetters = [
        { "letter": "أ", "name": "Alif", "translit": "a", "audio": "../../../assets/alphabet_audio/alif.mp3" },
        { "letter": "ب", "name": "Ba", "translit": "b", "audio": "../../../assets/alphabet_audio/ba.mp3" },
        { "letter": "ت", "name": "Ta", "translit": "t", "audio": "../../../assets/alphabet_audio/ta.mp3" },
        { "letter": "ث", "name": "Tha", "translit": "th", "audio": "../../../assets/alphabet_audio/tha.mp3" },
        { "letter": "ج", "name": "Jim", "translit": "j", "audio": "../../../assets/alphabet_audio/jim.mp3" },
        { "letter": "ح", "name": "Ha", "translit": "ḥ", "audio": "../../../assets/alphabet_audio/hha.mp3" },
        { "letter": "خ", "name": "Kha", "translit": "kh", "audio": "../../../assets/alphabet_audio/kha.mp3" },
        { "letter": "د", "name": "Dal", "translit": "d", "audio": "../../../assets/alphabet_audio/daal.mp3" },
        { "letter": "ذ", "name": "Dhal", "translit": "dh", "audio": "../../../assets/alphabet_audio/thaal.mp3" },
        { "letter": "ر", "name": "Ra", "translit": "r", "audio": "../../../assets/alphabet_audio/ra.mp3" },
        { "letter": "ز", "name": "Zay", "translit": "z", "audio": "../../../assets/alphabet_audio/zay.mp3" },
        { "letter": "س", "name": "Sin", "translit": "s", "audio": "../../../assets/alphabet_audio/siin.mp3" },
        { "letter": "ش", "name": "Shin", "translit": "sh", "audio": "../../../assets/alphabet_audio/shiin.mp3" },
        { "letter": "ص", "name": "Sad", "translit": "ṣ", "audio": "../../../assets/alphabet_audio/saad.mp3" },
        { "letter": "ض", "name": "Dad", "translit": "ḍ", "audio": "../../../assets/alphabet_audio/daad.mp3" },
        { "letter": "ط", "name": "Ta'", "translit": "ṭ", "audio": "../../../assets/alphabet_audio/taa.mp3" },
        { "letter": "ظ", "name": "Zha", "translit": "ẓ", "audio": "../../../assets/alphabet_audio/thaa.mp3" },
        { "letter": "ع", "name": "Ain", "translit": "ʿ", "audio": "../../../assets/alphabet_audio/ayn.mp3" },
        { "letter": "غ", "name": "Ghain", "translit": "gh", "audio": "../../../assets/alphabet_audio/ghayn.mp3" },
        { "letter": "ف", "name": "Fa", "translit": "f", "audio": "../../../assets/alphabet_audio/fa.mp3" },
        { "letter": "ق", "name": "Qaf", "translit": "q", "audio": "../../../assets/alphabet_audio/qaf.mp3" },
        { "letter": "ك", "name": "Kaf", "translit": "k", "audio": "../../../assets/alphabet_audio/kaf.mp3" },
        { "letter": "ل", "name": "Lam", "translit": "l", "audio": "../../../assets/alphabet_audio/lam.mp3" },
        { "letter": "م", "name": "Mim", "translit": "m", "audio": "../../../assets/alphabet_audio/mim.mp3" },
        { "letter": "ن", "name": "Nun", "translit": "n", "audio": "../../../assets/alphabet_audio/nuun.mp3" },
        { "letter": "هـ", "name": "Ha'", "translit": "h", "audio": "../../../assets/alphabet_audio/ha.mp3" },
        { "letter": "و", "name": "Waw", "translit": "w", "audio": "../../../assets/alphabet_audio/waw.mp3" },
        { "letter": "ي", "name": "Ya", "translit": "y", "audio": "../../../assets/alphabet_audio/ya.mp3" }
    ];

    const lang = document.documentElement.lang; // Récupère la langue depuis <html lang="...">

    // Définis les bons chemins selon la langue
    const imagePath = lang === "en" 
        ? "../../assets/images/" 
        : "../../../assets/images/";

    const audioPath = lang === "en"
        ? "../../assets/alphabet_audio/" // dossier spécifique pour anglais
        : "../../../assets/alphabet_audio/";

    ArabicLetters.forEach(item => {
    const letterDiv = document.createElement("div");
    letterDiv.className = "letter-box";

    letterDiv.innerHTML = `
        <div class="Len">
            <div class="letter">${item.letter}</div>
            <div class="name">${item.name}</div>
        </div>
        <div class="audioPart">
            <img src="${imagePath}speaker-none.svg" class="megaphone" alt="Play audio">
        </div>
    `;

    container.appendChild(letterDiv);

    const megaphone = letterDiv.querySelector(".megaphone");

    const filename = item.audio.split("/").pop();
    const audio = new Audio(audioPath + filename);
    audio.preload = "auto";

    // Variable pour savoir si l'audio est prêt à jouer
    let audioReady = false;

    // Charger l'audio et déclencher un flag quand prêt
    audio.addEventListener('canplaythrough', () => {
        audioReady = true;
    }, { once: true });

    audio.addEventListener("ended", () => {
        megaphone.src = `${imagePath}speaker-none.svg`;
    });

    megaphone.addEventListener("click", () => {
        // Si l'audio est déjà en train de jouer, on le stoppe pour relancer
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }

        megaphone.src = `${imagePath}speaker-high.svg`;

        if (audioReady) {
            audio.currentTime = 0;
            audio.play();
        } else {
            // On force la lecture uniquement quand l'audio est prêt
            const playWhenReady = () => {
                audio.currentTime = 0;
                audio.play();
            };
            audio.addEventListener('canplaythrough', () => {
                audioReady = true;
                playWhenReady();
            }, { once: true });
            // Pour forcer le chargement
            audio.load();
        }
    });
});


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

    const placeSection = document.getElementById("place-letter");

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
            th_lettre: "Letter",
            th_nom: "Name",
            th_isolee: "Isolated",
            th_initiale: "Initial",
            th_milieu: "Medial",
            th_finale: "Final",
        },
        fr: {
            th_lettre: "Lettre",
            th_nom: "Nom",
            th_isolee: "Isolée",
            th_initiale: "Initiale",
            th_milieu: "Milieu",
            th_finale: "Finale",
        },
        de: {
            th_lettre: "Buchstabe",
            th_nom: "Name",
            th_isolee: "Isoliert",
            th_initiale: "Initial",
            th_milieu: "Mitte",
            th_finale: "Final",
        },
        es: {
            th_lettre: "Letra",
            th_nom: "Nombre",
            th_isolee: "Aislada",
            th_initiale: "Inicial",
            th_milieu: "Medial",
            th_finale: "Final",
        },
        it: {
            th_lettre: "Lettera",
            th_nom: "Nome",
            th_isolee: "Isolata",
            th_initiale: "Iniziale",
            th_milieu: "Mediana",
            th_finale: "Finale",
        },
        pt: {
            th_lettre: "Letra",
            th_nom: "Nome",
            th_isolee: "Isolada",
            th_initiale: "Inicial",
            th_milieu: "Meio",
            th_finale: "Final",
        },
        tr: {
            th_lettre: "Harf",
            th_nom: "İsim",
            th_isolee: "Ayrık",
            th_initiale: "Başta",
            th_milieu: "Ortada",
            th_finale: "Sonda",
        },
    };

// Appliquer la classe active à la langue sélectionnée
function applyActiveLanguageClass() {

    const currentLang = document.documentElement.lang || "en";
    document.querySelectorAll(".langue-option").forEach(btn => {
        btn.classList.toggle("active", btn.id === currentLang);
    });

}

function applyTranslations() {
        const lang = document.documentElement.lang || "en";
        const t = translations[lang];

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

    }

function applyActiveThemeClass() {
        const currentTheme = localStorage.getItem("theme") || "midnight-blue";
        const darkBtn = document.getElementById("darkModeToggle");
        const lightBtn = document.getElementById("sepiaModeToggle");

        darkBtn?.classList.remove("active");
        lightBtn?.classList.remove("active");

        if (currentTheme === "midnight-blue") {
            darkBtn?.classList.add("active");
        } else if (currentTheme === "mydeen") {
            lightBtn?.classList.add("active");
        }
    }


    const savedTheme = localStorage.getItem("theme") || "midnight-blue";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const langueMenu = document.querySelector(".langue");   
    const globeIcon = document.querySelector(".globe"); 

    // Toggle l'affichage du menu langue
    globeIcon.addEventListener("click", () => {
        const isVisible = langueMenu.style.display === "flex";
        langueMenu.style.display = isVisible ? "none" : "flex";
    });

    // Initialiser les événements du menu paramètres
    initSettingsMenuEvents();

    function initSettingsMenuEvents() {
        applyActiveThemeClass();
        applyTranslations();
        applyActiveLanguageClass();

        const settingsIcon = document.getElementById("settingsIcon");
        const settingsMenu = document.getElementById("settingsMenu");
        const closeBtn = document.getElementById("closeSettings");
        const darkModeBtn = document.getElementById("darkModeToggle");
        const lightModeBtn = document.getElementById("sepiaModeToggle");
        const langueOptions = document.querySelectorAll(".langue-option");

        document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "midnight-blue");

        if (!settingsIcon || !settingsMenu) return;

        // Ouvrir / fermer le menu paramètres
        settingsIcon.onclick = () => {
            settingsMenu.style.display = settingsMenu.style.display === "flex" ? "none" : "flex";
        };

        // Fermer avec la croix
        if (closeBtn) {
            closeBtn.onclick = () => {
                settingsMenu.style.display = "none";
            };
        }

        const globeIcon = document.querySelector(".globe");
        const langueMenu = document.querySelector(".langue");


        // Thème sombre
        if (darkModeBtn) {
            darkModeBtn.onclick = () => {
                document.documentElement.setAttribute("data-theme", "midnight-blue");
                darkModeBtn.classList.add("active");
                lightModeBtn.classList.remove("active");
                localStorage.setItem("theme", "midnight-blue");
            };
        }

        // Thème clair/sepia
        if (lightModeBtn) {
            lightModeBtn.onclick = () => {
                document.documentElement.setAttribute("data-theme", "mydeen");
                darkModeBtn.classList.remove("active");
                lightModeBtn.classList.add("active");
                localStorage.setItem("theme", "mydeen");
            };
        }

        // Fermer si clic à l’extérieur du menu
        document.addEventListener("click", (e) => {
            if (!settingsMenu.contains(e.target) && e.target !== settingsIcon) {
                settingsMenu.style.display = "none";
            }
            if (!langueMenu.contains(e.target) && e.target !== globeIcon) {
                langueMenu.style.display = "none";
            }
        });

        const currentLang = document.documentElement.getAttribute("lang") || "en";

        // Met à jour l'option active dans l'UI
        langueOptions.forEach(opt => {
            opt.classList.toggle("active", opt.id === currentLang);
        });

        langueOptions.forEach(option => {
            option.addEventListener("click", () => {
                const selectedLang = option.id;

                // Si on reclique sur la langue actuelle, on ne fait rien
                if (selectedLang === currentLang) return;

                // Stocke la langue dans localStorage
                localStorage.setItem("langue", selectedLang);

                // Mise à jour visuelle
                langueOptions.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");

                langueMenu.style.display = "none"; // Ferme le menu langue

                // Vérifie si on est déjà dans un dossier de langue (fr/, ar/, etc.)
                const isInLangFolder = /\/(fr|ar|es|it|de|pt|tr)\//.test(window.location.pathname);

                let redirectPath = "";

                if (selectedLang === "en") {
                    // Redirige vers la racine si langue sélectionnée est l'anglais
                    redirectPath = isInLangFolder
                        ? `../../../arab/alphabet/alphabet.html`
                        : `../../arab/alphabet/alphabet.html`;
                } else {
                    // Redirige vers un dossier langue si on passe en fr, ar, etc.
                    redirectPath = isInLangFolder
                        ? `../../../${selectedLang}/arab/alphabet/alphabet.html`
                        : `../../${selectedLang}/arab/alphabet/alphabet.html`;
                }

                window.location.href = redirectPath;
            });
        });
    }

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
});