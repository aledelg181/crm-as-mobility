import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema ({
    full_name : String,
    pais: String,
    correo_electronico: String,
    telefono: String


},{
    timestamps: true
});

export default mongoose.models.Post || mongoose.model("Post", postSchema)