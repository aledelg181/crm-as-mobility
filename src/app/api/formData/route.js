import { NextResponse } from 'next/server';
import connectMongodb from '@/app/lib/db';
import Clients from '@/app/models/Clients';

// Exporta directamente la función POST
export async function POST(req) {
  try {
    await connectMongodb(); 

    const body = await req.json(); 
    const { full_name, pais, correo_electronico, telefono } = body;

    const newClient = new Clients({
      full_name,
      pais,
      correo_electronico,
      telefono,
    });

    const savedClient = await newClient.save(); 
    console.log('Cliente guardado:', savedClient);

    return NextResponse.json({ message: 'Cliente guardado correctamente' }, { status: 201 });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
