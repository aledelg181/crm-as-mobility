import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  pais: { type: String, required: true },
  correo_electronico: { type: String, required: true },
  telefono: { type: String, required: true },
}, { timestamps: true });

const Clients = mongoose.models.Clients || mongoose.model('Clients', clientSchema);

export default Clients;
