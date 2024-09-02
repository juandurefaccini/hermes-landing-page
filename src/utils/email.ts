import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASSWORD } from "astro:env/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(
  name: string,
  phone: string,
  email: string,
  message: string
): Promise<void> {
  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: "Nuevo mensaje de formulario de contacto",
    text: `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\nMensaje: ${message}`,
  };

  await transporter.sendMail(mailOptions);
}
