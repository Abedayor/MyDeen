document.addEventListener("DOMContentLoaded", () => {
    initSettingsMenuEvents();
    const contentContainer = document.getElementById("contentContainer");
    const topBar = document.querySelector(".top-bar");
    const souratesContainer = document.querySelector(".sourates");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.querySelector(".no-results");

    // --- VARIABLES GLOBALES ---
    let allSurahs = [];
    let currentOrder = "normal";


    // --- INIT ---
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

    const globeIcon = document.querySelector(".globe");
    const langueMenu = document.querySelector(".langue");

    // Toggle l'affichage du menu langue
    globeIcon.addEventListener("click", () => {
        const isVisible = langueMenu.style.display === "flex";
        langueMenu.style.display = isVisible ? "none" : "flex";
    });

    // Initialiser les événements du menu paramètres
    initSettingsMenuEvents();

    function initSettingsMenuEvents() {
        applyActiveThemeClass();

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

        // Sélection de langue
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
                // Redirige vers la racine si la langue est l'anglais
                redirectPath = isInLangFolder
                    ? `../`
                    : `/`;
            } else {
                // Redirige vers un dossier langue si on passe en fr, ar, etc.
                redirectPath = isInLangFolder
                    ? `../${selectedLang}/`
                    : `/${selectedLang}/`;
            }

                window.location.href = redirectPath;
            });
        });

    }

    function normalizeString(str) {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")  // Retirer les accents
            .replace(/[\u2018\u2019]/g, "'")  // Remplacer les apostrophes typographiques
            .replace(/\s+/g, "-")             // Remplacer les espaces par des tirets
            .toLowerCase();                  // Convertir en minuscule pour la comparaison insensible à la casse
    }

    searchInput.addEventListener("input", () => {
        if (lang === 'ar') {
            const val = normalizeString(searchInput.value);  // Normalisation de la recherche
            let found = false;

            document.querySelectorAll(".surah-arabic").forEach(card => {
                const nameArabic = normalizeString(card.querySelector(".name-arabic-surah")?.textContent || "");
                if (nameArabic.includes(val)) {
                    card.style.display = "";
                    found = true;
                } else {
                    card.style.display = "none";
                }

                noResults.style.display = found ? "none" : "block";
            });
        } else {
            const val = normalizeString(searchInput.value);  // Normalisation de la recherche
            let found = false;

            document.querySelectorAll(".surah").forEach(card => {
                const nameArabic = normalizeString(card.querySelector(".name-arabic")?.textContent || "");
                const namePhonetic = normalizeString(card.querySelector(".name-phonetic")?.textContent || "");
                const nameFrench = normalizeString(card.querySelector(".name-french")?.textContent || "");
                const number = normalizeString(card.querySelector(".surah-number")?.textContent || "");

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

                noResults.style.display = found ? "none" : "block";
            });
        }
    });

    document.getElementById('NewsletterButton').addEventListener('click', function () {
        const form = document.querySelector('.sib-form');
        if (form) {
            const currentDisplay = window.getComputedStyle(form).display;
            form.style.display = currentDisplay === 'none' ? 'flex' : 'none';
        }
    });

    const lang = document.documentElement.getAttribute("lang") || "en"; // Récupérer la langue depuis l'attribut lang de l'élément html

    function fetchChapters(language) {
        const url = `https://api.quran.com/api/v4/chapters?language=${language}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                allSurahs = data.chapters;
                if (language === "ar") {
                    generateSurahCardsinArabic();
                } else {
                    generateSurahCards();
                }
            })
            .catch(error => console.log(error));
    }

    function fetchChaptersByRevelationOrder(language) {
        const url = `https://api.quran.com/api/v4/chapters?language=${language}&revelation_order=true`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                allSurahs = data.chapters;
                if (language === "ar") {
                    OrderRevelationArabic();
                } else {
                    OrderRevelation();
                }
            })
            .catch(error => console.log(error));
    }

    function init() {
        const lang = document.documentElement.getAttribute("lang") || "en";
        currentOrder = "normal";
        fetchChapters(lang);
    }

    // Au départ, on ajoute la classe active sur btn-normal
    document.getElementById('btn-normal').classList.add('active');

    function setActiveButton(activeId) {
        const btnNormal = document.getElementById('btn-normal');
        const btnRevelation = document.getElementById('btn-revelation');

        if (activeId === 'btn-normal') {
            btnNormal.classList.add('active');
            btnRevelation.classList.remove('active');
        } else if (activeId === 'btn-revelation') {
            btnRevelation.classList.add('active');
            btnNormal.classList.remove('active');
        }
    }

    document.getElementById('btn-normal').addEventListener('click', () => {
        if (currentOrder === "normal") {
            return;
        }
        currentOrder = "normal";
        const lang = document.documentElement.getAttribute("lang") || "en";
        fetchChapters(lang);

        setActiveButton('btn-normal');
    });

    document.getElementById('btn-revelation').addEventListener('click', () => {
        if (currentOrder === "revelation") {
            return;
        }
        currentOrder = "revelation";
        const lang = document.documentElement.getAttribute("lang") || "en";
        fetchChaptersByRevelationOrder(lang);
        setActiveButton('btn-revelation');
    });

    // Lancement initial
    init();
    
    // 🔁 Générer les cartes des sourates
    function generateSurahCards() {
        souratesContainer.innerHTML = "";
        souratesContainer.classList.remove("surahs-arabic");
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
                window.location.href = `surahs/surah.html?id=${surah.id}`;
            });

    
            souratesContainer.appendChild(div);
        });
    }
    
    function OrderRevelation() {
        souratesContainer.innerHTML = "";
        souratesContainer.classList.remove("surahs-arabic");
        souratesContainer.direction = "ltr"; // Alignement à gauche pour les autres langues

        // ➜ Trier d'abord allSurahs par ordre de révélation
        const sortedSurahs = [...allSurahs].sort((a, b) => a.revelation_order - b.revelation_order);

        sortedSurahs.forEach(surah => {
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
            nameFrench.textContent = ` ${surah.revelation_order} : ${surah.translated_name.name}`;

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
                window.location.href = `surahs/surah.html?id=${surah.id}`;
            });

            souratesContainer.appendChild(div);
        });
    }

    function getVerseNumberSymbol(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }
    
    function getPlaceTranslation(place) {
        if (!place) return "—";
        place = place.toLowerCase();
        if (place === "makkah") return "مكية";
        if (place === "madinah") return "مدنية";
        return "—";
    }


    function generateSurahCardsinArabic() {
        souratesContainer.innerHTML = "";
        souratesContainer.classList.add("surahs-arabic"); // Ajouter une classe pour le style
        souratesContainer.direction = "rtl"; // Alignement à droite pour l'arabe
        allSurahs.forEach(surah => {
            const div = document.createElement("div");
            div.classList.add("surah-arabic");
            

            const number = document.createElement("div");
            number.classList.add("surah-number");
            number.textContent = getVerseNumberSymbol(surah.id);

            const content = document.createElement("div");
            content.classList.add("surah-content");

            const line = document.createElement("div"); 
            line.classList.add("line");

            const nameArabic = document.createElement("div");   
            nameArabic.classList.add("name-arabic");
            nameArabic.textContent = surah.name_arabic;

            const verseCount = document.createElement("div");
            verseCount.classList.add("verse-count-arabic");
            verseCount.textContent = `${getVerseNumberSymbol(surah.verses_count)} آيات`; // Convertir le nombre en chiffres arabes

            line.appendChild(nameArabic);
            line.appendChild(verseCount);
            content.appendChild(line);

            div.appendChild(number);
            div.appendChild(content);

            div.dataset.id = surah.id;
            div.dataset.name = surah.name_arabic;
            div.addEventListener("click", () => {
                window.location.href = `surahs/surah.html?id=${surah.id}`;
            });

    
            souratesContainer.appendChild(div);
        });
    }

    function OrderRevelationArabic() {
            souratesContainer.innerHTML = "";
            souratesContainer.classList.add("surahs-arabic"); // Ajouter une classe pour le style
            souratesContainer.direction = "rtl";

            // ➜ Trier la copie de allSurahs par ordre de revelation
            const sortedSurahs = [...allSurahs].sort((a, b) => a.revelation_order - b.revelation_order);

            sortedSurahs.forEach(surah => {
                const div = document.createElement("div");
                div.classList.add("surah-arabic");

                const number = document.createElement("div");
                number.classList.add("surah-number");
                number.textContent = getVerseNumberSymbol(surah.id);

                const content = document.createElement("div");
                content.classList.add("surah-content");

                const line = document.createElement("div"); 
                line.classList.add("line");

                const nameArabic = document.createElement("div");   
                nameArabic.classList.add("name-arabic");
                nameArabic.textContent = surah.name_arabic;

                const revelationPlace = document.createElement('div');
                revelationPlace.classList.add('revelation-place');
                revelationPlace.textContent = `${getVerseNumberSymbol(surah.revelation_order)} : ${getPlaceTranslation(surah.revelation_place)}`;

                line.appendChild(nameArabic);
                line.appendChild(revelationPlace);
                content.appendChild(line);

                div.appendChild(number);
                div.appendChild(content);

                div.dataset.id = surah.id;
                div.dataset.name = surah.name_arabic;
                div.addEventListener("click", () => {
                    window.location.href = `surahs/surah.html?id=${surah.id}`;
                });

                souratesContainer.appendChild(div);
            });
        }

    
        let lastScrollTop = 0;
        let ticking = false;
        
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
});
