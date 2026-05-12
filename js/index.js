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
        promociones: "Promociones",
        nosotros: "Quienes Somos",
        contactanos: "Contactanos",

        // Portada
        pPortada: "Seguridad, rapidez y servicio profesional en cada trabajo.",
        btnPortadaContactanos: "Contactanos",

        // Servicios
        h2Servicios: "Servicios",
        pServicios: "Te ofrecemos la mejor atencion al cliente y servicio.<br>Nos adaptamos a tu comodidad.",
        pMudanzas: "Mudanzas",
        pObras: "Obras y Reformas",
        pSeguridad: "Seguridad",
        pFlexibilidad: "Flexibilidad",

        // Sobre nosotros
        h2Nosotros: "¿Porque Altiva?",
        pNosotros: "En Altiva ofrecemos soluciones profesionales con plataformas elevadoras para mudanzas, obras y reformas. Trabajamos con equipos modernos y personal cualificado para garantizar seguridad, eficacia y puntualidad en cada servicio.",
        pNosotros2: "Nos adaptamos a cada proyecto, asegurando un trabajo rápido, limpio y sin complicaciones.",
        btnNosotrosConocenos: "Conocenos",

        // Contactanos
        h2Contactanos: "Tu elección más óptima y económica",
        liContactanos1: "Experiencia y profesionalidad en cada servicio",
        liContactanos2: "Equipos modernos y revisados periódicamente",
        liContactanos3: "Puntualidad y compromiso con los plazos",
        liContactanos4: "Presupuestos claros y sin sorpresas",
        liContactanos5: "Personal cualificado y trato cercano",
        pContactanos: "Contactanos y te ayudaremos en tus necesidades",
        h3Contactanos: "Contactanos",
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
        portadaContact: "Contactanos"
    },
    ca: {
        // Navbar
        inicio: "Inici",
        promociones: "Promocions",
        nosotros: "Qui som",
        contactanos: "Contacta'ns",

        // Portada
        pPortada: "Seguretat, rapidesa i servei professional en cada treball.",
        btnPortadaContactanos: "Contacta'ns",

        // Servicios
        h2Servicios: "Serveis",
        pServicios: "T'oferim la millor atenció al client i servei.<br>Ens adaptem a la teva comoditat.",
        pMudanzas: "Mudances",
        pObras: "Obres i reformes",
        pSeguridad: "Seguretat",
        pFlexibilidad: "Flexibilitat",

        // Sobre nosotros
        h2Nosotros: "Per què Altiva?",
        pNosotros: "A Altiva oferim solucions professionals amb plataformes elevadores per a mudances, obres i reformes. Treballem amb equips moderns i personal qualificat per garantir seguretat, eficàcia i puntualitat en cada servei.",
        pNosotros2: "Ens adaptem a cada projecte, assegurant un treball ràpid, net i sense complicacions.",
        btnNosotrosConocenos: "Coneix-nos",

        // Contactanos
        h2Contactanos: "La teva elecció més òptima i econòmica",
        liContactanos1: "Experiència i professionalitat en cada servei",
        liContactanos2: "Equips moderns i revisats periòdicament",
        liContactanos3: "Puntualitat i compromís amb els terminis",
        liContactanos4: "Pressupostos clars i sense sorpreses",
        liContactanos5: "Personal qualificat i tracte proper",
        pContactanos: "Contacta'ns i t'ajudarem en les teves necessitats",
        h3Contactanos: "Contacta'ns",
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
        portadaContact: "Contacta'ns"
    },
    en: {
        // Navbar
        inicio: "Home",
        promociones: "Promotions",
        nosotros: "About us",
        contactanos: "Contact us",

        // Portada
        pPortada: "Safety, speed and professional service in every job.",
        btnPortadaContactanos: "Contact us",

        // Servicios
        h2Servicios: "Services",
        pServicios: "We offer the best customer service.<br>We adapt to your comfort.",
        pMudanzas: "Moving",
        pObras: "Construction and renovations",
        pSeguridad: "Safety",
        pFlexibilidad: "Flexibility",

        // Sobre nosotros
        h2Nosotros: "Why Altiva?",
        pNosotros: "At Altiva we offer professional solutions with lifting platforms for moving, construction and renovations. We work with modern equipment and qualified staff to ensure safety, efficiency and punctuality in every service.",
        pNosotros2: "We adapt to each project, ensuring fast, clean and hassle-free work.",
        btnNosotrosConocenos: "Learn more",

        // Contactanos
        h2Contactanos: "Your most optimal and economical choice",
        liContactanos1: "Experience and professionalism in every service",
        liContactanos2: "Modern equipment regularly inspected",
        liContactanos3: "Punctuality and commitment to deadlines",
        liContactanos4: "Clear pricing with no surprises",
        liContactanos5: "Qualified staff and close customer service",
        pContactanos: "Contact us and we will help you with your needs",
        h3Contactanos: "Contact us",
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
        portadaContact: "Contact us"
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