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
    const audio = document.getElementById('audio');
    const contentContainer = document.getElementById("contentContainer");

    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "mydeen");

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

    function getTranslation(key) {
        const lang = localStorage.getItem("language") || 'en';
        const t = translations[lang];
        return t[key];
    }

    function getTradName() {
    const lang = localStorage.getItem("language") || 'en';
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
        console.log(surahPageMap)
    });
    
    function getVerseNumberSymbol(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }
    
    // 🔁 Charger les versets (lecture et traduction)
    async function loadSurahVerses(surahId) {
        const lang = localStorage.getItem("language") || "en";
        currentSurah = { id: Number(surahId) };
        viewMode = "translation";
            // 🕌 Récupérer le nom de la sourate
            const chapterRes = await fetch(`https://api.quran.com/api/v4/chapters/${surahId}`);
            const chapterData = await chapterRes.json();
            currentSurah.name_arabic = chapterData.chapter.name_arabic;
            currentSurah.name_simple = chapterData.chapter.name_simple;
            document.title = `MyDeen - ${currentSurah.name_simple}`;

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
                    img.src = `mushaf/${pageNumber}.png`;
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
                btnLecture.innerHTML = '<img src="images/lecture.svg" alt="Lecture" class="icon-svg">';
                btnLecture.addEventListener("click", () => {
                    btnLecture.classList.add("active");
                    btnTraduction.classList.remove("active");
                    viewMode = "reading";
                    displayVerses(currentSurah.arabicVerses, currentTranslation);
                });

                const btnTraduction = document.createElement("button");
                btnTraduction.classList.add("mode-button", "active");
                btnTraduction.title = "Mode Traduction";
                btnTraduction.innerHTML = '<img src="images/traduction.svg" alt="Traduction" class="icon-svg">';
                btnTraduction.addEventListener("click", () => {
                    btnTraduction.classList.add("active");
                    btnLecture.classList.remove("active");
                    viewMode = "translation";
                    displayVerses(currentSurah.arabicVerses, currentTranslation);
                });


                buttonContainer.appendChild(btnTraduction)
                buttonContainer.appendChild(btnLecture)
                topBar.appendChild(buttonContainer);
    }    
            topBar.appendChild(backButton);

            backButton.style.display = "block";

            // 🚀 Init interface + affichage
            initSettingsMenuEvents();
            initLanguageEvents();
            applyTranslations();
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
                img.src = `mushaf/${pageNumber}.png`;
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
    
            // Ajouter bouton audio s’il n'existe pas déjà
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
            const audioPath = `audio/${surahId}.mp3`;
        
            const audio = document.getElementById('audio');
            const playPauseBtn = document.getElementById('play-pause-btn');
            const closeBtn = document.getElementById('close-btn');
            const seekBar = document.getElementById('seek-bar');
            const currentTimeDisplay = document.getElementById('current-time');
            const durationDisplay = document.getElementById('duration');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const playButton = document.getElementById("play-audio-btn");

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
                    if (event.key === "ArrowRight" && audioBar.style.display !== "none") {
                    event.preventDefault();
                    nextBtn?.click(); // Simule un clic sur le bouton "next"
                    }
                        // Flèche gauche : recule de 3 secondes
                    if (event.key === "ArrowLeft" && audioBar.style.display !== "none") {
                            event.preventDefault();
                            prevBtn?.click(); // Simule un clic sur le bouton "prev"
                    }

                    const activeElement = document.activeElement;
                    const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

                    if (event.key === ' ' && audioBar.style.display !== "none" && !isInput) {
                        event.preventDefault(); // Empêche le défilement de la page
                        playPauseBtn.click(); // Simule un clic sur le bouton de lecture/pause
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
                audio.src = source;
                audio.play();
                audioBar.classList.remove('hidden');
                playPauseBtn.classList.remove('paused');
                playPauseBtn.innerHTML = '&#10074;&#10074;';
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

        const Traducteur = document.getElementById('Traducteur')
        if (Traducteur) Traducteur.textContent = getTradName()


        const playButton = document.getElementById("play-audio-btn");
        const playPauseBtn = document.getElementById('play-pause-btn');
        if (playButton) {
            playButton.innerHTML = `&#9654; ${getTranslation("play-audio-btn")}`
            playPauseBtn.innerHTML = `&#9654;`;
        }
        if (playButton && audio.pause()) playButton.innerHTML = `&#10074;&#10074; ${getTranslation("play-audio-btn-paused")}`;

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
        const isVisible = langueMenu.style.display === "none";
        langueMenu.style.display = isVisible ? "none" : "flex";
    });

    // Initialiser les événements du menu paramètres
    initSettingsMenuEvents();
    applyTranslations();
    initLanguageEvents(); 

    // Activer le bouton retour
    document.getElementById("homeButton")?.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Retour à l’accueil avec la touche Échap
    document.addEventListener("keyup", (event) => {
        if (event.key === "Escape") {
            document.getElementById("homeButton")?.click();
        }
    });

    function initLanguageEvents() {
        document.querySelectorAll(".langue-option").forEach(div => {
            div.addEventListener("click", function () {
                const lang = this.id;
                localStorage.setItem("language", lang);
                applyTranslations();
    
                    // Mettre à jour aussi le bouton audio si nécessaire
                const playButton = document.getElementById("play-audio-btn");
                const t = translations[lang];
                if (playButton && t && t["play-pause-btn"]) {
                    playButton.title = t["play-pause-btn"];
                }

                if (currentSurah && typeof currentSurah.id === "number") {
                    versesDiv.innerHTML = ""; // Vider les versets précédents
                    loadSurahVerses(currentSurah.id); // Recharge la sourate dans la nouvelle langue
                }
                
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