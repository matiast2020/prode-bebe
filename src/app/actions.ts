// app/actions.ts
'use server';

import Redis from 'ioredis'; // 1. Cambiamos la importación
import { revalidatePath } from 'next/cache';

// 2. La conexión es mucho más simple.
// ioredis lee la variable de entorno y se configura solo.
const redis = new Redis(process.env.REDIS_URL as string);

export async function guardarVoto(formData: FormData) {
  const nombre = formData.get('nombre') as string;
  const sexo = formData.get('sexo') as string;

  if (!nombre || !sexo) {
    return;
  }

  const key = `voto:${nombre.toLowerCase().replace(/\s+/g, '-')}`;

  // 3. El resto del código funciona igual
  await redis.hset(key, { nombre, sexo });

  // Desconectamos el cliente para no dejar conexiones abiertas (importante en Serverless)
  await redis.quit();

  revalidatePath('/resultados');
}