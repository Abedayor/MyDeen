const params = new URLSearchParams(window.location.search);
const surahId = params.get("id");
let currentSurah = { id: Number(surahId) };

document.addEventListener("DOMContentLoaded", () => {
    initSettingsMenuEvents();
    const topBar = document.querySelector(".top-bar");
    const verseContainer = document.getElementById("verseContainer");
    const surahTitle = document.getElementById("surahTitle");
    const versesDiv = document.getElementById("verses");
    const backButton = document.getElementById("homeButton");
    const audioBar = document.querySelector('.audio-bar');
    const contentContainer = document.getElementById("contentContainer");

    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "midnight-blue");

    const homeButton = document.getElementById("homeButton");
    homeButton?.addEventListener("click", () => {
        window.location.href = "../index.html";
    });
    document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        homeButton?.click();
    }
});




    let surahPageMap = {};
    let currentPlayingSurahId = null;
    let currentTranslation = [];
    let viewMode = "translation";

    async function getSurahPageMap() {
        const totalSurahs = 114;
        const map = {};

        for (let surah = 1; surah <= totalSurahs; surah++) {
            try {
                const response = await fetch(`https://api.quran.com/api/v4/chapters/${surah}`);
                const data = await response.json();

                const [start, end] = data.chapter.pages;

                map[surah] = { start, end };
            } catch (error) {
                console.error(`Erreur lors de la récupération de la sourate ${surah} :`, error);
            }
        }

        return map;
    }

    const translations = {
        en: {
            "play-audio-btn": "Play Audio",
            "play-audio-btn-paused": "Pause Audio",
            "aTranslation": "Translation by",
        },
        fr: {
            "play-audio-btn": "Lire l'audio",
            "play-audio-btn-paused": "Arrêter l'audio",
            "aTranslation": "Traduction par",
        },
        de: {
            "play-audio-btn": "Audio abspielen",
            "play-audio-btn-paused": "Audio stoppen",
            "aTranslation": "Übersetzung von",
        },
        es: {
            "play-audio-btn": "Reproducir audio",
            "play-audio-btn-paused": "Detener el audio",
            "aTranslation": "Traducción por",
        },
        it: {
            "play-audio-btn": "Riproduci audio",
            "play-audio-btn-paused": "Interrompere l'audio",
            "aTranslation": "Traduzione di",
        },
        pt: {
            "play-audio-btn": "Reproduzir áudio",
            "play-audio-btn-paused": "Parar o áudio",
            "aTranslation": "Tradução por",
        },
        tr: {
            "play-audio-btn": "Sesli Okumayı Başlat",
            "play-audio-btn-paused": "Sesi durdur",
            "aTranslation": "Çeviri",
        },
        ar: {
            "play-audio-btn": "تشغيل الصوت",
            "play-audio-btn-paused": "إيقاف الصوت",
             "aTranslation": "ترجمة من", 
        }
    };

    document.addEventListener("click", (e) => {
            if (!settingsMenu.contains(e.target) && e.target !== settingsIcon) {
                settingsMenu.style.display = "none";
            }
            if (!langueMenu.contains(e.target) && e.target !== globeIcon) {
                langueMenu.style.display = "none";
            }
        });


    function getTranslation(key) {
        const lang = document.documentElement.getAttribute("lang") || "en";
        const t = translations[lang];
        return t[key];
    }

    function getTradName() {
    const lang = document.documentElement.getAttribute("lang") || "en";
    let trad_name;

    if (lang === "fr") {
        trad_name = "Muhammad Hamidullah";
    } else if (lang === "en") {
        trad_name = "Saheeh International";
    } else if (lang === "de") {
        trad_name = "Malak Faris Abdalsalaam";
    } else if (lang === "es") {
        trad_name = "Montada Islamic Foundation";
    } else if (lang === "it") {
        trad_name = "Hamza Roberto Piccardo";
    } else if (lang === "pt") {
        trad_name = "Samir El-Hayek";
    } else if (lang === "tr") {
        trad_name = "Diyanet İşleri";
    } else if (lang === "ar") {
        trad_name = "Saheeh International";
    } else {
        trad_name = "";
    }
        return trad_name;
    }

    function getStartPageForSurah(surahId) {
        return surahPageMap[surahId]?.start || null;
    }

    function getEndPageForSurah(surahId) {
        return surahPageMap[surahId]?.end || null;
    }

    // Initialisation au chargement
    getSurahPageMap().then(map => {
        surahPageMap = map;
    });
    
    function getVerseNumberSymbol(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }
    
    // 🔁 Charger les versets (lecture et traduction)
    async function loadSurahVerses(surahId) {
        const loader = document.getElementById("loader");
        loader.classList.remove("hidden");

        const lang = document.documentElement.getAttribute("lang") || "en";
        currentSurah = { id: Number(surahId) };
        viewMode = "translation";
            // 🕌 Récupérer le nom de la sourate
            const chapterRes = await fetch(`https://api.quran.com/api/v4/chapters/${surahId}`);
            const chapterData = await chapterRes.json();
            currentSurah.name_arabic = chapterData.chapter.name_arabic;
            currentSurah.name_simple = chapterData.chapter.name_simple;

            // 📝 Traduction ID par langue
            const translationMap = {
                fr: 31, en: 20, de: 235, es: 140,
                it: 153, pt: 43, tr: 77, ar: 20
            };
            const translationId = translationMap[lang] || null;

            // 📖 Récupérer versets
            const arabicUrl = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`;
            const fetches = [fetch(arabicUrl)];

            if (translationId) {
                const translationUrl = `https://api.quran.com/api/v4/quran/translations/${translationId}?chapter_number=${surahId}`;
                fetches.push(fetch(translationUrl));
            }

            const responses = await Promise.all(fetches);
            const results = await Promise.all(responses.map(res => res.json()));
            const arabicData = results[0];
            const translationData = results[1];

            currentSurah.arabicVerses = arabicData.verses;
            currentTranslation = translationData ? translationData.translations : [];

            // 🎯 Afficher les données seulement maintenant que tout est prêt
            verseContainer.style.display = "block";

            if (surahTitle) {
                surahTitle.textContent = currentSurah.name_arabic;
            }

            // 🔢 Pages du mushaf
            surahPageMap = await getSurahPageMap();
            const startPage = getStartPageForSurah(surahId);
            const endPage = getEndPageForSurah(surahId);
            if (startPage !== null && endPage !== null) {
                for (let page = startPage; page <= endPage; page++) {
                    const pageNumber = page.toString().padStart(3, '0');
                    const img = document.createElement("img");
                    if (lang === "en"){
                        img.src = `../assets/mushaf/${pageNumber}.png`;
                    } else {
                        img.src = `../../assets/mushaf/${pageNumber}.png`;
                    }
                    img.alt = `Page ${page}`;
                    img.classList.add("quran-page");
                    versesDiv.appendChild(img);
                }
            } else {
                console.warn(`Impossible de trouver les pages pour la sourate ${surahId}`);
            }

            const buttonContainer = document.querySelector('.button-container')

            if (!buttonContainer){
            // 🔘 Boutons lecture / traduction
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");

                const btnLecture = document.createElement("button");
                btnLecture.classList.add("mode-button");
                btnLecture.title = "Mode Lecture";
                if (lang === "en"){
                    btnLecture.innerHTML = '<img src="../assets/images/lecture.svg" alt="Lecture" class="icon-svg">';
                } else {
                btnLecture.innerHTML = '<img src="../../assets/images/lecture.svg" alt="Lecture" class="icon-svg">';
                }
                btnLecture.addEventListener("click", () => {
                    btnLecture.classList.add("active");
                    btnTraduction.classList.remove("active");
                    viewMode = "reading";
                    displayVerses();
                });

                const btnTraduction = document.createElement("button");
                btnTraduction.classList.add("mode-button", "active");
                btnTraduction.title = "Mode Traduction";
                if (lang === "en"){
                    btnTraduction.innerHTML = '<img src="../assets/images/traduction.svg" alt="Traduction" class="icon-svg">';
                } else {
                    btnTraduction.innerHTML = '<img src="../../assets/images/traduction.svg" alt="Traduction" class="icon-svg">';
                }
                btnTraduction.addEventListener("click", () => {
                    btnTraduction.classList.add("active");
                    btnLecture.classList.remove("active");
                    viewMode = "translation";
                    displayVerses();
                });


                buttonContainer.appendChild(btnTraduction)
                buttonContainer.appendChild(btnLecture)
                topBar.appendChild(buttonContainer);
    }    
            topBar.appendChild(backButton);

            backButton.style.display = "block";

            // 🚀 Init interface + affichage
            initSettingsMenuEvents();
            loader.classList.add('hidden');
            displayVerses();

    }

    function displayVerses() {
        versesDiv.innerHTML = "";
    
        const verseContainerFlex = document.createElement("div");
        verseContainerFlex.classList.add(viewMode === "reading" ? "mushaf-pages" : "verse-container-flex");
    
        const existingBasmala = document.getElementById("basmala");
        if (existingBasmala) existingBasmala.remove();

        const existingSurahTitle = document.getElementById("surahTitle");
        if (existingSurahTitle) existingSurahTitle.remove();

        if (viewMode === "translation") {
            // Créer un nouveau titre de sourate
            const newSurahTitle = document.createElement("div");
            newSurahTitle.id = "surahTitle";
            newSurahTitle.classList.add("surah-title");
            newSurahTitle.textContent = currentSurah.name_arabic;

            const verseContainer = document.getElementById("verseContainer");
            if (verseContainer) {
                verseContainer.prepend(newSurahTitle);
            }

            // Ajouter la Basmala si ce n'est pas Al-Fatiha ni At-Tawba
            if (currentSurah.name_arabic !== "الفاتحة" && currentSurah.name_arabic !== "التوبة") {
                const basmalaDiv = document.createElement("div");
                basmalaDiv.id = "basmala";
                basmalaDiv.classList.add("basmala");
                basmalaDiv.innerHTML = "﷽";

                newSurahTitle.insertAdjacentElement("afterend", basmalaDiv);
            }
        }
    
        const fragment = document.createDocumentFragment();
    
        if (viewMode === "reading") {
            const existingPlayBtn = document.getElementById("play-audio-btn");
            if (existingPlayBtn) existingPlayBtn.parentElement.remove();
    
            const parsePageNumber = (page) => parseInt(page.toString().split('_')[0], 10);
            const surahPages = surahPageMap[currentSurah.id];
            const startPage = parsePageNumber(surahPages.start);
            const endPage = parsePageNumber(surahPages.end);
    
            for (let page = startPage; page <= endPage; page++) {
                const pageNumber = page.toString().padStart(3, '0');
                const img = document.createElement("img");
                if (document.documentElement.getAttribute("lang") === "en") {
                    img.src = `../assets/mushaf/${pageNumber}.png`;
                } else {
                img.src = `../../assets/mushaf/${pageNumber}.png`;
                }
                img.alt = `${pageNumber}`;
                img.classList.add("quran-page");
    
                const pageInfo = document.createElement("div");
                pageInfo.classList.add("page-info");
    
                const pageLabel = document.createElement("div");
                pageLabel.classList.add("page-number-label");
                pageLabel.textContent = `${page}`;
    
                const hr = document.createElement("hr");
                hr.classList.add("page-separator");
    
                pageInfo.appendChild(pageLabel);
                pageInfo.appendChild(hr);
    
                verseContainerFlex.appendChild(img);
                verseContainerFlex.appendChild(pageInfo);
            }
    
            fragment.appendChild(verseContainerFlex);
        } else {
            currentSurah.arabicVerses.forEach((verse, index) => {
                const verseReading = document.createElement("span");
                verseReading.classList.add("verse-reading");
    
                const verseNumber = document.createElement("span");
                verseNumber.classList.add("verse-number-circle");
                const verseId = verse.verse_key.split(":")[1];
                verseNumber.textContent = getVerseNumberSymbol(verseId);
    
                const arabic = document.createElement("span");
                arabic.classList.add("arabic-text");
    
                const words = removeFootnotes(verse.text_uthmani).split(" ");
                words.forEach((word, i) => {
                    const wordSpan = document.createElement("span");
                    wordSpan.classList.add("word");
                    wordSpan.textContent = word;
                    arabic.appendChild(wordSpan);
                    if (i !== words.length - 1) arabic.append("\u2009");
                });
    
                arabic.appendChild(verseNumber);
                verseReading.appendChild(arabic);
    
                const translation = document.createElement("div");
                translation.classList.add("translation-text");
                translation.innerHTML = removeFootnotes(currentTranslation[index].text);
                verseReading.appendChild(translation);
    
                verseContainerFlex.appendChild(verseReading);
            });
            if (!document.getElementById("play-audio-btn")) {
                const barrette = document.createElement("div");
                barrette.classList.add("barrette");
    
                const playButton = document.createElement("button");
                playButton.id = "play-audio-btn";
                playButton.innerHTML = `&#9654; ${getTranslation("play-audio-btn")}`;

                const TrDiv = document.createElement('div')
                TrDiv.id = 'TrDiv'

                const ActualTranslation = document.createElement('div')
                ActualTranslation.id = 'aTranslation' 
                ActualTranslation.innerHTML = `${getTranslation('aTranslation')}`

                const Traducteur = document.createElement('div')
                Traducteur.id = 'Traducteur'
                Traducteur.innerHTML = getTradName()

                TrDiv.appendChild(ActualTranslation)
                TrDiv.appendChild(Traducteur)

                barrette.appendChild(TrDiv)
                barrette.appendChild(playButton);
                versesDiv.insertAdjacentElement("beforebegin", barrette);
    
                let audioInitialized = false;
                const playPauseBtn = document.getElementById('play-pause-btn');
                const audio = document.getElementById('audio');
                const audioBar = document.querySelector('.audio-bar');
    
                playButton.addEventListener("click", () => {
                    const requestedSurahId = currentSurah.id;
    
                    if (!audioInitialized || requestedSurahId !== currentPlayingSurahId) {
                        if (audio) audio.pause();
                        initAudioPlayer(requestedSurahId);
                        currentPlayingSurahId = requestedSurahId;
                        audioInitialized = true;
                        playButton.innerHTML = `&#10074;&#10074; ${getTranslation("play-audio-btn-paused")}`;
                        audioBar.classList.remove("hidden");
                        playPauseBtn.innerHTML = "&#10074;&#10074;";
                        playPauseBtn.classList.remove("paused");
                    } else if (audio.paused) {
                        audio.play();
                        playButton.innerHTML = `&#10074;&#10074; ${getTranslation("play-audio-btn-paused")}`;
                        playPauseBtn.innerHTML = "&#10074;&#10074;";
                        playPauseBtn.classList.remove("paused");
                        audioBar.classList.remove("hidden");
                    } else {
                        audio.pause();
                        playButton.innerHTML = `&#9654; ${getTranslation("play-audio-btn")}`;
                        playPauseBtn.innerHTML = "&#9654;";
                        playPauseBtn.classList.add("paused");
                    }
                });
            }
        }
    
        versesDiv.appendChild(verseContainerFlex);
    }        
    
    // 📝 Supprimer les footnotes des versets
    function removeFootnotes(text) {
        const footnoteRegex = /<sup[^>]*foot_note[^>]*>[^<]*<\/sup>/g;
        return text.replace(footnoteRegex, '');
    }

    let audioEventListenersInitialized = false;
        function initAudioPlayer(surahId) {
            const lang = document.documentElement.getAttribute("lang") || "en";
            const audioPath = lang === "en"
                ? `../assets/audio/${surahId}.mp3`
                : `../../assets/audio/${surahId}.mp3`;

            const audio = document.getElementById('audio');
            const playPauseBtn = document.getElementById('play-pause-btn');
            const closeBtn = document.getElementById('close-btn');
            const seekBar = document.getElementById('seek-bar');
            const currentTimeDisplay = document.getElementById('current-time');
            const durationDisplay = document.getElementById('duration');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const playButton = document.getElementById("play-audio-btn");
            const spinner = document.getElementById('spinner');

            let isDragging = false;

            audio.addEventListener('timeupdate', () => {
                if (!isDragging) {
                    const percent = (audio.currentTime / audio.duration) * 100;
                    seekBar.value = percent;
                }
            });

            seekBar.addEventListener('mousedown', () => isDragging = true);
            document.addEventListener('mouseup', () => isDragging = false);

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                const rect = seekBar.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                const percent = Math.max(0, Math.min(x / width, 1));

                audio.currentTime = percent * audio.duration;
                seekBar.value = percent * 100;
            });

            seekBar.addEventListener('click', (e) => {
                const rect = seekBar.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                const percent = Math.max(0, Math.min(x / width, 1));

                audio.currentTime = percent * audio.duration;
            });
        
            // ✅ Écouteurs d'événements – à ajouter une seule fois
            if (!audioEventListenersInitialized) {
                seekBar.addEventListener('click', seekAudio);
                playPauseBtn.addEventListener('click', togglePlayPause);
                closeBtn.addEventListener('click', closeAudioBar);
                document.addEventListener("keydown", function (event) {
                const activeElement = document.activeElement;
                const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

                if (event.key === "ArrowRight" && !audioBar.classList.contains('hidden')) {
                    event.preventDefault();
                    nextBtn?.click();
                }

                if (event.key === "ArrowLeft" && !audioBar.classList.contains('hidden')) {
                    event.preventDefault();
                    prevBtn?.click();
                }

                if (event.key === ' ' && !audioBar.classList.contains('hidden') && !isInput) {
                    event.preventDefault();
                    playPauseBtn.click();
                }
            });

                prevBtn.addEventListener('click', moveAudio(-3));
                nextBtn.addEventListener('click', moveAudio(3));
                seekBar.addEventListener('input', updateSeekBar);
                audio.addEventListener('timeupdate', updateTime);
                audio.addEventListener('loadedmetadata', updateDuration);
                audioEventListenersInitialized = true;
            }
            
            loadAudio(audioPath);

            function showLoading() {
                spinner.classList.remove('hidden');
                playPauseBtn.classList.add('hidden');
            }

            // Cache le spinner et affiche le bouton play/pause quand audio est prêt
            function hideLoading() {
                spinner.classList.add('hidden');
                playPauseBtn.classList.remove('hidden');
            }
        
            function togglePlayPause() {
                if (audio.paused) {
                    audio.play();
                    playPauseBtn.classList.remove('paused');
                    playPauseBtn.innerHTML = '&#10074;&#10074;';
                    playButton.innerHTML = `&#10074;&#10074; ${getTranslation("play-audio-btn-paused")}`;
                } else {
                    audio.pause();
                    playPauseBtn.classList.add('paused');
                    playPauseBtn.innerHTML = '&#9654;';
                    playButton.innerHTML = `&#9654; ${getTranslation("play-audio-btn")}`;
                }
            }
        
            function closeAudioBar() {
                audio.pause();
                audio.removeAttribute('src');
                audio.load();
                audioBar.classList.add('hidden');
                playPauseBtn.innerHTML = '&#9654;';
                playButton.innerHTML = `&#9654; ${getTranslation("play-audio-btn")}`;
                currentPlayingSurahId = null;
            }
        
            function updateSeekBar() {
                if (audio.duration) {
                    const percent = (audio.currentTime / audio.duration) * 100;
                    seekBar.value = percent;
                }
            }
        
            function updateTime() {
                currentTimeDisplay.textContent = formatTime(audio.currentTime);
                updateSeekBar();
            }
        
            function updateDuration() {
                durationDisplay.textContent = formatTime(audio.duration);
            }
        
            function moveAudio(seconds) {
                return function () {
                    audio.currentTime = Math.max(0, Math.min(audio.currentTime + seconds, audio.duration));
                };
            }
        
            function formatTime(seconds) {
                const hrs = Math.floor(seconds / 3600);
                const mins = Math.floor((seconds % 3600) / 60);
                const secs = Math.floor(seconds % 60);
            
                if (hrs > 0) {
                    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                } else {
                    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                }
            }            
        
            function loadAudio(source) {
            showLoading();
            audio.src = source;
            audio.load();

            // On écoute l'événement canplay pour savoir quand l'audio est prêt
            audio.addEventListener('canplay', function onCanPlay() {
                hideLoading();
                audio.play();
                audioBar.classList.remove('hidden');
                playPauseBtn.classList.remove('paused');
                playPauseBtn.innerHTML = '&#10074;&#10074;';
                // On enlève cet écouteur pour éviter plusieurs appels
                audio.removeEventListener('canplay', onCanPlay);
            });
        }


            function seekAudio(event) {
                const rect = seekBar.getBoundingClientRect();
                const clickX = event.clientX - rect.left;
                const width = rect.width;
                const percent = clickX / width;
                audio.currentTime = percent * audio.duration;
            }
            
        }   // Fin de initAudioPlayer
    
    loadSurahVerses(surahId);

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

    // Met la classe active sur l'option actuelle
    langueOptions.forEach(opt => {
        opt.classList.toggle("active", opt.id === currentLang);
    });

    langueOptions.forEach(option => {
        option.addEventListener("click", () => {
            const selectedLang = option.id;

            // Si on clique sur la même langue, ne rien faire
            if (selectedLang === currentLang) return;

            // Mise à jour de l'attribut lang + localStorage
            document.documentElement.setAttribute("lang", selectedLang);
            localStorage.setItem("lang", selectedLang);

            // Mise à jour visuelle
            langueOptions.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");

            // Ferme le menu langue
            langueMenu.style.display = "none";

            // Détecte si on est dans un sous-dossier de langue ou à la racine
            const isInLangFolder = /\/(fr|ar|es|it|de|pt|tr)\//.test(window.location.pathname);
            const currentSurahId = currentSurah?.id || "1";

            let redirectPath = "";

            if (selectedLang === "en") {
                // Redirige vers racine si langue cible est anglais
                redirectPath = isInLangFolder
                    ? `../../surahs/surah.html?id=${currentSurahId}`
                    : `surahs/surah.html?id=${currentSurahId}`;
            } else {
                // Redirige vers sous-dossier langue si pas déjà dedans
                redirectPath = isInLangFolder
                    ? `../../${selectedLang}/surahs/surah.html?id=${currentSurahId}`
                    : `../${selectedLang}/surahs/surah.html?id=${currentSurahId}`;
            }

            window.location.href = redirectPath;
        });
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