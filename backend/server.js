require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// 1. Configurar el email (tu cuenta)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

// 2. Cuando llega el formulario
app.post("/enviar", async (req, res) => {

  let datos = req.body; // aquí vienen los datos del frontend

  // 3. Crear el email
  const email = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: datos.nombre,
    text:`
      Nombre: ${datos.nombre}
      Email: ${datos.email}
      Teléfono: ${datos.telefono}

      Mensaje:
      ${datos.mensaje}`
  };

  // 4. Enviar el email
  try {
    await transporter.sendMail(email);
    res.send("Correo enviado");
  } catch (error) {
    console.error(error);
    res.send("Error al enviar");
  }

});

// 5. Encender servidor
let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Servidor en " + PORT);
});