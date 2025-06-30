// app/page.tsx (actualizado)
import { guardarVoto } from './actions'; // Importa la acción

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        {/* ... (el resto del contenido de h1 y p se mantiene igual) ... */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ¿Nene o Nena? 💙💖
        </h1>
        <p className="text-gray-600 mb-6">
          ¡Ayúdanos a adivinar el sexo de nuestro bebé!
        </p>

        <form action={guardarVoto} className="flex flex-col gap-4"> {/* Llama a la acción aquí */}
          <label htmlFor="nombre" className="sr-only">
            Tu nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Escribe tu nombre aquí"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              name="sexo"
              value="Nene"
              className="w-full rounded-md bg-blue-500 py-3 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Nene 👶‍♂️
            </button>
            <button
              type="submit"
              name="sexo"
              value="Nena"
              className="w-full rounded-md bg-pink-500 py-3 text-white font-semibold hover:bg-pink-600 transition-colors"
            >
              Nena 👶‍♀️
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}