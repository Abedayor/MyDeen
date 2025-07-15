document.addEventListener("DOMContentLoaded", () => {
    initSettingsMenuEvents();
    const topBar = document.querySelector(".top-bar");
    const souratesContainer = document.querySelector(".sourates");
    const searchInput = document.getElementById("searchInput");
    const noResults = document.querySelector(".no-results");

    // --- VARIABLES GLOBALES ---
    let allSurahs = [];
    let currentOrder = "normal"; 

    // --- GESTION DES LANGUES ---
    const translations = {
        en: {
            settings: "Settings",
            theme: "Theme",
            searchPlaceholder: "Search for a surah...",
            noResults: "No surah found.",
            signesBtn: "Stopping and Linking Signs in the Quran",
            aboutTitle: "About",
            aboutText: "Educational app dedicated to learning the Arabic alphabet and the Quran.",
            usefulLinks: "Useful Links",
            alphabetLink: "Alphabet",
            aTranslation: "Translation by",
            HeroTitre: "Discover all the surahs and the Arabic alphabet",
            expSitePara1: "Welcome to <strong>MyDeenBook.com</strong>, your space dedicated to discovering and learning the beautiful Arabic language, reading the Quran online, and sacred teachings.\n\
            Find here all the Quranic surahs online with translations to choose from, surah in revelation order as well as the Quran in audio for a clear and faithful recitation.\n\
            Explore our comprehensive guide to <a href=\"LearnArab/Alphabet/alphabet.html\">learning the Arabic alphabet</a> easily, ideal for beginners and enthusiasts who want to deepen their understanding.\n\
            Whether you are looking for free Quran reading, French Quran translation, or to listen to the Quran recitation online,\n\
            MyDeenBook supports you with clear, accessible, and free resources.\n\
            Whether you are a novice or already initiated, our platform helps you learn the Quran online, listen to surahs, and discover Quranic tafsir to nourish your faith and knowledge.\n\
            Make each visit an opportunity to grow in knowledge and spirituality.",
            donSection: {
                donTitle: "Support the MyDeenBook project and contribute to my marriage",
                donPara1: "If you like this site and it helps you in your learning, you can support its development by making a donation. Every contribution, big or small, is precious to continue offering free content, improve the site, and personally help me with this important project.",
                donPara2: "Your donations also help me realize an important dream: getting married and building a future with my wife to provide for her needs and to be able to start a family without putting them in difficulty.",
                donPara3: "You can make a secure donation via PayPal by clicking the button below:",
                donPaypalLink: "PayPal",
                donPara4: "Thank you from the bottom of my heart for your support and trust. May Allah reward you abundantly. Barak Allahu fik!"
                },
            hadithSection: {
            title: "Inspiring Hadith",
            quote: `The Prophet ﷺ said: "Whoever shows the way to goodness will have the same reward as the one who follows it, without decreasing their rewards in any way."`,
            source: "[Muslim, Riyad as-Salihin 174]",
            
        },
        SocialTitle: "Our Social Media",
        "btn-normal": "Mushaf Order",
        "btn-revelation": "Revelation Order",
        },
        fr: {
            settings: "Paramètres",
            theme: "Thème",
            searchPlaceholder: "Rechercher une sourate...",
            noResults: "Aucune sourate trouvée.",
            signesBtn: "Les Signes d'arrêt et de liaison du Quran",
            aboutTitle: "À propos",
            aboutText: "Application éducative dédiée à l'apprentissage de l'alphabet arabe et du Coran.",
            usefulLinks: "Liens utiles",
            alphabetLink: "Alphabet",
            aTranslation: `Traduction de`,
            HeroTitre: "Découvre toutes les sourates et l’alphabet arabe",
            expSitePara1: "Bienvenue sur <strong> MyDeenBook.com </strong>, votre espace dédié à la découverte et à l’apprentissage de la belle langue arabe, de la lecture du Coran en ligne, et des enseignements sacrés.\n\
            Retrouvez ici toutes les sourates du Coran en ligne avec traduction au choix, les sourates dans l'ordre de révélation ainsi que le Coran en audio pour une récitation claire et fidèle.\n\
            Explorez notre guide complet pour <a href=\"LearnArab/Alphabet/alphabet.html\">apprendre l’alphabet arabe</a> facilement, idéal pour débutants et passionnés qui souhaitent approfondir leur compréhension.\n\
            Que vous cherchiez une lecture coranique gratuite, une traduction coran en français ou écouter la récitation du Coran en ligne, MyDeenBook vous accompagne avec des ressources claires, accessibles et gratuites.\n\
            Que vous soyez novice ou déjà initié, notre plateforme vous aide à apprendre le Coran en ligne, écouter des sourates, et découvrir le tafsir coranique pour nourrir votre foi et votre savoir.\n\
            Faites de chaque visite une occasion de grandir dans la connaissance et la spiritualité.",
            donSection: {
                donTitle: "Supporte le projet MyDeenBook et contribue à mon mariage",
                donPara1: "Si ce site te plaît et t’aide dans ton apprentissage, tu peux soutenir son développement par un don. Chaque contribution, petite ou grande, est précieuse pour continuer à proposer du contenu gratuit, améliorer le site, et m’aider personnellement dans ce projet important.",
                donPara2: "Vos dons m’aident aussi à concrétiser un rêve important : me marier et construire mon avenir avec ma femme pour subvenir à ses besoins et à pouvoir fonder une famille sans les mettre dans la difficulté.",
                donPara3: "Tu peux faire un don sécurisé via PayPal en cliquant sur le bouton ci-dessous :",
                donPaypalLink: "PayPal",
                donPara4: "Merci du fond du cœur pour ton soutien et ta confiance. Qu’Allah te récompense abondamment. Barak Allahu fik!"
                },
            hadithSection: {
            title: "Hadith inspirant",
            quote: `Le Prophète ﷺ a dit : « Celui qui montre une bonne voie à suivre aura la même récompense que celui qui l’emprunte, sans que cela ne diminue en rien leurs récompenses respectives. »`,
            source: "[Muslim, Riyad as-Salihin 174]",
            },
            SocialTitle: "Nos réseaux sociaux",
            "btn-normal": "Ordre du Mushaf",
            "btn-revelation": "Ordre de révélation",
            },
        de: {
            settings: "Einstellungen",
            theme: "Thema",
            searchPlaceholder: "Nach einer Sure suchen...",
            noResults: "Keine Sure gefunden.",
            signesBtn: "Stopp- und Verbindungszeichen im Koran",
            aboutTitle: "Über uns",
            aboutText: "Bildungs-App zum Erlernen des arabischen Alphabets und des Korans.",
            usefulLinks: "Nützliche Links",
            alphabetLink: "Alphabet",
            aTranslation: `Übersetzung von`,
            HeroTitre: "Entdecke alle Suren und das arabische Alphabet",
            expSitePara1: "Willkommen bei <strong>MyDeenBook.com</strong>, deinem Raum zur Entdeckung und zum Lernen der schönen arabischen Sprache,\n\
            zum Online-Lesen des Korans und der heiligen Lehren.\n\
            Finde hier alle Suren des Korans online mit wählbarer Übersetzung,  Die Suren in der Reihenfolge der Offenbarung sowie den Koran als Audio\n\
            für eine klare und treue Rezitation.\n\
            Erkunde unseren umfassenden Leitfaden zum <a href=\"LearnArab/Alphabet/alphabet.html\">Erlernen des arabischen Alphabets</a>,\n\
            ideal für Anfänger und Interessierte, die ihr Verständnis vertiefen möchten.\n\
            Ob du eine kostenlose Koranlesung, eine französische Koranübersetzung suchst oder die Rezitation online hören möchtest,\n\
            MyDeenBook unterstützt dich mit klaren, zugänglichen und kostenlosen Ressourcen.\n\
            Egal, ob du Anfänger oder bereits fortgeschritten bist, unsere Plattform hilft dir, den Koran online zu lernen, Suren anzuhören\n\
            und den koranischen Tafsir zu entdecken, um deinen Glauben und dein Wissen zu stärken.\n\
            Mach jeden Besuch zu einer Gelegenheit, in Wissen und Spiritualität zu wachsen.",
            donSection: {
                donTitle: "Unterstütze das Projekt MyDeenBook und trage zu meiner Hochzeit bei",
                donPara1: "Wenn dir diese Seite gefällt und dir beim Lernen hilft, kannst du ihre Entwicklung mit einer Spende unterstützen. Jeder Beitrag, ob klein oder groß, ist wertvoll, um weiterhin kostenlosen Inhalt anzubieten, die Seite zu verbessern und mich persönlich bei diesem wichtigen Projekt zu unterstützen.",
                donPara2: "Deine Spenden helfen mir auch, einen wichtigen Traum zu verwirklichen: zu heiraten und mit meiner Frau eine Zukunft aufzubauen, um für sie zu sorgen und eine Familie zu gründen, ohne sie in Schwierigkeiten zu bringen.",
                donPara3: "Du kannst eine sichere Spende über PayPal tätigen, indem du auf den untenstehenden Button klickst:",
                donPaypalLink: "PayPal",
                donPara4: "Danke von ganzem Herzen für deine Unterstützung und dein Vertrauen. Möge Allah dich reichlich belohnen. Barak Allahu fik!"
            },
             hadithSection: {
                title: "Inspirierender Hadith",
                quote: `Der Prophet ﷺ sagte: "Wer den Weg zum Guten weist, erhält dieselbe Belohnung wie derjenige, der ihm folgt, ohne dass die Belohnungen der beiden dadurch gemindert werden."`,
                source: "[Muslim, Riyad as-Salihin 174]"
            },
            SocialTitle: "Unsere sozialen Netzwerke",
            "btn-normal": "Mushaf-Reihenfolge",
            "btn-revelation": "Offenbarungsreihenfolge",
            },
        es: {
            settings: "Configuraciones",
            theme: "Tema",
            searchPlaceholder: "Buscar una sura...",
            noResults: "No se encontró ninguna sura.",
            signesBtn: "Signos de parada y enlace en el Corán",
            aboutTitle: "Acerca de",
            aboutText: "Aplicación educativa dedicada al aprendizaje del alfabeto árabe y del Corán.",
            usefulLinks: "Enlaces útiles",
            alphabetLink: "Alfabeto",
            aTranslation: `Traducción de`,
            HeroTitre: "Descubre todas las suras y el alfabeto árabe",
            expSitePara1: "Bienvenido a <strong>MyDeenBook.com</strong>, tu espacio dedicado a descubrir y aprender la hermosa lengua árabe,\n\
            la lectura del Corán en línea y las enseñanzas sagradas.\n\
            Encuentra aquí todas las suras del Corán en línea con traducción a elegir, las suras en el orden de la revelació así como el Corán en audio\n\
            para una recitación clara y fiel.\n\
            Explora nuestra guía completa para <a href=\"LearnArab/Alphabet/alphabet.html\">aprender el alfabeto árabe</a> fácilmente,\n\
            ideal para principiantes y entusiastas que desean profundizar su comprensión.\n\
            Ya sea que busques una lectura gratuita del Corán, traducción al francés del Corán o escuchar la recitación del Corán en línea,\n\
            MyDeenBook te acompaña con recursos claros, accesibles y gratuitos.\n\
            Ya seas novato o ya iniciado, nuestra plataforma te ayuda a aprender el Corán en línea, escuchar suras,\n\
            y descubrir el tafsir coránico para nutrir tu fe y tu conocimiento.\n\
            Haz de cada visita una oportunidad para crecer en conocimiento y espiritualidad.",

            donSection: {
                donTitle: "Apoya el proyecto MyDeenBook y contribuye a mi matrimonio",
                donPara1: "Si te gusta este sitio y te ayuda en tu aprendizaje, puedes apoyar su desarrollo con una donación. Cada contribución, grande o pequeña, es valiosa para continuar ofreciendo contenido gratuito, mejorar el sitio y ayudarme personalmente con este importante proyecto.",
                donPara2: "Tus donaciones también me ayudan a realizar un sueño importante: casarme y construir un futuro con mi esposa para proveer sus necesidades y poder formar una familia sin ponerlas en dificultad.",
                donPara3: "Puedes hacer una donación segura a través de PayPal haciendo clic en el botón a continuación:",
                donPaypalLink: "PayPal",
                donPara4: "Gracias de todo corazón por tu apoyo y confianza. Que Allah te recompense abundantemente. Barak Allahu fik!"
                },
            hadithSection: {
                    title: "Hadiz Inspirador",
                    quote: `El Profeta ﷺ dijo: "Quien muestre el camino hacia el bien tendrá la misma recompensa que quien lo siga, sin que eso disminuya sus respectivas recompensas."`,
                    source: "[Muslim, Riyad as-Salihin 174]"
                },
            SocialTitle: "Nuestras redes sociales",
            "btn-normal": "Orden Mushaf",
            "btn-revelation": "Orden de revelación",
        },
        it: {
            settings: "Impostazioni",
            theme: "Tema",
            searchPlaceholder: "Cerca una sura...",
            noResults: "Nessuna sura trovata.",
            signesBtn: "Segni di arresto e collegamento nel Corano",
            aboutTitle: "Informazioni",
            aboutText: "Applicazione educativa dedicata all'apprendimento dell'alfabeto arabo e del Corano.",
            usefulLinks: "Link utili",
            alphabetLink: "Alfabeto",
            aTranslation: `Traduzione di`,
            HeroTitre: "Scopri tutte le sure e l'alfabeto arabo",
            expSitePara1: "Benvenuto su <strong>MyDeenBook.com</strong>, il tuo spazio dedicato alla scoperta e all’apprendimento della bellissima lingua araba,\n\
            alla lettura del Corano online e agli insegnamenti sacri.\n\
            Trova qui tutte le sure del Corano online con traduzioni a scelta, le sure nell'ordine della rivelazione, oltre al Corano in audio\n\
            per una recitazione chiara e fedele.\n\
            Esplora la nostra guida completa per <a href=\"LearnArab/Alphabet/alphabet.html\">imparare l’alfabeto arabo</a> facilmente,\n\
            ideale per principianti e appassionati che desiderano approfondire la loro comprensione.\n\
            Che tu stia cercando una lettura coranica gratuita, una traduzione del Corano in francese o ascoltare la recitazione online,\n\
            MyDeenBook ti accompagna con risorse chiare, accessibili e gratuite.\n\
            Sia che tu sia un principiante o già esperto, la nostra piattaforma ti aiuta ad imparare il Corano online, ascoltare le sure\n\
            e scoprire il tafsir coranico per nutrire la tua fede e la tua conoscenza.\n\
            Fai di ogni visita un’occasione per crescere nella conoscenza e nella spiritualità.",
            donSection: {
                donTitle: "Sostieni il progetto MyDeenBook e contribuisci al mio matrimonio",
                donPara1: "Se ti piace questo sito e ti aiuta nel tuo apprendimento, puoi sostenere il suo sviluppo con una donazione. Ogni contributo, grande o piccolo, è prezioso per continuare a offrire contenuti gratuiti, migliorare il sito e aiutarmi personalmente in questo importante progetto.",
                donPara2: "Le tue donazioni mi aiutano anche a realizzare un sogno importante: sposarmi e costruire un futuro con mia moglie per provvedere alle sue necessità e poter fondare una famiglia senza metterle in difficoltà.",
                donPara3: "Puoi fare una donazione sicura tramite PayPal cliccando sul pulsante qui sotto:",
                donPaypalLink: "PayPal",
                donPara4: "Grazie di cuore per il tuo supporto e la tua fiducia. Che Allah ti ricompensi abbondantemente. Barak Allahu fik!"
                },
        hadithSection: {
            title: "Hadith Ispiratore",
            quote: `Il Profeta ﷺ disse: "Chi indica la via del bene avrà la stessa ricompensa di chi la segue, senza che ciò diminuisca in alcun modo le rispettive ricompense."`,
            source: "[Muslim, Riyad as-Salihin 174]"
        },
        SocialTitle: "I nostri social",
        "btn-normal": "Ordine Mushaf",
        "btn-revelation": "Ordine di rivelazione",
        },
        pt: {
            settings: "Configurações",
            theme: "Tema",
            searchPlaceholder: "Pesquisar uma sura...",
            noResults: "Nenhuma sura encontrada.",
            signesBtn: "Sinais de parada e ligação no Alcorão",
            aboutTitle: "Sobre",
            aboutText: "Aplicativo educativo dedicado ao aprendizado do alfabeto árabe e do Alcorão.",
            usefulLinks: "Links úteis",
            alphabetLink: "Alfabeto",
            aTranslation: `Tradução de`,
            HeroTitre: "Descubra todas as suratas e o alfabeto árabe",
            expSitePara1: "Bem-vindo ao <strong>MyDeenBook.com</strong>, seu espaço dedicado à descoberta e ao aprendizado da bela língua árabe,\n\
            à leitura do Alcorão online e aos ensinamentos sagrados.\n\
            Encontre aqui todas as suratas do Alcorão online com tradução à escolha, as suras na ordem da revelação assim como o Alcorão em áudio\n\
            para uma recitação clara e fiel.\n\
            Explore nosso guia completo para <a href=\"LearnArab/Alphabet/alphabet.html\">aprender o alfabeto árabe</a> facilmente,\n\
            ideal para iniciantes e entusiastas que desejam aprofundar sua compreensão.\n\
            Se você procura uma leitura gratuita do Alcorão, tradução em francês ou ouvir a recitação do Alcorão online,\n\
            MyDeenBook acompanha você com recursos claros, acessíveis e gratuitos.\n\
            Quer seja iniciante ou já iniciado, nossa plataforma ajuda você a aprender o Alcorão online, ouvir suratas\n\
            e descobrir o tafsir corânico para nutrir sua fé e seu conhecimento.\n\
            Faça de cada visita uma oportunidade para crescer em conhecimento e espiritualidade.",
            donSection: {
                donTitle: "Apoie o projeto MyDeenBook e contribua para meu casamento",
                donPara1: "Se você gosta deste site e ele ajuda no seu aprendizado, você pode apoiar seu desenvolvimento com uma doação. Toda contribuição, grande ou pequena, é preciosa para continuar oferecendo conteúdo gratuito, melhorar o site e me ajudar pessoalmente neste importante projeto.",
                donPara2: "Suas doações também me ajudam a realizar um sonho importante: casar e construir um futuro com minha esposa para prover suas necessidades e poder formar uma família sem colocá-las em dificuldades.",
                donPara3: "Você pode fazer uma doação segura via PayPal clicando no botão abaixo:",
                donPaypalLink: "PayPal",
                donPara4: "Obrigado do fundo do meu coração pelo seu apoio e confiança. Que Allah te recompense abundantemente. Barak Allahu fik!"
                },
            hadithSection: {
                title: "Hadith Inspirador",
                quote: `O Profeta ﷺ disse: "Quem mostrar o caminho do bem terá a mesma recompensa de quem o seguir, sem que isso diminua em nada as respectivas recompensas."`,
                source: "[Muslim, Riyad as-Salihin 174]"
            },
            SocialTitle: "Nossas redes sociais",
            "btn-normal": "Ordem do Mushaf",
            "btn-revelation": "Ordem da Revelação"
        },
        tr: {
            settings: "Ayarlar",
            theme: "Tema",
            searchPlaceholder: "Bir sure arayın...",
            noResults: "Hiçbir sure bulunamadı.",
            signesBtn: "Kur'an'daki Durdurma ve Bağlama İşaretleri",
            aboutTitle: "Hakkında",
            aboutText: "Arap alfabesi ve Kur'an öğrenimine adanmış eğitim uygulaması.",
            usefulLinks: "Faydalı bağlantılar",
            alphabetLink: "Alfabe",
            aTranslation: `tarafından çeviri`,
            HeroTitre: "Tüm sureleri ve Arap alfabesini keşfedin",
            expSitePara1: "<strong>MyDeenBook.com</strong>’a hoş geldiniz, Arapça’nın güzel dilini keşfetmek ve öğrenmek,\n\
            Kur’an-ı Kerim’i çevrimiçi okumak ve kutsal öğretileri takip etmek için özel alanınız.\n\
            Tüm Kur’an surelerini çeviri seçenekleriyle, vahiy sırasına göre ve sesli olarak burada bulabilirsiniz; net ve doğru bir tilavet için.\n\
            <a href=\"LearnArab/Alphabet/alphabet.html\">Arap alfabesini öğrenmek</a> için kapsamlı rehberimizi keşfedin,\n\
            başlangıç seviyesindekiler ve bilgilerini derinleştirmek isteyenler için idealdir.\n\
            Ücretsiz Kur’an okuması, Fransızca Kur’an çevirisi veya çevrimiçi Kur’an tilaveti dinlemek istiyorsanız,\n\
            MyDeenBook size net, erişilebilir ve ücretsiz kaynaklarla eşlik eder.\n\
            İster yeni başlayan olun ister daha deneyimli, platformumuz Kur’an’ı çevrimiçi öğrenmenize, sureleri dinlemenize ve\n\
            imanınızı ve bilginizi beslemek için Kur’an tefsirini keşfetmenize yardımcı olur.\n\
            Her ziyareti bilgi ve maneviyatta büyüme fırsatına dönüştürün.",
            donSection: {
                donTitle: "MyDeenBook projesini destekleyin ve evliliğime katkıda bulunun",
                donPara1: "Bu siteyi beğendiyseniz ve öğrenmenize yardımcı oluyorsa, gelişimini bağış yaparak destekleyebilirsiniz. Büyük ya da küçük her katkı, ücretsiz içerik sunmaya devam etmek, siteyi geliştirmek ve bu önemli projede bana kişisel olarak yardımcı olmak için değerlidir.",
                donPara2: "Bağışlarınız ayrıca önemli bir hayalimi gerçekleştirmeme yardımcı oluyor: evlenmek ve eşimle birlikte ihtiyaçlarını karşılayıp zor durumda bırakmadan bir aile kurmak için bir gelecek inşa etmek.",
                donPara3: "Aşağıdaki butona tıklayarak PayPal üzerinden güvenli bir bağış yapabilirsiniz:",
                donPaypalLink: "PayPal",
                donPara4: "Desteğiniz ve güveniniz için yürekten teşekkür ederim. Allah sizi bol bol mükâfatlandırsın. Barak Allahu fik!"
                },
            hadithSection: {
                title: "İlham Verici Hadis",
                quote: `Peygamber ﷺ şöyle buyurdu: "İyiliğe götüren yolu gösteren kimse, onu takip eden kişiyle aynı mükafata sahip olur, bu onların mükafatlarını hiçbir şekilde eksiltmez."`,
                source: "[Muslim, Riyad as-Salihin 174]"
            },
            SocialTitle: "Sosyal ağlarımız",
            "btn-normal": "Mushaf Sırası",
            "btn-revelation": "Vahiy Sırası",
        },
        ar: {
            settings: "الإعدادات",
            theme: "المظهر",
            searchPlaceholder: "ابحث عن سورة...",
            noResults: "لم يتم العثور على أي سورة.",
            signesBtn: "علامات الوقف والوصل في القرآن",
            aboutTitle: "حول التطبيق",
            aboutText: "تطبيق تعليمي مخصص لتعلم الحروف العربية والقرآن الكريم.",
            usefulLinks: "روابط مفيدة",
            alphabetLink: "الحروف",
            aTranslation: `ترجمة`,
            HeroTitre: "اكتشف جميع السور والأبجدية العربية",
            expSitePara1: "مرحبًا بكم في <strong>MyDeenBook.com</strong>، مساحتكم المخصصة لاكتشاف وتعلم اللغة العربية الجميلة، وقراءة القرآن الكريم عبر الإنترنت، والتعليمات المقدسة.\n\
            اعثر هنا على جميع سور القرآن الكريم عبر الإنترنت مع ترجمات للاختيار منها، بالإضافة إلى القرآن الصوتي للتلاوة الواضحة والأمينة، والسور مرتبة حسب ترتيب النزول.\n\
            استكشف دليلنا الكامل لـ <a href=\"LearnArab/Alphabet/alphabet.html\">تعلم الأبجدية العربية</a> بسهولة، وهو مثالي للمبتدئين والهواة الذين يرغبون في تعميق فهمهم.\n\
            سواء كنت تبحث عن قراءة مجانية للقرآن، أو ترجمة للقرآن بالفرنسية، أو الاستماع إلى تلاوة القرآن عبر الإنترنت، يدعمك MyDeenBook بموارد واضحة، ومتاحة ومجانية.\n\
            سواء كنت مبتدئًا أو متمرسًا، تساعدك منصتنا على تعلم القرآن عبر الإنترنت، والاستماع إلى السور، واكتشاف تفسير القرآن لتغذية إيمانك ومعرفتك.\n\
            اجعل كل زيارة فرصة للنمو في المعرفة والروحانية.",
            donSection: {
                donTitle: "ادعم مشروع MyDeenBook وساهم في زواجي",
                donPara1: "إذا أعجبك هذا الموقع وساعدك في التعلم، يمكنك دعم تطويره بالتبرع. كل مساهمة، كبيرة كانت أو صغيرة، ثمينة للاستمرار في تقديم محتوى مجاني، وتحسين الموقع، ولمساعدتي شخصيًا في هذا المشروع المهم.",
                donPara2: "تبرعاتك تساعدني أيضًا على تحقيق حلم مهم: الزواج وبناء مستقبل مع زوجتي لتلبية احتياجاتها والقدرة على تأسيس أسرة دون وضعهم في ضيق.",
                donPara3: "يمكنك التبرع بأمان عبر باي بال بالنقر على الزر أدناه:",
                donPaypalLink: "باي بال",
                donPara4: "شكرًا من القلب على دعمك وثقتك. جزاك الله خيرًا جزاءً واسعًا. بارك الله فيك!"
                },
            hadithSection: {
                title: "حديث ملهم",
                quote: `قال النبي ﷺ: «مَن دلَّ على خيرٍ فله مثل أجر فاعله، لا ينقص ذلك من أجرهما شيئاً»`,
                source: "[مسلم، رياض الصالحين 174]"
            }, 
            SocialTitle: "وسائل التواصل الاجتماعي الخاصة بنا",
            "btn-normal": "ترتيب المصحف",
            "btn-revelation": "ترتيب النزول",
            }
        }
    
    function applyTranslations() {
        const lang = localStorage.getItem("language") || "en";
        const t = translations[lang];

        if (lang === 'ar') {
            document.body.classList.add('lang-ar');
        } else {
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

        const HeroTitre = document.getElementById('HeroTitre')
        if (HeroTitre) HeroTitre.textContent = t.HeroTitre

        const expSitePara1 = document.getElementById('expSitePara1')
        if (expSitePara1) expSitePara1.innerHTML = t.expSitePara1

        const donTitle = document.getElementById('donTitre')
        if (donTitle) donTitle.textContent = t.donSection.donTitle

        const donPara1 = document.getElementById('donPara1')
        if (donPara1) donPara1.textContent = t.donSection.donPara1

        const donPara2 = document.getElementById('donPara2')
        if (donPara2) donPara2.textContent = t.donSection.donPara2

        const donPara3 = document.getElementById('donPara3')
        if (donPara3) donPara3.textContent = t.donSection.donPara3

        const donPaypalLink = document.getElementById('donLienPaypal')
        if (donPaypalLink) donPaypalLink.textContent = t.donSection.donPaypalLink

        const donPara4 = document.getElementById('donPara4')
        if (donPara4) donPara4.textContent = t.donSection.donPara4

        const Htitre = document.getElementById('HTitre')
        if (Htitre) Htitre.textContent = t.hadithSection.title

        const quote = document.getElementById('quote')
        if (quote) quote.textContent = t.hadithSection.quote

        const sourceH =  document.getElementById('sourceH')
        if (sourceH) sourceH.textContent = t.hadithSection.source

        const SocialTitle = document.getElementById('SocialTitle')
        if (SocialTitle) SocialTitle.textContent = t.SocialTitle

       const ChoixMushaf = document.getElementById('btn-normal')
        if (ChoixMushaf) ChoixMushaf.textContent = t["btn-normal"]

        const ChoixRevelation = document.getElementById('btn-revelation')
        if (ChoixRevelation) ChoixRevelation.textContent = t["btn-revelation"]


        if (currentOrder === "normal") {
            fetchChapters(lang);
        } else if (currentOrder === "revelation") {
            fetchChaptersByRevelationOrder(lang);
        }

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
        const url = `https://api.quran.com/api/v4/chapters?language=${language}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                allSurahs = data.chapters;
                if (language === "ar") {
                    generateSurahCardsinArabic(); // ta fonction d'affichage en arabe, adapte si besoin
                } else {
                    generateSurahCards(); // ta fonction d'affichage normale, adapte si besoin
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
        const lang = localStorage.getItem("language") || "en";
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
            console.log('Déjà en ordre normal : pas de changement');
            return;
        }
        console.log('Retour à l\'ordre normal');
        currentOrder = "normal";
        const lang = localStorage.getItem("language") || "en";
        fetchChapters(lang);

        setActiveButton('btn-normal');
    });

    document.getElementById('btn-revelation').addEventListener('click', () => {
        if (currentOrder === "revelation") {
            console.log('Déjà en ordre de révélation : pas de changement');
            return;
        }
        console.log('Passage à l\'ordre de révélation');
        currentOrder = "revelation";
        const lang = localStorage.getItem("language") || "en";
        fetchChaptersByRevelationOrder(lang);

        setActiveButton('btn-revelation');
    });


    // Lancement initial
    init();

    
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
    
    function OrderRevelation() {
        souratesContainer.innerHTML = "";
        souratesContainer.classList.remove("sourates-arabic");
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
                window.location.href = `sourate.html?id=${surah.id}`;
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

    function OrderRevelationArabic() {
            souratesContainer.innerHTML = "";
            souratesContainer.classList.add("sourates-arabic");
            souratesContainer.direction = "rtl";

            // ➜ Trier la copie de allSurahs par ordre de revelation
            const sortedSurahs = [...allSurahs].sort((a, b) => a.revelation_order - b.revelation_order);

            sortedSurahs.forEach(surah => {
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