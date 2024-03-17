'use server'
import path from "path";
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import {v2 as cloudinary} from 'cloudinary';
import FileModel from '@/models/fileModel';

cloudinary.config({
  cloud_name: 'daseayvyl',
  api_key: '285678358993975',
  api_secret: 'hmWNjvKM6apBM9uAAropW2mZOpc',
});

async function saveFileToLocal(formData) {
    const files = formData.getAll('files');

    const promises = files.map(file => (
        file.arrayBuffer()
            .then(data => {
                const buffer = Buffer.from(data);
                const name = uuidv4();
                const ext = file.type.split('/')[1];

                const tempDir = os.tmpdir();
                const uploadPath = path.join(tempDir, `${name}.${ext}`);

                fs.writeFile(uploadPath, buffer);

                return { filepath: uploadPath, filename: file.name }
            })
    ));
    return await Promise.all(promises);
}

async function uploadFileToCloudinary(newFiles) {
    const promises = newFiles.map(file => {
        return cloudinary.uploader.upload(file.filepath, { folder: 'hackspsu2024' });
    });

    return await Promise.all(promises);
}

export async function uploadFile(formData) {
    try {
        const newFiles = await saveFileToLocal(formData);

        const pdfFiles = await uploadFileToCloudinary(newFiles);

        newFiles.map(file => fs.unlink(file.filepath));
        
        // save files to mongoDB
        const newPdfFiles = pdfFiles.map(file => {
            const newFile = new FileModel({public_id: file.public_id, secure_url: file.secure_url});
            return newFile;
        });

        console.log(newPdfFiles);
        // await FileModel.insertMany(newPdfFiles);

        return { msg: 'Upload Success' }

    } catch (error) {
        return { errMsg: error.message };
    }
}