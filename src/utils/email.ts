import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(
  name: string,
  phone: string,
  email: string,
  message: string,
): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "Nuevo mensaje de formulario de contacto",
    text: `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\nMensaje: ${message}`,
  };

  await transporter.sendMail(mailOptions);
}
