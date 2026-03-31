require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();

app.use(cors());
app.use(express.json());

// SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Ruta formulario
app.post("/enviar", async (req, res) => {

  const datos = req.body;

  const email = {
    to: process.env.EMAIL, 
    from: process.env.EMAIL,
    subject: `Nuevo mensaje de ${datos.nombre}`,
    text: `
          Nombre: ${datos.nombre}
          Email: ${datos.email}
          Teléfono: ${datos.telefono}
            
          Mensaje:
          ${datos.mensaje}
          `
  };

  try {
    await sgMail.send(email);
    res.send("Correo enviado correctamente");
  } 
  catch (error) {
    console.error("ERROR COMPLETO:", error);
    if (error.response) {
      console.error("SENDGRID ERROR:", error.response.body);
    }
    res.status(500).send("Error al enviar");
  }
});

// Puerto Render o en servidor local
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor en " + PORT);
});
