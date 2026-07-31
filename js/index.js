const formulario = document.getElementById("formulario");
if (formulario) {
    formulario.addEventListener("submit", async function(event) {

        event.preventDefault();
        
        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('tel').value;
        let mensaje = document.getElementById('mensaje').value;
        
        console.log(nombre, email, telefono, mensaje);
        
        const res = await fetch("https://altiva.onrender.com/enviar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                email,
                telefono,
                mensaje
            })
        });
    
        let texto = await res.text();
        console.log(texto);

        if (res.ok) {
            alert("Mensaje enviado correctamente");
            formulario.reset();
        } else {
            alert("Error al enviar el mensaje");
        }
    });
}

// Calendario dinamico
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dias = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

const diasContainer = document.querySelector(".dias");
const botonAnterior = document.querySelector(".botonAnterior");
const botonSiguiente = document.querySelector(".botonSiguiente");
const mes = document.querySelector(".mes");
const botonHoy = document.querySelector(".botonHoy");

if (
    diasContainer && botonAnterior && botonSiguiente && mes && botonHoy
) {
    // obtener fecha actual
    const fechaAct = new Date();

    // obtener mes actual
    let mesAct = fechaAct.getMonth();

    // obtener año actual
    let anyAct = fechaAct.getFullYear();

    //console.log(fechaAct, mesAct, anyAct);

    // funcion para cargar los dias
    function cargarCalendario() {

        // obtener mes anterior, mes actual y mes proximo
        fechaAct.setDate(1);
        const primerDia = new Date(anyAct, mesAct, 1);
        const ultimoDia = new Date(anyAct, mesAct + 1, 0);
        const ultimoDiaIndex = ultimoDia.getDay();
        const ultimoDiaFecha = ultimoDia.getDate();
        const anteriorUltimoDia = new Date(anyAct, mesAct, 0);
        const anteriorUltimoDiaFecha = anteriorUltimoDia.getDate();
        const proximosDias = 7 - ultimoDiaIndex;

        //actualizacion año actual y mes en header
        mes.innerHTML = `${meses[mesAct]} ${anyAct}`;

        //actualizar dias html
        let dias = "";

        //actualizar dias anteriores html
        for (let i = primerDia.getDay(); i > 0; i--) {
            dias += `<div class="dia anterior">${anteriorUltimoDiaFecha - i + 1}</div>`;
        }

        //actualizar dias actuales html
        for (let i = 1; i <= ultimoDiaFecha; i++) {
            // comprueba si es hoy y luego agrega la clase de hoy.
            if (i === new Date().getDate() && mesAct === new Date().getMonth() && anyAct === new Date().getFullYear()) {

                //Si la fecha, el mes y el año coinciden, agréguelo hoy.
                dias += `<div class="dia hoy">${i}</div>`;
            } else {
                // si no no se añade hoy
                dias += `<div class="dia">${i}</div>`;
            }
        }

        // siguientes dias del mes
        for (let i = 1; i <= proximosDias; i++) {
            dias += `<div class="dia siguiente">${i}</div>`;

        }

        esconderBotonAct();
        diasContainer.innerHTML = dias;
    }

    cargarCalendario();

    botonSiguiente.addEventListener("click", () => {
        // incrementar mes actual por uno
        mesAct++;
        if (mesAct > 11) {

            // Si el mes es mayor que 11, conviértalo en 0 y auméntelo en uno
            mesAct = 0;
            anyAct++;
        }

        // volver a cargar calendario
        cargarCalendario();
    })

    botonAnterior.addEventListener("click", () => {
        // incrementar mes actual por uno
        mesAct--;
        if (mesAct < 0) {

            // Si el mes es menor que 0, conviértalo en 11 y baja en un año
            mesAct = 11;
            anyAct--;
        }

        // volver a cargar calendario
        cargarCalendario();
    })

    // ir al dia actual
    botonHoy.addEventListener("click", () => {

        // poner mes i año actual
        mesAct = fechaAct.getMonth();
        anyAct = fechaAct.getFullYear();

        // volver a cargar calendario
        cargarCalendario();
    })

    // esconder boton de mes actual si esta en el mes actual
    function esconderBotonAct() {
        if (mesAct === new Date().getMonth() && anyAct === new Date().getFullYear()) {
            botonHoy.style.display = "none";
        } else {
            botonHoy.style.display = "flex";
        }
    }
}



// Idiomas index.html
const traducciones = {
    es: {
        // Navbar
        inicio: "Inicio",
        serviciosM: "Nuestros servicios",
        menuGaleria: "Galería",
        menuGaleriaMudanza: "Mudanza",
        menuGaleriaCarpinteria: "Carpintería",
        menuGaleriaVidreria: "Vidrería",
        menuGaleriaReforma: "Reformas",
        promociones: "Promociones",
        nosotros: "Quienes Somos",
        contactanos: "Solicitar servicio",

        // Portada
        tituloPortada: "Alquiler de plataformas elevadoras",
        pPortada: "Necesitas elevar material de manera rápida y segura.<br>En Altiva lo hacemos posible.<br>Solicita tu presupuesto sin compromiso.",
        btnPortadaContactanos: "Solicitar servicio",

        // Servicios
        h2Servicios: "Nuestros servicios",
        pServicios: "Trabajamos mano a mano con ...",
        pMudanzas: "Mudanzas",
        pObras: "Carpintería",
        pSeguridad: "Vidriería",
        pFlexibilidad: "Reformas",

        // Sobre nosotros
        h2Nosotros: "¿Porque Altiva?",
        h3Nosotros1: "Seguridad ante todo",
        pNosotros1: "Trabajamos bajo los más altos estándares, garantizando maniobras seguras incluso en situaciones exigentes.",
        h3Nosotros2: "operario especializado",
        pNosotros2: "Nos encargamos de todo el proceso, para que no tengas que preocuparte por nada.",
        h3Nosotros3: "Adaptados a cada servicio",
        pNosotros3: "Cada trabajo es diferente. Analizamos cada caso y ofrecemos la mejor solución.",
        h3Nosotros4: "Trabajos en situaciones complejas",
        pNosotros4: "Afrontamos servicios exigentes en espacios reducidos o de difícil acceso, con soluciones eficaces y seguras.",
        h3Nosotros5: "Rapidez y disponibilidad",
        pNosotros5: "Nos adaptamos a tus tiempos con un servicio ágil y eficiente.",
        h3Nosotros6: "Para particulares y empresas",
        pNosotros6: "Trabajamos tanto para clientes particulares como para profesionales del sector.",
        btnNosotrosConocenos: "Conocenos",

        // Contactanos
        h2Contactanos: "Tu elección más óptima y económica",
        liContactanos1: "Experiencia y profesionalidad en cada servicio",
        liContactanos2: "Equipos modernos y revisados periódicamente",
        liContactanos3: "Puntualidad y compromiso con los plazos",
        liContactanos4: "Presupuestos claros y sin sorpresas",
        liContactanos5: "Personal cualificado y trato cercano",
        pContactanos: "Cuéntanos qué necesitas y te ayudaremos en tus necesidades",
        h3Contactanos: "Cuéntanos qué necesitas",
        nombre: "Nombre",
        email: "Email",
        tel: "Teléfono",
        mensaje: "Mensaje",
        btnEnviar: "Enviar",

        // Footer
        pFooter1: "Plataformas elevadoras",
        pFooter2: "Servicio profesional y seguro.",
        aFooterInicio: "Inicio",
        aFooterPromociones: "Promociones",
        aFooterNosotros: "Quienes Somos",
        aFooterContactanos: "Contactanos",

        // -- Galeria --
        portadaGaleriaMudanza: "Galeria Mudanzas",
        portadaGaleriaReforma: "Galeria Reformas",
        portadaGaleriaVidreria: "Galeria Vidrieria",
        portadaGaleriaCarpinteria: "Galeria Carpinteria",
        trabajos: "Nuestros trabajos",
        pGaleria: "Descubre algunos de los trabajos realizados por ALTIVA Plataformas Elevadoras.",

        // -- Promociones --
        portadaPromo: "Promociones",

        // Promo1
        h2Promo1: "Promoción de apertura",
        pPromo1: "En nuestra empresa de plataformas elevadoras comenzamos esta nueva etapa con la ilusión de ofrecer un servicio profesional, rápido y totalmente orientado a las necesidades reales de nuestros clientes. Por eso, queremos agradecer la confianza de todas las personas, empresas y profesionales que decidan trabajar con nosotros desde el primer día con una promoción especial de apertura pensada para premiar tu fidelidad. Sabemos que cuando necesitas una plataforma elevadora buscas mucho más que una máquina: necesitas seguridad, puntualidad, atención profesional, equipos en perfecto estado y una empresa que responda cuando realmente lo necesitas. Nuestro objetivo es convertirnos en ese aliado de confianza para trabajos en altura, mantenimiento, construcción, instalaciones, reformas, limpieza, eventos, logística y cualquier tipo de proyecto que requiera soluciones de elevación eficientes y seguras.",

        // -- Sobre nosotros --
        // Sobre nosotros
        portadaNosotros: "Sobre nosotros",

        // Content
        queEsNosotros: "¿Qué es Altiva?",
        pNosotros: "Altiva es una empresa especializada en el alquiler y uso de máquinas elevadoras, orientadas principalmente al sector de las mudanzas y otros trabajos que requieren la elevación segura de materiales. Su actividad se centra en ofrecer soluciones eficientes para el traslado de muebles y objetos voluminosos, especialmente en entornos urbanos donde el acceso puede resultar complicado.",
        pNosotros2: "La empresa cuenta con equipos modernos y adaptados a diferentes alturas y necesidades, lo que permite realizar trabajos de forma rápida, segura y sin riesgos innecesarios para los operarios o los bienes transportados. Gracias a sus máquinas elevadoras, Altiva facilita mudanzas en edificios altos, evitando el uso de escaleras o ascensores convencionales.",
        pNosotros3: "Además, Altiva no solo trabaja en el ámbito de las mudanzas, sino que también presta servicios en otros sectores donde se requiere elevación de carga, como obras, reformas o instalaciones. Su compromiso con la seguridad, la eficiencia y la calidad del servicio la convierte en una opción fiable para particulares y profesionales.",

        // -- Contactanos --
        portadaContact: "Contacto"
    },
    ca: {
        // Navbar
        inicio: "Inici",
        serviciosM: "Serveis",
        menuGaleria: "Galeria",
        menuGaleriaMudanza: "Mudança",
        menuGaleriaCarpinteria: "Fusteria",
        menuGaleriaVidreria: "Vidrieria",
        menuGaleriaReforma: "Reformes",
        promociones: "Promocions",
        nosotros: "Qui som",
        contactanos: "Solicitar servei",

        // Portada
        tituloPortada: "Lloguer de plataformes elevadores",
        pPortada: "Necessites elevar material de manera ràpida i segura.<br>A Altiva ho fem possible.<br>Sol·licita el teu pressupost sense compromís.",
        btnPortadaContactanos: "Sol·licitar servei",

        // Servicios
        h2Servicios: "Els nostres serveis",
        pServicios: "Treballem colze a colze amb ...",
        pMudanzas: "Mudances",
        pObras: "Fusteria",
        pSeguridad: "Vidrieria",
        pFlexibilidad: "Reformes",

        // Sobre nosotros
        h2Nosotros: "Per què Altiva?",
        h3Nosotros1: "Seguretat per damunt de tot",
        pNosotros1: "Treballem sota els més alts estàndards, garantint maniobres segures fins i tot en situacions exigents.",
        h3Nosotros2: "Operari especialitzat",
        pNosotros2: "Ens encarreguem de tot el procés perquè no t'hagis de preocupar de res.",
        h3Nosotros3: "Adaptats a cada servei",
        pNosotros3: "Cada treball és diferent. Analitzem cada cas i oferim la millor solució.",
        h3Nosotros4: "Treballs en situacions complexes",
        pNosotros4: "Afrontem serveis exigents en espais reduïts o de difícil accés, amb solucions eficaces i segures.",
        h3Nosotros5: "Rapidesa i disponibilitat",
        pNosotros5: "Ens adaptem als teus terminis amb un servei àgil i eficient.",
        h3Nosotros6: "Per a particulars i empreses",
        pNosotros6: "Treballem tant per a clients particulars com per a professionals del sector.",
        btnNosotrosConocenos: "Coneix-nos",

        // Contactanos
        h2Contactanos: "La teva elecció més òptima i econòmica",
        liContactanos1: "Experiència i professionalitat en cada servei",
        liContactanos2: "Equips moderns i revisats periòdicament",
        liContactanos3: "Puntualitat i compromís amb els terminis",
        liContactanos4: "Pressupostos clars i sense sorpreses",
        liContactanos5: "Personal qualificat i tracte proper",
        pContactanos: "Explica'ns què necessites i t'ajudarem",
        h3Contactanos: "Explica'ns què necessites",
        nombre: "Nom",
        email: "Email",
        tel: "Telèfon",
        mensaje: "Missatge",
        btnEnviar: "Enviar",

        // Footer
        pFooter1: "Plataformes elevadores",
        pFooter2: "Servei professional i segur.",
        aFooterInicio: "Inici",
        aFooterPromociones: "Promocions",
        aFooterNosotros: "Qui som",
        aFooterContactanos: "Contacta'ns",

        // -- Galeria --
        portadaGaleriaMudanza: "Galeria Mudances",
        portadaGaleriaReforma: "Galeria Reformes",
        portadaGaleriaVidreria: "Galeria Vidrieria",
        portadaGaleriaCarpinteria: "Galeria Fusteria",
        trabajos: "Els nostres treballs",
        pGaleria: "Descobreix alguns dels treballs realitzats per ALTIVA Plataformes Elevadores.",

        // -- Promociones --
        portadaPromo: "Promocions",

        // Promo1
        h2Promo1: "Promoció d'apertura",
        pPromo1: "A la nostra empresa de plataformes elevadores iniciem aquesta nova etapa amb la il·lusió d'oferir un servei professional, ràpid i totalment orientat a les necessitats reals dels nostres clients. Per això, volem agrair la confiança de totes les persones, empreses i professionals que decideixin treballar amb nosaltres des del primer dia amb una promoció especial d'obertura pensada per premiar la vostra fidelitat. Sabem que quan necessites una plataforma elevadora busques molt més que una màquina: necessites seguretat, puntualitat, atenció professional, equips en perfecte estat i una empresa que respongui quan realment ho necessites. El nostre objectiu és convertir-nos en aquest aliat de confiança per a treballs en alçada, manteniment, construcció, instal·lacions, reformes, neteja, esdeveniments, logística i qualsevol tipus de projecte que requereixi solucions d'elevació eficients i segures.",

        // -- Sobre nosotros --
        // Sobre nosotros
        portadaNosotros: "Sobre nosaltres",

        // Content
        queEsNosotros: "Què és Altiva?",
        pNosotros: "Altiva és una empresa especialitzada en el lloguer i ús de màquines elevadores, orientades principalment al sector de les mudances i altres treballs que requereixen l'elevació segura de materials. La seva activitat se centra a oferir solucions eficients per al trasllat de mobles i objectes voluminosos, especialment en entorns urbans on l'accés pot resultar complicat.",
        pNosotros2: "L'empresa compta amb equips moderns i adaptats a diferents alçades i necessitats, fet que permet realitzar treballs de manera ràpida, segura i sense riscos innecessaris per als operaris o els béns transportats. Gràcies a les seves màquines elevadores, Altiva facilita mudances en edificis alts, evitant l'ús d'escales o ascensors convencionals.",
        pNosotros3: "A més, Altiva no només treballa en l'àmbit de les mudances, sinó que també presta serveis en altres sectors on es requereix elevació de càrrega, com obres, reformes o instal·lacions. El seu compromís amb la seguretat, l'eficiència i la qualitat del servei la converteix en una opció fiable tant per a particulars com per a professionals.",
        
        // -- Contactanos --
        portadaContact: "Contacte"
    },
    en: {
        // Navbar
        inicio: "Home",
        serviciosM: "Our services",
        menuGaleria: "Gallery",
        menuGaleriaMudanza: "Moving",
        menuGaleriaCarpinteria: "Carpentry",
        menuGaleriaVidreria: "Glazing",
        menuGaleriaReforma: "Renovations",
        promociones: "Promotions",
        nosotros: "About us",
        contactanos: "Request service",

        // Portada
        tituloPortada: "Lifting Platform Rental",
        pPortada: "Need to lift materials quickly and safely?<br>At Altiva we make it possible.<br>Request your free quote with no obligation.",
        btnPortadaContactanos: "Request service",

        // Servicios
        h2Servicios: "Our services",
        pServicios: "We work hand in hand with ...",
        pMudanzas: "Moving",
        pObras: "Carpentry",
        pSeguridad: "Glazing",
        pFlexibilidad: "Renovations",

        // Sobre nosotros
        h2Nosotros: "Why Altiva?",
        h3Nosotros1: "Safety First",
        pNosotros1: "We work to the highest standards, ensuring safe operations even in the most demanding situations.",
        h3Nosotros2: "Specialized Operator",
        pNosotros2: "We take care of the entire process, so you don't have to worry about anything.",
        h3Nosotros3: "Tailored to Every Service",
        pNosotros3: "Every project is different. We assess each case and provide the best solution.",
        h3Nosotros4: "Complex Projects",
        pNosotros4: "We handle demanding jobs in confined or difficult-to-access spaces with safe and effective solutions.",
        h3Nosotros5: "Fast and Reliable Service",
        pNosotros5: "We adapt to your schedule with a fast and efficient service.",
        h3Nosotros6: "For Individuals and Businesses",
        pNosotros6: "We work with both private customers and industry professionals.",
        btnNosotrosConocenos: "Learn more",

        // Contactanos
        h2Contactanos: "Your most optimal and economical choice",
        liContactanos1: "Experience and professionalism in every service",
        liContactanos2: "Modern equipment regularly inspected",
        liContactanos3: "Punctuality and commitment to deadlines",
        liContactanos4: "Clear pricing with no surprises",
        liContactanos5: "Qualified staff and close customer service",
        pContactanos: "Tell us what you need and we will help you",
        h3Contactanos: "Tell us what you need",
        nombre: "Name",
        email: "Email",
        tel: "Telephone",
        mensaje: "Message",
        btnEnviar: "Send",

        // Footer
        pFooter1: "Lifting platforms",
        pFooter2: "Professional and safe service.",
        aFooterInicio: "Home",
        aFooterPromociones: "Promotions",
        aFooterNosotros: "About us",
        aFooterContactanos: "Contact us",

        // -- Galeria --
        portadaGaleriaMudanza: "Moving Gallery",
        portadaGaleriaReforma: "Renovation Gallery",
        portadaGaleriaVidreria: "Glazing Gallery",
        portadaGaleriaCarpinteria: "Carpentry Gallery",
        trabajos: "Our Projects",
        pGaleria: "Discover some of the projects completed by ALTIVA Lifting Platforms.",

        // -- Promociones --
        portadaPromo: "Promotions",

        // Promo1
        h2Promo1: "Promotion of opening",
        pPromo1: "At our lifting platform company, we are beginning this new journey with the enthusiasm of offering a professional, fast, and fully customer-oriented service focused on the real needs of our clients. That is why we want to thank all individuals, companies, and professionals who choose to work with us from day one through a special opening promotion designed to reward your loyalty. We understand that when you need a lifting platform, you are looking for much more than just a machine: you need safety, punctuality, professional service, equipment in perfect condition, and a company that responds when you truly need it. Our goal is to become your trusted partner for working at heights, maintenance, construction, installations, renovations, cleaning, events, logistics, and any type of project requiring efficient and safe lifting solutions.",

        // -- Sobre nosotros --
        // Sobre nosotros
        portadaNosotros: "About us",

        // Content
        queEsNosotros: "What is Altiva?",
        pNosotros: "Altiva is a company specialized in the rental and use of lifting machines, mainly focused on the moving industry and other jobs that require the safe lifting of materials. Its activity is centered on providing efficient solutions for transporting furniture and bulky objects, especially in urban environments where access can be difficult.",
        pNosotros2: "The company has modern equipment adapted to different heights and needs, allowing work to be carried out quickly, safely, and without unnecessary risks for operators or transported goods. Thanks to its lifting machines, Altiva makes moving in tall buildings easier, avoiding the use of stairs or conventional elevators.",
        pNosotros3: "In addition, Altiva not only works in the moving sector, but also provides services in other industries where load lifting is required, such as construction, renovations, or installations. Its commitment to safety, efficiency, and service quality makes it a reliable option for both private individuals and professionals.",
        
        // -- Contactanos --
        portadaContact: "Contact"
    },
    fr: {
        // Navbar
        inicio: "Accueil",
        serviciosM: "Nos services",
        menuGaleria: "Galerie",
        menuGaleriaMudanza: "Déménagement",
        menuGaleriaCarpinteria: "Menuiserie",
        menuGaleriaVidreria: "Vitrerie",
        menuGaleriaReforma: "Rénovations",
        promociones: "Promotions",
        nosotros: "Qui sommes-nous",
        contactanos: "Demander un service",
            
        // Portada
        tituloPortada: "Location de plateformes elevatrices",
        pPortada: "Vous devez élever du matériel rapidement et en toute sécurité ?<br>Chez Altiva, nous le rendons possible.<br>Demandez votre devis sans engagement.",
        btnPortadaContactanos: "Demander un service",
            
        // Servicios
        h2Servicios: "Nos services",
        pServicios: "Nous travaillons main dans la main avec ...",
        pMudanzas: "Déménagements",
        pObras: "Menuiserie",
        pSeguridad: "Vitrerie",
        pFlexibilidad: "Rénovations",
            
        // Sobre nosotros
        h2Nosotros: "Pourquoi Altiva ?",
        h3Nosotros1: "La sécurité avant tout",
        pNosotros1: "Nous travaillons selon les normes les plus élevées afin de garantir des interventions sûres, même dans les situations les plus exigeantes.",
        h3Nosotros2: "Opérateur spécialisé",
        pNosotros2: "Nous nous occupons de l'ensemble du processus afin que vous n'ayez à vous soucier de rien.",
        h3Nosotros3: "Adaptés à chaque service",
        pNosotros3: "Chaque intervention est différente. Nous analysons chaque situation afin de proposer la meilleure solution.",
        h3Nosotros4: "Travaux dans des situations complexes",
        pNosotros4: "Nous réalisons des interventions exigeantes dans des espaces restreints ou difficiles d'accès, avec des solutions sûres et efficaces.",
        h3Nosotros5: "Rapidité et disponibilité",
        pNosotros5: "Nous nous adaptons à vos délais grâce à un service rapide et efficace.",
        h3Nosotros6: "Pour les particuliers et les entreprises",
        pNosotros6: "Nous travaillons aussi bien pour les particuliers que pour les professionnels du secteur.",
        btnNosotrosConocenos: "Découvrez-nous",
            
        // Contactanos
        h2Contactanos: "Le choix le plus avantageux et le plus économique",
        liContactanos1: "Expérience et professionnalisme à chaque intervention",
        liContactanos2: "Équipements modernes et contrôlés régulièrement",
        liContactanos3: "Ponctualité et respect des délais",
        liContactanos4: "Des devis clairs et sans mauvaises surprises",
        liContactanos5: "Personnel qualifié et service de proximité",
        pContactanos: "Expliquez-nous vos besoins et nous vous aiderons à trouver la meilleure solution.",
        h3Contactanos: "Parlez-nous de votre projet",
        nombre: "Nom",
        email: "E-mail",
        tel: "Téléphone",
        mensaje: "Message",
        btnEnviar: "Envoyer",
            
        // Footer
        pFooter1: "Plateformes élévatrices",
        pFooter2: "Service professionnel et sécurisé.",
        aFooterInicio: "Accueil",
        aFooterPromociones: "Promotions",
        aFooterNosotros: "Qui sommes-nous",
        aFooterContactanos: "Contactez-nous",
            
        // -- Galeria --
        portadaGaleriaMudanza: "Galerie Demenagements",
        portadaGaleriaReforma: "Galerie Renovations",
        portadaGaleriaVidreria: "Galerie Vitrerie",
        portadaGaleriaCarpinteria: "Galerie Menuiserie",
        trabajos: "Nos réalisations",
        pGaleria: "Découvrez quelques-uns des travaux réalisés par ALTIVA Plateformes Élévatrices.",
            
        // -- Promociones --
        portadaPromo: "Promotions",
            
        // Promo1
        h2Promo1: "Promotion de lancement",
        pPromo1: "Notre entreprise de plateformes élévatrices débute cette nouvelle étape avec l'ambition d'offrir un service professionnel, rapide et entièrement adapté aux besoins réels de nos clients. C'est pourquoi nous souhaitons remercier toutes les personnes, entreprises et professionnels qui nous feront confiance dès le premier jour grâce à une offre de lancement spécialement conçue pour récompenser votre fidélité. Nous savons que lorsque vous avez besoin d'une plateforme élévatrice, vous recherchez bien plus qu'une simple machine : vous recherchez la sécurité, la ponctualité, un accompagnement professionnel, des équipements en parfait état et une entreprise capable de répondre présente lorsque vous en avez réellement besoin. Notre objectif est de devenir votre partenaire de confiance pour les travaux en hauteur, la maintenance, la construction, les installations, les rénovations, le nettoyage, les événements, la logistique et tout type de projet nécessitant des solutions de levage efficaces et sécurisées.",
            
        // -- Sobre nosotros --
        // Sobre nosotros
        portadaNosotros: "A propos de nous",
            
        // Content
        queEsNosotros: "Qu'est-ce qu'Altiva ?",
        pNosotros: "Altiva est une entreprise spécialisée dans la location et l'utilisation de plateformes élévatrices, principalement destinées au secteur du déménagement et à d'autres activités nécessitant le levage sécurisé de matériaux. Son activité consiste à proposer des solutions efficaces pour le déplacement de meubles et d'objets volumineux, en particulier dans les environnements urbains où l'accès peut être difficile.",
        pNosotros2: "L'entreprise dispose d'équipements modernes adaptés à différentes hauteurs et à divers besoins, permettant de réaliser les travaux rapidement, en toute sécurité et sans risques inutiles pour les opérateurs ou les biens transportés. Grâce à ses plateformes élévatrices, Altiva facilite les déménagements dans les immeubles de grande hauteur en évitant l'utilisation des escaliers ou des ascenseurs traditionnels.",
        pNosotros3: "En outre, Altiva ne travaille pas uniquement dans le domaine du déménagement, mais intervient également dans d'autres secteurs nécessitant le levage de charges, tels que les chantiers, les rénovations ou les installations. Son engagement en faveur de la sécurité, de l'efficacité et de la qualité du service en fait un partenaire fiable aussi bien pour les particuliers que pour les professionnels.",
            
        // -- Contactanos --
        portadaContact: "Contact"
    }
};

function cambioIdioma(Idioma){

  localStorage.setItem("lenguaje", Idioma);
  document.documentElement.lang = Idioma;

  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    el.innerHTML = traducciones[Idioma][key];
  });

  document.querySelectorAll("[data-placeholder]").forEach(el => {
  const key = el.getAttribute("data-placeholder");
  el.placeholder = traducciones[Idioma][key];
});

}

// si vuelven a la pagina, cargar el idioma guardado de como lo dejo
const cargarIdioma = localStorage.getItem("lenguaje") || "es";

cambioIdioma(cargarIdioma);