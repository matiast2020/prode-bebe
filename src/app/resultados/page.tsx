// app/resultados/page.tsx
import Redis from 'ioredis'; // 1. Cambiamos la importación

interface Voto {
  nombre: string;
  sexo: string;
}

// 2. Usamos la misma lógica de conexión simple
const redis = new Redis(process.env.REDIS_URL as string);

async function getVotos(): Promise<Voto[]> {
  const keys = await redis.keys('voto:*');
  if (keys.length === 0) {
    return [];
  }

  const pipeline = redis.pipeline();
  keys.forEach(key => pipeline.hgetall(key));
  const resultados = await pipeline.exec();

  // Desconectamos el cliente
  await redis.quit();

  // El resultado de pipeline.exec() es un array de [error, data]
  // por lo que debemos mapearlo para obtener solo los datos.
  return resultados?.map(res => res[1] as Voto) || [];
}

export default async function ResultadosPage() {
  const votos = await getVotos();
  const totalNenes = votos.filter(v => v.sexo === 'Nene').length;
  const totalNenas = votos.filter(v => v.sexo === 'Nena').length;

  return (
    // ... El resto del JSX de esta página no cambia ...
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Resultados 📊</h1>
      <div className="flex gap-8 mb-8">
        <div className="bg-blue-200 p-6 rounded-lg text-center">
          <p className="text-5xl font-bold">{totalNenes}</p>
          <p className="text-xl">Votos para Nene</p>
        </div>
        <div className="bg-pink-200 p-6 rounded-lg text-center">
          <p className="text-5xl font-bold">{totalNenas}</p>
          <p className="text-xl">Votos para Nena</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Lista de Votos:</h2>
      <ul className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        {votos.map((voto, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span className="font-semibold">{voto.nombre}</span>
            <span>{voto.sexo === 'Nene' ? 'Nene 👶‍♂️' : 'Nena 👶‍♀️'}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}