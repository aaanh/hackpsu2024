import { Schema, model, models } from 'mongoose';

const fileSchema = new Schema({
    user_id: String,
    public_id: String,
    secure_url: String,
    session_id: String
}, { timestamps: true });

const FileModel = models.File || model('FileModel', fileSchema);

export default FileModel;