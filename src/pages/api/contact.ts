import type { APIRoute } from "astro";
import { sendContactEmail } from "../../utils/email";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const firstName = data.get("first-name");
  const phoneNumber = data.get("phone-number");
  const email = data.get("email");
  const message = data.get("message");

  const errors: Record<string, string> = {};
  if (typeof firstName !== "string" || firstName.trim().length < 1) {
    errors.firstName = "Por favor, ingresa tu nombre.";
  }
  if (typeof phoneNumber !== "string" || phoneNumber.trim().length < 1) {
    errors.phoneNumber = "Por favor, ingresa tu número de teléfono.";
  }
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "Correo electrónico no válido.";
  }
  if (typeof message !== "string" || message.trim().length < 1) {
    errors.message = "Por favor, ingresa un mensaje.";
  }

  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ success: false, errors }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await sendContactEmail(
      firstName as string,
      phoneNumber as string,
      email as string,
      message as string
    );
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: "Error al enviar el mensaje." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};