

import connectMongodb from '@/app/lib/db';
import Clients from '@/app/models/Clients';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectMongodb();
    const clients = await Clients.find().lean() 
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
