import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("first-name");
    const phone = data.get("phone-number");
    const email = data.get("email");
    const message = data.get("message");

    if (!name || !phone || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Todos los campos son requeridos!" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nuevo mensaje de formulario de contacto",
      text: `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\nMensaje: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: "¡Mensaje enviado con éxito!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
