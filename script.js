document.addEventListener("DOMContentLoaded", () => {
    const topBar = document.querySelector(".top-bar");
    if (topBar) {
        const container = topBar.querySelector(".button-container");
        if (container) container.innerHTML = "";
    }

    const searchInput = document.getElementById("searchInput");
    const surahCards = document.querySelectorAll(".surah");
    const backButton = document.getElementById("backButton");
    const surahTitle = document.getElementById("surahTitle");
    const versesDiv = document.getElementById("verses");
    const mainContent = document.querySelector(".sourates");
    const verseContainer = document.getElementById("verseContainer");

    let currentSurahData = [];
    let currentAudioPath = "";

    function normalizeString(str) {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/\s+/g, "-");
    }

    function decodeHTMLEntities(str) {
        const element = document.createElement('div');
        element.innerHTML = str;
        return element.textContent || element.innerText;
    }

    function getVerseNumberSymbol(number) {
        const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
        return number.toString().split('').map(digit => arabicNumbers[digit]).join('');
    }

    function updatePlayPauseButton(isPlaying) {
        if (isPlaying) {
            playPauseBtn.classList.remove("paused");
            playPauseBtn.classList.add("playing");
        } else {
            playPauseBtn.classList.remove("playing");
            playPauseBtn.classList.add("paused");
        }
        updateAllAudioButtons(isPlaying);
    }
    
    function updateAllAudioButtons(isPlaying) {
        const buttons = document.querySelectorAll('.audio-button');
        buttons.forEach(btn => {
            btn.innerHTML = isPlaying
                ? `<span class="triangle">&#10073;&#10073;</span> <span class="lance-audio">Pauser audio</span>`
                : `<span class="triangle">&#9654;</span> <span class="lance-audio">Lancer audio</span>`;
        });
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

    function showTranslation(surahData) {
        scrollToTop(true);
        versesDiv.innerHTML = '';
        versesDiv.style.flexDirection = 'row';

        const existingBasmala = document.querySelector(".basmala");
        if (existingBasmala) existingBasmala.remove();

        const existingAudioBtn = document.querySelector(".audio-button-container");
        if (existingAudioBtn) existingAudioBtn.remove();

        if (surahTitle.textContent !== "الفاتحة" && surahTitle.textContent !== "التوبة") {
            const basmalaDiv = document.createElement("div");
            basmalaDiv.classList.add("basmala");
            basmalaDiv.innerHTML = `<span>﷽</span>`;
            verseContainer.insertBefore(basmalaDiv, versesDiv);
        }

        const audioButtonDiv = document.createElement("div");
        audioButtonDiv.classList.add("audio-button-container");
        const audioButton = document.createElement("button");
        audioButton.classList.add("audio-button");
        audioButton.innerHTML = `<span class="triangle">&#9654;</span> <span class="lance-audio">Lancer audio</span>`;

        audioButton.addEventListener("click", () => {
            if (currentAudioPath) {
                if (audio.paused || audio.currentTime === 0) {
                    if (audio.currentTime === 0) {
                        audioBar.style.display = 'flex';
                        playSurahAudio(currentAudioPath);
                    }
                    audio.play();
                    updatePlayPauseButton(true);

                } else {
                    audio.pause();
                    updatePlayPauseButton(false);

                }
            }
        });

        audioButtonDiv.appendChild(audioButton);
        const basmalaDiv = document.querySelector(".basmala");
        if (basmalaDiv) {
            basmalaDiv.after(audioButtonDiv);
        } else {
            verseContainer.insertBefore(audioButtonDiv, versesDiv);
        }

        versesDiv.classList.remove('verses-reading');
        versesDiv.classList.add('verses-translation');

        const header = document.querySelector("header");
        if (header) header.style.display = "none";

        surahData.forEach(verse => {
            if (verse.arabic && verse.translation) {
                const verseNumberSymbol = verse.verse ? getVerseNumberSymbol(verse.verse) : '';

                const verseElement = document.createElement('div');
                verseElement.classList.add('verse');
                verseElement.innerHTML =
                    `<div class="arabic-text" style="text-align: right; direction: rtl;">
                        <span class='arabe-only'>${verse.arabic}</span>
                        <div class="fin-verse">
                            <span class="rond">&#x06DD;</span>
                            <span class="num-verse">${verseNumberSymbol}</span>
                        </div>
                    </div>
                    <div class="verse-details" style="display: flex; align-items: center; gap: 12px;">
                        <p class="verse-translation" style="flex: 1;">${verse.translation}</p>
                    </div>`;

                versesDiv.appendChild(verseElement);
            }
        });

        verseContainer.style.display = "block";
        mainContent.style.display = "none";
        searchInput.style.display = "none";
        backButton.style.display = "block";
        verseContainer.scrollIntoView({ behavior: "smooth" });
    }

    function showArabic(surahData) {
        scrollToTop(true);
        versesDiv.innerHTML = '';

        versesDiv.classList.remove('verses-translation');
        versesDiv.classList.add('verses-reading');

        const verseContainerFlex = document.createElement("div");
        verseContainerFlex.classList.add("verse-container-flex");
        versesDiv.appendChild(verseContainerFlex);

        surahData.forEach((verse, index) => {
            if (verse.arabic) {
                const verseNumberSymbol = verse.verse ? getVerseNumberSymbol(verse.verse) : '';

                const verseElement = document.createElement('span');
                verseElement.classList.add('verse-reading');
                verseElement.innerHTML =
                    `<span class="arabic-text" style="text-align: right; direction: rtl;">
                        <span class="arabe-only">${verse.arabic}</span>
                        <span class="fin-verse">
                            <span class="rond">&#x06DD;</span>
                            <span class="num-verse">${verseNumberSymbol}</span>
                        </span>
                    </span>`;

                if (index === surahData.length - 1) {
                    verseElement.style.display = 'block';
                    verseElement.style.width = '100%';
                    verseElement.style.textAlign = 'center';
                    verseElement.style.justifyContent = 'center';
                }

                verseContainerFlex.appendChild(verseElement);
            }
        });

        backButton.style.display = "block";
    }

    function setActiveButton(activeButton) {
        const buttons = document.querySelectorAll(".button-container button");
        buttons.forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    }

    function createViewButtons() {
        const topBar = document.querySelector(".top-bar");
        if (!topBar) return;

        const container = topBar.querySelector(".button-container");
        container.innerHTML = "";

        const translationButton = document.createElement("button");
        translationButton.textContent = "Traduction";
        translationButton.classList.add("active");

        const readingButton = document.createElement("button");
        readingButton.textContent = "Lecture";

        translationButton.addEventListener("click", () => {
            showTranslation(currentSurahData);
            setActiveButton(translationButton);
        });

        readingButton.addEventListener("click", () => {
            showArabic(currentSurahData);
            setActiveButton(readingButton);
        });

        container.appendChild(translationButton);
        container.appendChild(readingButton);
    }

    // === Contrôle Audio Global ===
    const audioBar = document.querySelector('.audio-bar');
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('duration');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');


    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function playSurahAudio(audioPath) {
        if (audioBar) {
            audio.src = audioPath;
            audioBar.classList.remove('hidden');
            audioBar.classList.add('visible');
            audio.play();
        } else {
            console.error("audio-bar n'a pas été trouvé !");
        }
    }

    audio.addEventListener('loadedmetadata', () => {
        if (audio.duration && !isNaN(audio.duration)) {
            totalTimeEl.textContent = formatTime(audio.duration);
            seekBar.max = audio.duration;
        }
    });

    audio.addEventListener('canplaythrough', () => {
        if (audio.duration && !isNaN(audio.duration)) {
            totalTimeEl.textContent = formatTime(audio.duration);
            seekBar.max = audio.duration;
        }
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration && !isNaN(audio.duration)) {
            currentTimeEl.textContent = formatTime(audio.currentTime);
            seekBar.value = audio.currentTime;
        }
    });

    seekBar.addEventListener('input', () => {
        if (audio && !audio.paused) {
            audio.currentTime = seekBar.value;
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            updatePlayPauseButton(true);
        } else {
            audio.pause();
            updatePlayPauseButton(false);
        }
    });
    
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            audio.currentTime = Math.max(0, audio.currentTime - 3);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 3);
        });
    }
    

    const closeBtn = document.getElementById('close-btn');

    function closeAudio() {
                audio.pause();
                audio.currentTime = 0;
                audioBar.style.display = 'none';
                updatePlayPauseButton(false);
    }

    surahCards.forEach(card => {
        card.addEventListener("click", () => {
            let rawData = card.getAttribute("data-verses");
            if (!rawData || rawData.trim() === "") return;

            let surahName = card.querySelector(".arabic").textContent;
            surahTitle.textContent = surahName;

            const decodedData = decodeHTMLEntities(rawData);
            currentAudioPath ="https://abedayor.github.io/MyDeen/audio/"  + card.getAttribute("data-audio");

            try {
                currentSurahData = JSON.parse(decodedData);
                showTranslation(currentSurahData);
                createViewButtons();
            } catch (error) {
                console.error("Erreur de parsing des données:", error);
            }
        });
    });
    
    const noResultsDiv = document.querySelector(".no-results");
    if (noResultsDiv) {
        noResultsDiv.style.display = "none";
    }
    

    searchInput.addEventListener("input", () => {
        const query = normalizeString(searchInput.value.toLowerCase());
        let foundResults = false;

        surahCards.forEach(card => {
            const surahName = normalizeString(card.querySelector("h3").textContent.toLowerCase());
            const surahDesc = normalizeString(card.querySelector(".numero-sourate").textContent.toLowerCase());

            if (surahName.includes(query) || surahDesc.includes(query)) {
                card.style.display = "flex";
                foundResults = true;
            } else {
                card.style.display = "none";
            }
        });

        if (noResultsDiv) {
            noResultsDiv.style.display = foundResults ? "none" : "block";
        }
    });

    // Dans le DOMContentLoaded
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        closeAudio();
    });
}

document.addEventListener("keydown", function (event) {
    // Escape : fermer les versets si affichés
    if (event.key === "Escape") {
        if (verseContainer.style.display === "block") {
            goBackToMain();
        } else if (audioBar.style.display !== "none") {
            closeAudio();
        }
    }

        // Flèche droite : avance de 3 secondes
    if (event.key === "ArrowRight" && audioBar.style.display !== "none") {
            event.preventDefault();
            nextBtn?.click(); // Simule un clic sur le bouton "next"
    }
    
        // Flèche gauche : recule de 3 secondes
    if (event.key === "ArrowLeft" && audioBar.style.display !== "none") {
            event.preventDefault();
            prevBtn?.click(); // Simule un clic sur le bouton "prev"
    }
    
    if (event.key === " " && audioBar.style.display !== "none") {
        // Ne pas bloquer si on est dans un champ de saisie
        const activeElement = document.activeElement;
        const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
    
        if (!isInput) {
            event.preventDefault();
            if (audio.paused) {
                audio.play();
                updatePlayPauseButton(true);
            } else {
                audio.pause();
                updatePlayPauseButton(false);
            }
        }
    }    
});

    function goBackToMain() {
        scrollToTop(true);
        verseContainer.style.display = "none";
        mainContent.style.display = "flex";
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
            if (container) container.innerHTML = "";
        }
        const header = document.querySelector("header");
        if (header) header.style.display = "block";
        backButton.style.display = "none";
    }

    if (backButton) {
        backButton.addEventListener("click", goBackToMain);
    }
})
