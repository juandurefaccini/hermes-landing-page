import Button from "./Button.astro";
import { useState, type FormEventHandler } from "react";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(formData));
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }
  return (
    <form className="space-y-6" onSubmit={submit}>
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
            className="block border-gray-300 focus:border-primary shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-primary sm:text-sm"
          ></textarea>
        </div>
        <div className="flex pt-4 w-full text-center">
          <button type="submit">Enviar</button>
        </div>
      </div>
    </form>
  );
}
