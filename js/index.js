const formulario = document.getElementById("formulario");
if (formulario) {
    formulario.addEventListener("submit", async function(event) {

        event.preventDefault();
        
        let nombre = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('tel').value;
        let mensaje = document.getElementById('mensaje').value;
        
        console.log(nombre, email, telefono, mensaje);
        
        const res = await fetch("http://localhost:4000/enviar", {
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
    
        const texto = await res.text();
        console.log(texto);
    });
}