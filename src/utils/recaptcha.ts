import { RECAPTCHA_SECRET_KEY } from "astro:env/server";
export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error("RECAPTCHA_SECRET_KEY is not set.");
    return false;
  }
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    return data.success && data.score > 0.5;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}
