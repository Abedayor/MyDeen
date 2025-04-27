document.addEventListener("DOMContentLoaded", () => {
    const topBar = document.querySelector(".top-bar");
    const souratesContainer = document.querySelector(".sourates");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.querySelector(".no-results");
    const verseContainer = document.getElementById("verseContainer");
    const surahTitle = document.getElementById("surahTitle");
    const versesDiv = document.getElementById("verses");
    const backButton = document.getElementById("backButton");
    const audioBar = document.querySelector('.audio-bar');

    let allSurahs = [];
    let currentSurah = null;
    let currentPlayingSurahId = null;
    let currentTranslation = [];
    let viewMode = "translation";

    function normalizeString(str) {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")  // Retirer les accents
            .replace(/[\u2018\u2019]/g, "'")  // Remplacer les apostrophes typographiques
            .replace(/\s+/g, "-")             // Remplacer les espaces par des tirets
            .toLowerCase();                  // Convertir en minuscule pour la comparaison insensible à la casse
    }

    searchInput.addEventListener("input", () => {
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
    });

    // 🔁 Charger la liste des sourates depuis l'API
    fetch("https://api.quran.com/api/v4/chapters?language=fr")
        .then(res => res.json())
        .then(data => {
            allSurahs = data.chapters;
            generateSurahCards();
        })
    
    function getVerseNumberSymbol(number) {
        const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return number.toString().split('').map(digit => arabicNumbers[parseInt(digit)]).join('');
    }
        
    function scrollToTop(force = false) {
        window.scrollTo({ top: 0, behavior: force ? 'auto' : 'smooth' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        const scrollables = document.querySelectorAll('*');
        scrollables.forEach(el => {
            if (el.scrollTop > 0) el.scrollTop = 0;
        });
    }
        
    // 🔁 Générer les cartes des sourates
    function generateSurahCards() {
        souratesContainer.innerHTML = "";
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
            
            line1.appendChild(nameArabic);
            line1.appendChild(nameFrench);

            line2.appendChild(namePhonetic);
            line2.appendChild(verseCount);
            
            content.appendChild(line1);
            content.appendChild(line2);
    
            // Assemblage
            div.appendChild(number);
            div.appendChild(content);
    
            div.dataset.id = surah.id;
            div.dataset.name = surah.name_arabic;
            div.addEventListener("click", () => {
                currentSurah = surah;
                loadSurahVerses(surah.id);
            });
    
            souratesContainer.appendChild(div);
        });
    }  
    
    
    const surahPageMap = {
        1: { start: 1, end: 1 },
        2: { start: 2, end: 49 },
        3: { start: 50, end: 76 },
        4: { start: 77, end: 106 },
        5: { start: 106, end: 127 },
        6: { start: 128, end: 150 },
        7: { start: 151, end: 176 },
        8: { start: 177, end: 186 },
        9: { start: 187, end: 207 },
        10: { start: 208, end: 221 },
        11: { start: 221, end: 235 },
        12: { start: 235, end: 248 },
        13: { start: 249, end: 255 },
        14: { start: 255, end: 261 },
        15: { start: 262, end: 267 },
        16: { start: 267, end: 281 },
        17: { start: 282, end: 293 },
        18: { start: 293, end: 304 },
        19: { start: 305, end: 312 },
        20: { start: 312, end: 321 },
        21: { start: 322, end: 331 },
        22: { start: 332, end: 341 },
        23: { start: 342, end: 349 },
        24: { start: 350, end: 359 },
        25: { start: 359, end: 366 },
        26: { start: 367, end: 376 },
        27: { start: 377, end: 385 },
        28: { start: 385, end: 396 },
        29: { start: 396, end: 404 },
        30: { start: 404, end: 411 },
        31: { start: 411, end: 414 },
        32: { start: 415, end: 417 },
        33: { start: 418, end: 427 },
        34: { start: 428, end: 434 },
        35: { start: 434, end: 440 },
        36: { start: 440, end: 445 },
        37: { start: 446, end: 452 },
        38: { start: 452, end: 458 },
        39: { start: 458, end: 467 },
        40: { start: 467, end: 476 },
        41: { start: 477, end: 482 },
        42: { start: 483, end: 489 },
        43: { start: 489, end: 495 },
        44: { start: 496, end: 498 },
        45: { start: 499, end: 502 },
        46: { start: 502, end: 506 },
        47: { start: 507, end: 510 },
        48: { start: 511, end: 515 },
        49: { start: 515, end: 517 },
        50: { start: 518, end: 520 },
        51: { start: 520, end: 523 },
        52: { start: 523, end: 525 },
        53: { start: 526, end: 528 },
        54: { start: 528, end: 531 },
        55: { start: 531, end: 534 },
        56: { start: 534, end: 537 },
        57: { start: 537, end: 541 },
        58: { start: 542, end: 545 },
        59: { start: 545, end: 548 },
        60: { start: 549, end: 551 },
        61: { start: 551, end: 553 },
        62: { start: 553, end: 554 },
        63: { start: 554, end: 555 },
        64: { start: 556, end: 557 },
        65: { start: 558, end: 560 },
        66: { start: 560, end: 561 },
        67: { start: 562, end: 564 },
        68: { start: 564, end: 566 },
        69: { start: 566, end: 568 },
        70: { start: 568, end: 570 },
        71: { start: 570, end: 571 },
        72: { start: 572, end: 573 },
        73: { start: 574, end: 575 },
        74: { start: 575, end: 577 },
        75: { start: 577, end: 578 },
        76: { start: 578, end: 580 },
        77: { start: 580, end: 582 },
        78: { start: 582, end: 583 },
        79: { start: 583, end: 585 },
        80: { start: 585, end: 586 },
        81: { start: 586, end: 587 },
        82: { start: 587, end: 588 },
        83: { start: 588, end: 590 },
        84: { start: 590, end: 591 },
        85: { start: 591, end: 592 },
        86: { start: 592, end: 593 },
        87: { start: 593, end: 594 },
        88: { start: 592, end: 592 },
        89: { start: 593, end: 594 },
        90: { start: 594, end: 594 },
        91: { start: 595, end: 595 },
        92: { start: 595, end: 596 },
        93: { start: 596, end: 596 },
        94: { start: 596, end: 596 },
        95: { start: 597, end: 597 },
        96: { start: 597, end: 597 },
        97: { start: 598, end: 598 },
        98: { start: 598, end: 598 },
        99: { start: 599, end: 599 },
        100: { start: 599, end: 600 },
        101: { start: 600, end: 600 },
        102: { start: 600, end: 600 },
        103: { start: 601, end: 601 },
        104: { start: 601, end: 601 },
        105: { start: 601, end: 601 },
        106: { start: 602, end: 602 },
        107: { start: 602, end: 602 },
        108: { start: 602, end: 602 },
        109: { start: 603, end: 603 },
        110: { start: 603, end: 603 },
        111: { start: 603, end: 603 },
        112: { start: 604, end: 604 },
        113: { start: 604, end: 604 },
        114: { start: 604, end: 604 }
      };
    

    function getStartPageForSurah(surahId) {
        return surahPageMap[surahId]?.start || null;
    }
    
    function getEndPageForSurah(surahId) {
        return surahPageMap[surahId]?.end || null;
    }
    
    
    // 🔁 Charger les versets (lecture et traduction)
    function loadSurahVerses(surahId) {
        const arabicUrl = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`;
        const frenchUrl = `https://api.quran.com/api/v4/quran/translations/31?chapter_number=${surahId}`;
    
        Promise.all([fetch(arabicUrl), fetch(frenchUrl)]).then(responses => {
            Promise.all(responses.map(res => res.json())).then(([arabicData, translationData]) => {
                currentSurah.arabicVerses = arabicData.verses;
                currentTranslation = translationData.translations;
    
                viewMode = "translation";
    
                // 👇 Cacher le header et afficher le conteneur de versets
                document.querySelector("header").style.display = "none";
                document.querySelector(".main-content").style.display = "none";
                verseContainer.style.display = "block";
    
                // 👇 Afficher le titre de la sourate
                surahTitle.textContent = `${currentSurah.name_arabic}`;
    
                // 👇 Remplir dynamiquement les boutons dans la top-bar
                topBar.innerHTML = ''; // Supprime tout le contenu de la top-bar

                const startPage = getStartPageForSurah(surahId);
                const endPage = getEndPageForSurah(surahId);

    // Générer et afficher les images des pages
            for (let page = startPage; page <= endPage; page++) {
                const pageNumber = page.toString().padStart(3, '0');
                const img = document.createElement("img");
                img.src = `mushaf/${pageNumber}.png`;
                img.alt = `${pageNumber}`;
                img.classList.add("quran-page");
                versesDiv.appendChild(img);
            }
            
                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("button-container");
    
                const btnLecture = document.createElement("button");
                btnLecture.classList.add("mode-button");
                btnLecture.title = "Mode Lecture";  // Déplacer le title ici, sur le bouton
                btnLecture.innerHTML = '<img src="images/lecture.svg" alt="Lecture" class="icon-svg">';  // Retirer le title de l'img'
                btnLecture.addEventListener("click", () => {
                    btnLecture.classList.add("active");
                    btnTraduction.classList.remove("active");
                    viewMode = "reading";
                    displayVerses(); 

                    
                });

                const btnTraduction = document.createElement("button");
                btnTraduction.classList.add("mode-button");
                btnTraduction.classList.add("active");
                btnTraduction.title = "Mode Traduction";  // Déplacer le title ici, sur le bouton
                btnTraduction.innerHTML = '<img src="images/traduction.svg" alt="Traduction" class="icon-svg">';  // Retirer le title de l'img'
                btnTraduction.addEventListener("click", () => {
                    btnTraduction.classList.add("active");
                    btnLecture.classList.remove("active");
                    viewMode = "translation";
                    displayVerses();
                });

                backButton.style.display = "block";
    
                buttonContainer.appendChild(btnTraduction);
                buttonContainer.appendChild(btnLecture);
    
                topBar.appendChild(buttonContainer);
                topBar.appendChild(backButton);
                                    // 👇 Créer la barre audio si elle n'existe pas déjà
                // 👇 Afficher les versets
                    displayVerses();
        });

        function displayVerses() {
            scrollToTop(true);
            versesDiv.innerHTML = "";
            
            const verseContainerFlex = document.createElement("div");
            verseContainerFlex.classList.add(viewMode === "reading" ? "mushaf-pages" : "verse-container-flex");
            
            // Si on est en mode traduction, on affiche le titre et la basmala
            if (viewMode === "translation") {
                // 👇 Afficher le titre de la sourate
                surahTitle.textContent = `${currentSurah.name_arabic}`;
                
                // Supprime les anciennes Basmala si elle existe déjà
                const existingBasmala = document.getElementById("basmala");
                if (existingBasmala) {
                    existingBasmala.remove();
                }
                
                if (surahTitle.textContent !== "الفاتحة" && surahTitle.textContent !== "التوبة") {
                    const basmalaDiv = document.createElement("div");
                    basmalaDiv.id = "basmala";
                    basmalaDiv.classList.add("basmala");
                    basmalaDiv.innerHTML = "﷽";
                    surahTitle.insertAdjacentElement("afterend", basmalaDiv);
                }
            } else {
                // En mode lecture, ne rien afficher pour le titre ou la basmala
                surahTitle.textContent = "";
            }
        
            const fragment = document.createDocumentFragment();
            
            // En mode lecture, on affiche les pages du Coran
                        // Fonction pour extraire uniquement la partie numérique
            function parsePageNumber(page) {
                return parseInt(page.toString().split('_')[0], 10);  // Prend la partie avant le premier underscore, ou l'entier directement
            }

            if (viewMode === "reading") {
                const existingBasmala = document.getElementById("basmala");
                if (existingBasmala) {
                    existingBasmala.remove();
                }

                const existingPlayBtn = document.getElementById("play-audio-btn");
                if (existingPlayBtn) {
                    existingPlayBtn.parentElement.remove(); // supprime aussi la barrette
                }

                // Utilise surahPageMap pour obtenir les pages de la sourate
                const surahPages = surahPageMap[currentSurah.id];
                const startPage = parsePageNumber(surahPages.start); // Appliquer la fonction de parsing
                const endPage = parsePageNumber(surahPages.end); // Appliquer la fonction de parsing

                for (let page = startPage; page <= endPage; page++) {
                    const pageNumber = page.toString().padStart(3, '0');
                    const img = document.createElement("img");
                    img.src = `mushaf/${pageNumber}.png`;
                    img.alt = `${pageNumber}`;
                    img.classList.add("quran-page");

                    verseContainerFlex.appendChild(img);

                    // 👇 Ajouter le numéro de page et une ligne après chaque image
                    const pageInfo = document.createElement("div");
                    pageInfo.classList.add("page-info");

                    const pageLabel = document.createElement("div");
                    pageLabel.classList.add("page-number-label");
                    pageLabel.textContent = `${page}`;

                    const hr = document.createElement("hr");
                    hr.classList.add("page-separator");

                    pageInfo.appendChild(pageLabel); // Ajouter le numéro de page d'abord
                    pageInfo.appendChild(hr); // Ajouter la ligne de séparation après le numéro de page
                    verseContainerFlex.appendChild(pageInfo);

                }

                fragment.appendChild(verseContainerFlex);
            }

                        else {
                // En mode traduction, afficher les versets
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
                    words.forEach((word, index) => {
                        const wordSpan = document.createElement("span");
                        wordSpan.classList.add("word");
                        wordSpan.textContent = word;
                        arabic.appendChild(wordSpan);
                        if (index !== words.length - 1) {
                            arabic.append("\u2009");
                        }
                    });
        
                    arabic.appendChild(verseNumber);
                    verseReading.appendChild(arabic);
        
                    const translation = document.createElement("div");
                    translation.classList.add("translation-text");
                    translation.innerHTML = removeFootnotes(currentTranslation[index].text);
                    verseReading.appendChild(translation);
                    const existingPlayBtn = document.getElementById("play-audio-btn");
                if (existingPlayBtn) {
                    existingPlayBtn.parentElement.remove(); // supprime aussi la barrette
                }


                if (!document.getElementById("play-audio-btn")) {
                    const barrette = document.createElement("div");
                    barrette.classList.add("barrette");

                    const playButton = document.createElement("button");
                    playButton.id = "play-audio-btn";
                    playButton.innerHTML = "&#9654; Jouer Audio";

                    barrette.appendChild(playButton);
                    versesDiv.insertAdjacentElement("beforebegin", barrette);

                    let audioInitialized = false;
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    const audio = document.getElementById('audio');
                    const audioBar = document.querySelector('.audio-bar');

                    playButton.addEventListener("click", () => {
                        const requestedSurahId = currentSurah.id;

                        if (!audioInitialized || requestedSurahId !== currentPlayingSurahId) {
                            audio.pause();
                            initAudioPlayer(requestedSurahId);
                            currentPlayingSurahId = requestedSurahId;
                            audioInitialized = true;
                            playButton.innerHTML = "&#10074;&#10074; Pause Audio";
                            audioBar.classList.remove("hidden");
                            playPauseBtn.innerHTML = "&#10074;&#10074;";
                            playPauseBtn.classList.remove("paused");
                        } else if (audio.paused) {
                            audio.play();
                            playButton.innerHTML = "&#10074;&#10074; Pause Audio";
                            playPauseBtn.innerHTML = "&#10074;&#10074;";
                            playPauseBtn.classList.remove("paused");
                            audioBar.classList.remove("hidden");
                        } else {
                            audio.pause();
                            playButton.innerHTML = "&#9654; Jouer Audio";
                            playPauseBtn.innerHTML = "&#9654;";
                            playPauseBtn.classList.add("paused");
                        }
                    });
                } else {
                    const playPauseBtn = document.getElementById('play-pause-btn');
                    const playButton = document.getElementById("play-audio-btn");
                    if (currentSurah.id !== currentPlayingSurahId) {
                        playButton.innerHTML = "&#9654; Jouer Audio";
                        playPauseBtn.innerHTML = "&#9654;";
                        playPauseBtn.classList.add("paused");
                    } else if (!document.getElementById("audio").paused) {
                        playButton.innerHTML = "&#10074;&#10074; Pause Audio";
                        playPauseBtn.innerHTML = "&#10074;&#10074;";
                        playPauseBtn.classList.remove("paused");
                    } else {
                        playButton.innerHTML = "&#9654; Jouer Audio";
                    }
                }
                    verseContainerFlex.appendChild(verseReading);
                });
            }
            
            fragment.appendChild(verseContainerFlex);
            versesDiv.appendChild(fragment);
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
        
            // 🔁 Reste inchangé
            loadAudio(audioPath);
        
            function togglePlayPause() {
                if (audio.paused) {
                    audio.play();
                    playPauseBtn.classList.remove('paused');
                    playPauseBtn.innerHTML = '&#10074;&#10074;';
                    playButton.innerHTML = "&#10074;&#10074; Pause Audio";
                } else {
                    audio.pause();
                    playPauseBtn.classList.add('paused');
                    playPauseBtn.innerHTML = '&#9654;';
                    playButton.innerHTML = "&#9654; Jouer Audio";
                }
            }
        
            function closeAudioBar() {
                audio.pause();
                audioBar.classList.add('hidden');
                playPauseBtn.innerHTML = '&#9654;';
                playButton.innerHTML = "&#9654; Jouer Audio";
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
            
        }        
    


    document.addEventListener("keydown", function (event) {
        // Escape : fermer les versets si affichés
        if (event.key === "Escape") {
            if (verseContainer.style.display === "block") {
                goBackToMain();
            }
        }   
    });

    function goBackToMain() {
        scrollToTop(true);
        verseContainer.style.display = "none";
        document.querySelector('.main-content').style.display = "flex";
        searchInput.style.display = "block";
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.style.display = 'flex';
            searchContainer.style.justifyContent = 'center';
            searchContainer.style.alignItems = 'center';
            searchContainer.style.width = '100%';
        }
        if (topBar) {
            const container = topBar.querySelector(".button-container");
            if (container) container.style.display = 'none';
        }
        const header = document.querySelector("header");
        if (header) header.style.display = "block";
        backButton.style.display = "none";
    }

    backButton.addEventListener("click", goBackToMain); 
        
    }
        )}});

    