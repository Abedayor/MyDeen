document.addEventListener("DOMContentLoaded", () => {
    initSettingsMenuEvents();
    const topBar = document.querySelector(".top-bar");
    const souratesContainer = document.querySelector(".sourates");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.querySelector(".no-results");

    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "mydeen");

    // --- GESTION DES LANGUES ---
    const translations = {
        en: {
            settings: "Settings",
            theme: "Theme",
            searchPlaceholder: "Search for a surah...",
            noResults: "No surah found.",
            signesBtn: "Stopping and Linking Signs in the Quran",
            'play-audio-btn': "Play Audio",
            "play-audio-btn-paused": "Pause Audio",
            aboutTitle: "About",
            aboutText: "Educational app dedicated to learning the Arabic alphabet and the Quran.",
            usefulLinks: "Useful Links",
            alphabetLink: "Alphabet",
            aTranslation: `Translation by`
        },
        fr: {
            settings: "Paramètres",
            theme: "Thème",
            searchPlaceholder: "Rechercher une sourate...",
            noResults: "Aucune sourate trouvée.",
            signesBtn: "Les Signes d'arrêt et de liaison du Quran",
            'play-audio-btn': "Lire le son",
            "play-audio-btn-paused": "Arrêter le son",
            aboutTitle: "À propos",
            aboutText: "Application éducative dédiée à l'apprentissage de l'alphabet arabe et du Coran.",
            usefulLinks: "Liens utiles",
            alphabetLink: "Alphabet",
            aTranslation: `Traduction de`
        },
        de: {
            settings: "Einstellungen",
            theme: "Thema",
            searchPlaceholder: "Nach einer Sure suchen...",
            noResults: "Keine Sure gefunden.",
            signesBtn: "Stopp- und Verbindungszeichen im Koran",
            'play-audio-btn': "Audio abspielen",
            "play-audio-btn-paused": "Audio pausieren",
            aboutTitle: "Über uns",
            aboutText: "Bildungs-App zum Erlernen des arabischen Alphabets und des Korans.",
            usefulLinks: "Nützliche Links",
            alphabetLink: "Alphabet",
            aTranslation: `Übersetzung von`
        },
        es: {
            settings: "Configuraciones",
            theme: "Tema",
            searchPlaceholder: "Buscar una sura...",
            noResults: "No se encontró ninguna sura.",
            signesBtn: "Signos de parada y enlace en el Corán",
            'play-audio-btn': "Reproducir audio",
            "play-audio-btn-paused": "Pausar audio",
            aboutTitle: "Acerca de",
            aboutText: "Aplicación educativa dedicada al aprendizaje del alfabeto árabe y del Corán.",
            usefulLinks: "Enlaces útiles",
            alphabetLink: "Alfabeto",
            aTranslation: `Traducción de`
        },
        it: {
            settings: "Impostazioni",
            theme: "Tema",
            searchPlaceholder: "Cerca una sura...",
            noResults: "Nessuna sura trovata.",
            signesBtn: "Segni di arresto e collegamento nel Corano",
            'play-audio-btn': "Riproduci audio",
            "play-audio-btn-paused": "Pausa audio",
            aboutTitle: "Informazioni",
            aboutText: "Applicazione educativa dedicata all'apprendimento dell'alfabeto arabo e del Corano.",
            usefulLinks: "Link utili",
            alphabetLink: "Alfabeto",
            aTranslation: `Traduzione di`
        },
        pt: {
            settings: "Configurações",
            theme: "Tema",
            searchPlaceholder: "Pesquisar uma sura...",
            noResults: "Nenhuma sura encontrada.",
            signesBtn: "Sinais de parada e ligação no Alcorão", 
            'play-audio-btn': "Reproduzir áudio",
            "play-audio-btn-paused": "Pausar áudio",
            aboutTitle: "Sobre",
            aboutText: "Aplicativo educativo dedicado ao aprendizado do alfabeto árabe e do Alcorão.",
            usefulLinks: "Links úteis",
            alphabetLink: "Alfabeto",
            aTranslation: `Tradução de`
        },
        tr: {
            settings: "Ayarlar",
            theme: "Tema",
            searchPlaceholder: "Bir sure arayın...",
            noResults: "Hiçbir sure bulunamadı.",
            signesBtn: "Kur'an'daki Durdurma ve Bağlama İşaretleri",
            'play-audio-btn': "Sesli dinle",
            "play-audio-btn-paused": "Sesli dinle durdur",
            aboutTitle: "Hakkında",
            aboutText: "Arap alfabesi ve Kur'an öğrenimine adanmış eğitim uygulaması.",
            usefulLinks: "Faydalı bağlantılar",
            alphabetLink: "Alfabe",
            aTranslation: `tarafından çeviri`
        },
        ar: {
            settings: "الإعدادات",
            theme: "المظهر",
            searchPlaceholder: "ابحث عن سورة...",
            noResults: "لم يتم العثور على أي سورة.",
            signesBtn: "علامات الوقف والوصل في القرآن",
            'play-audio-btn': "تشغيل الصوت",
            "play-audio-btn-paused": "إيقاف الصوت",
            aboutTitle: "حول التطبيق",
            aboutText: "تطبيق تعليمي مخصص لتعلم الحروف العربية والقرآن الكريم.",
            usefulLinks: "روابط مفيدة",
            alphabetLink: "الحروف",
            aTranslation: `ترجمة`
        }
    };


    function applyTranslations() {
        const lang = localStorage.getItem("language") || "en";
        const t = translations[lang];

        if (lang === 'ar') {
            document.body.style.fontFamily = 'Uthmani';
            document.body.classList.add('lang-ar');
        } else {
            document.body.style.fontFamily = '';
            document.body.classList.remove('lang-ar');
        }
    
        const settingsTitle = document.getElementById("settingsTitle");
        if (settingsTitle) settingsTitle.textContent = t.settings;
    
        const themeLabel = document.getElementById("themeLabel");
        if (themeLabel) themeLabel.textContent = t.theme;
    
        const searchInput = document.getElementById("searchInput");
        if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    
        const signesBtn = document.getElementById("signesBtn");
        if (signesBtn) signesBtn.textContent = t.signesBtn;
    
        const noResults = document.getElementById("noResults");
        if (noResults) noResults.textContent = t.noResults;

        const aboutTitle = document.getElementById('aboutTitle')
        if (aboutTitle) aboutTitle.textContent = t.aboutTitle

        const aboutText = document.getElementById('aboutText')
        if (aboutText) aboutText.textContent = t.aboutText

        const usefulLinks = document.getElementById('usefulLinks')
        if (usefulLinks) usefulLinks.textContent = t.usefulLinks

        const alphabetLink = document.getElementById('alphabetLink')
        if (alphabetLink) alphabetLink.textContent = t.alphabetLink

        const ActualTranslation = document.getElementById('aTranslation')
        if (ActualTranslation) ActualTranslation.textContent = t.aTranslation

        fetchChapters(lang);    
        applyActiveLanguageClass();
    }
    

    function applyActiveLanguageClass() {
        const currentLang = localStorage.getItem("language") || "en";
        document.querySelectorAll(".langue-option").forEach(btn => {
            btn.classList.remove("active");
            if (btn.id === currentLang) {
                btn.classList.add("active");
            }
            if (currentLang === "ar") {
                document.body.classList.add("arabic"); // Ajouter une classe pour le style
            } else {  
                document.body.classList.remove("arabic"); // Retirer la classe si ce n'est pas l'arabe
            }   
        });
    }

    // --- INIT ---
    applyTranslations();
    initLanguageEvents();               


    function applyActiveThemeClass() {
        const currentTheme = localStorage.getItem("theme") || "mydeen";
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

    const savedTheme = localStorage.getItem("theme") || "mydeen";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const globeIcon = document.querySelector(".globe");
        const langueMenu = document.querySelector(".langue");

        // Toggle l'affichage du menu langue
        globeIcon.addEventListener("click", () => {
            const isVisible = langueMenu.style.display === "flex";
            langueMenu.style.display = isVisible ? "none" : "flex";
        });

    // Initialiser les événements du menu paramètres
    initSettingsMenuEvents();

    function initLanguageEvents() {
        document.querySelectorAll(".langue-option").forEach(div => {
            div.addEventListener("click", function () {
                const lang = this.id;
                localStorage.setItem("language", lang);
                applyTranslations();
            });
        });
    }

    function initSettingsMenuEvents() {
        applyActiveThemeClass(); 
        applyActiveLanguageClass();
        const settingsIcon = document.getElementById("settingsIcon");
        const settingsMenu = document.getElementById("settingsMenu");
        const closeBtn = document.getElementById("closeSettings");
        const darkModeBtn = document.getElementById("darkModeToggle");
        const lightModeBtn = document.getElementById("sepiaModeToggle");
        const langueOptions = document.querySelectorAll(".langue-option");
    
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

        // Toggle l'affichage du menu langue
        globeIcon.addEventListener("click", () => {
            const isVisible = langueMenu.style.display === "flex";
            langueMenu.style.display = isVisible ? "none" : "flex";
        });

    
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
    
        // Sélection de langue
        langueOptions.forEach(option => {
            option.addEventListener("click", () => {
                const selectedLang = option.id;
                localStorage.setItem("langue", selectedLang);
    
                langueOptions.forEach(opt => opt.classList.remove("active"));
                option.classList.add("active");

                langueMenu.style.display = "none"; // Ferme le menu après sélection
            });
        });
    }    
    // --- VARIABLES GLOBALES ---
    let allSurahs = [];
    let currentSurah = null;

    function normalizeString(str) {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")  // Retirer les accents
            .replace(/[\u2018\u2019]/g, "'")  // Remplacer les apostrophes typographiques
            .replace(/\s+/g, "-")             // Remplacer les espaces par des tirets
            .toLowerCase();                  // Convertir en minuscule pour la comparaison insensible à la casse
    }

    searchInput.addEventListener("input", () => {
        if (lang === 'ar'){
             const val = normalizeString(searchInput.value);  // Normalisation de la recherche
            let found = false;
        
            document.querySelectorAll(".surah-arabic").forEach(card => {
                const nameArabic = normalizeString(card.querySelector(".name-arabic-surah")?.textContent || "");
                if (
                    nameArabic.includes(val) 
                ) {
                    card.style.display = "";
                    found = true;
                } else {
                    card.style.display = "none";
                }
        
            // Affiche le message 'Aucun résultat' si rien trouvé
                noResults.style.display = found ? "none" : "block";
            });
        }
        else{
            const val = normalizeString(searchInput.value);  // Normalisation de la recherche
            let found = false;
        
            document.querySelectorAll(".surah").forEach(card => {
                // On récupère les textes visibles dans la carte
                const nameArabic = normalizeString(card.querySelector(".name-arabic")?.textContent || "");
                const namePhonetic = normalizeString(card.querySelector(".name-phonetic")?.textContent || "");
                const nameFrench = normalizeString(card.querySelector(".name-french")?.textContent || "");
                const number = normalizeString(card.querySelector(".surah-number")?.textContent || "");
        
                // Si l’un d’eux contient le texte recherché, on l’affiche
                if (
                    nameArabic.includes(val) ||
                    namePhonetic.includes(val) ||
                    nameFrench.includes(val) ||
                    number.includes(val)
                ) {
                    card.style.display = "";
                    found = true;
                } else {
                    card.style.display = "none";
                }
        
            // Affiche le message 'Aucun résultat' si rien trouvé
                noResults.style.display = found ? "none" : "block";
            });
        }
    });

    const lang = localStorage.getItem("language") || "en";
    function fetchChapters(language) {
        if (language === "ar") {
            fetch(`https://api.quran.com/api/v4/chapters?language=${language}`)
            .then(res => res.json())
            .then(data => {
                allSurahs = data.chapters;
                generateSurahCardsinArabic(); // Affiche les cartes des sourates
            })
            .catch(error => console.log(error));
        }
        else{
        fetch(`https://api.quran.com/api/v4/chapters?language=${language}`)
            .then(res => res.json())
            .then(data => {
                allSurahs = data.chapters;
                generateSurahCards(); // Affiche les cartes des sourates
            })
            .catch(error => console.log(error));
        }
    }
    
    // Appeler la fonction avec la langue choisie
    fetchChapters(lang);

    function getVerseNumberSymbol(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }
    
    function generateSurahCardsinArabic() {
        souratesContainer.innerHTML = "";
        souratesContainer.classList.add("sourates-arabic"); // Ajouter une classe pour le style
        souratesContainer.direction = "rtl"; // Alignement à droite pour l'arabe
        allSurahs.forEach(surah => {
            const div = document.createElement("div");
            div.classList.add("surah-arabic");
            

            const number = document.createElement("div");
            number.classList.add("surah-number-surah");
            number.textContent = getVerseNumberSymbol(surah.id);

            const content = document.createElement("div");
            content.classList.add("surah-content");

            const line = document.createElement("div"); 
            line.classList.add("line");

            const nameArabic = document.createElement("div");   
            nameArabic.classList.add("name-arabic-surah");
            nameArabic.textContent = surah.name_arabic;

            const verseCount = document.createElement("div");
            verseCount.classList.add("verse-count-surah");
            verseCount.textContent = `${getVerseNumberSymbol(surah.verses_count)} آيات`; // Convertir le nombre en chiffres arabes

            line.appendChild(nameArabic);
            line.appendChild(verseCount);
            content.appendChild(line);

            div.appendChild(number);
            div.appendChild(content);

            div.dataset.id = surah.id;
            div.dataset.name = surah.name_arabic;
            div.addEventListener("click", () => {
                window.location.href = `sourate.html?id=${surah.id}`;
            });

    
            souratesContainer.appendChild(div);
        });
    }

    // 🔁 Générer les cartes des sourates
    function generateSurahCards() {
        souratesContainer.innerHTML = "";
        souratesContainer.classList.remove("sourates-arabic");
        souratesContainer.direction = "ltr"; // Alignement à gauche pour les autres langues
        allSurahs.forEach(surah => {
            const div = document.createElement("div");
            div.classList.add("surah");
    
            // Colonne gauche (numéro)
            const number = document.createElement("div");
            number.classList.add("surah-number");
            number.textContent = surah.id;
    
            // Colonne droite (infos sur deux lignes)
            const content = document.createElement("div");
            content.classList.add("surah-content");
    
            const line1 = document.createElement("div");
            line1.classList.add("line1");
    
            const nameArabic = document.createElement("div");
            nameArabic.classList.add("name-arabic");
            nameArabic.textContent = surah.name_arabic;
    
            const namePhonetic = document.createElement("div");
            namePhonetic.classList.add("name-phonetic");
            namePhonetic.textContent = surah.name_simple;
    
            const line2 = document.createElement("div");
            line2.classList.add("line2");
    
            const nameFrench = document.createElement("div");
            nameFrench.classList.add("name-french");
            nameFrench.textContent = surah.translated_name.name;
    
            const verseCount = document.createElement("div");
            verseCount.classList.add("verse-count");
            verseCount.textContent = `${surah.verses_count} Ayahs`;
            
            line1.appendChild(namePhonetic);
            line1.appendChild(nameArabic);

            line2.appendChild(nameFrench);
            line2.appendChild(verseCount);
            
            content.appendChild(line1);
            content.appendChild(line2);
    
            // Assemblage
            div.appendChild(number);
            div.appendChild(content);
    
            div.dataset.id = surah.id;
            div.dataset.name = surah.name_arabic;
            div.addEventListener("click", () => {
                window.location.href = `sourate.html?id=${surah.id}`;
            });

    
            souratesContainer.appendChild(div);
        });
    } 
    
        let lastScrollTop = 0;
        let ticking = false;
        
        const contentContainer = document.getElementById("contentContainer");
        
        if (contentContainer && topBar) {
            contentContainer.addEventListener("scroll", () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrollTop = contentContainer.scrollTop;
        
                        if (scrollTop > lastScrollTop && scrollTop > 15) {
                            topBar.classList.add("hidden");
                            contentContainer.style.marginTop = 0;
                        } else if (scrollTop < lastScrollTop) {
                            topBar.classList.remove("hidden");
                            contentContainer.style.marginTop = '2.4rem';
                        }
        
                        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
                        ticking = false;
                    });
        
                    ticking = true;
                }
            });
        } 
})