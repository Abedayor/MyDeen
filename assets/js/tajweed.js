document.addEventListener("DOMContentLoaded", () => {    
    // Initialisation des éléments du DOM
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

    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "midnight-blue");

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
                    // Redirige vers la racine si langue sélectionnée est l'anglais
                    redirectPath = isInLangFolder
                        ? `../../../arab/tajweed/tajweed.html`
                        : `../../arab/tajweed/tajweed.html`;
                } else {
                    // Redirige vers un dossier langue si on passe en fr, ar, etc.
                    redirectPath = isInLangFolder
                        ? `../../../${selectedLang}/arab/tajweed/tajweed.html`
                        : `../../${selectedLang}/arab/tajweed/tajweed.html`;
                }

                window.location.href = redirectPath;
            });
        });

    }
});