import React, { useRef, useState, type FormEventHandler } from "react";
import Captcha from "./Captcha";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(
    null,
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const currentTime = Date.now();
    if (lastSubmissionTime && currentTime - lastSubmissionTime < 60000) {
      setFormMessage({
        type: "error",
        text: "Por favor, espera un momento antes de enviar otro mensaje.",
      });
      return;
    }

    setIsLoading(true);
    setFormMessage(null);

    const formData = new FormData();
    formData.append("first-name", firstName);
    formData.append("phone-number", phoneNumber);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setFormMessage({
          type: "success",
          text: result.message || "¡Mensaje enviado con éxito!",
        });
        setLastSubmissionTime(currentTime);
        // Reset form fields
        setFirstName("");
        setPhoneNumber("");
        setEmail("");
        setMessage("");
      } else {
        setFormMessage({
          type: "error",
          text: result.message || "Error al enviar el mensaje.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setFormMessage({ type: "error", text: "Error al enviar el mensaje." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="first-name"
            className="block font-medium text-gray-700 text-sm"
          >
            Nombre
          </label>
          <input
            id="first-name"
            name="first-name"
            type="text"
            autoComplete="given-name"
            placeholder="Ingresá tu nombre"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block border-gray-300 focus:border-primary shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="phone-number"
            className="block font-medium text-gray-700 text-sm"
          >
            Teléfono
          </label>
          <input
            id="phone-number"
            name="phone-number"
            type="text"
            autoComplete="family-name"
            placeholder="Tu número de teléfono (opcional)"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="block border-gray-300 focus:border-primary shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-primary sm:text-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block font-medium text-gray-700 text-sm"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Ingresá tu correo"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block border-gray-300 focus:border-primary shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-primary sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block font-medium text-gray-700 text-sm"
        >
          Mensaje
        </label>
        <div>
          <div className="flex items-center space-x-2">
            <p className="text-gray-500 text-sm">¿En qué podemos ayudarte?</p>
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Quiero agendar una reunión. Tengo una duda. Otra consulta..."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block border-gray-300 focus:border-primary shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-primary sm:text-sm"
          ></textarea>
        </div>
        <Captcha />

        <div className="flex pt-4 w-full text-center">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-primary px-4 py-2 border rounded-3xl font-medium text-white grow"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
      {formMessage && (
        <div
          className={`mt-4 text-sm ${
            formMessage.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {formMessage.text}
        </div>
      )}
    </form>
  );
}
