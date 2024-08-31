import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get("first-name");
    const phone = data.get("phone-number");
    const email = data.get("email");
    const message = data.get("message");

    console.log({ name, phone, email, message });

    if (!name || !phone || !email || !message) {
      return {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "All fields are required!" }),
      };
    }

    // Send email to the admin
    // You can use any email service provider like SendGrid, Mailgun, etc.
    // Here we are just logging the email details
    console.log("Email sent to admin:");

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Contact form submitted!" }),
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
