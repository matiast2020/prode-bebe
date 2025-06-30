export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Página de prueba
        </h1>
        <p>Si ves esto, el problema es el código de Redis.</p>
      </div>
    </main>
  );
}