import mongoose from 'mongoose';

const connectMongodb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya estás conectado a MongoDB');
    const db = mongoose.connection.db;
    console.log('Base de datos actual:', db.databaseName);

    const collections = await db.listCollections().toArray();
    console.log('Colecciones disponibles:', collections.map(col => col.name));
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  });

  mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB');
  });
  
  mongoose.connection.on('error', (err) => {
    console.log('Error de conexión:', err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.log('Desconectado de MongoDB');
  });
  

  const db = mongoose.connection.db;
  console.log('Conectado a MongoDB');
  console.log('Base de datos actual:', db.databaseName);

  const collections = await db.listCollections().toArray();
  console.log('Colecciones disponibles:', collections.map(col => col.name));
};

export default connectMongodb;
