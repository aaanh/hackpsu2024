import { Schema, model, models } from 'mongoose';

const fileSchema = new Schema({
    // user_id: String,
    public_id: String,
    secure_url: String,
}, { timestamps: true });

const FileModel = models.File || model('File', fileSchema);

export default FileModel;