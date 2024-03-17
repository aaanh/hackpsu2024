"use server";
import path from "path";
import fs from "fs/promises";

import os from "os";
import { v2 as cloudinary } from "cloudinary";
import FileModel from "@/models/fileModel";
import { useUser } from "@auth0/nextjs-auth0/client";
import { User } from "lucide-react";

const cloud_name = "daseayvyl";
const api_key = "285678358993975";
const api_secret = "hmWNjvKM6apBM9uAAropW2mZOpc";

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret
});

async function saveFileToLocal(formData: any) {
  const files = formData.getAll("files");

  const promises = files.map((file: any) =>
    file.arrayBuffer().then((data: any) => {
      const buffer = Buffer.from(data);
      const ext = file.type.split("/")[1];

      const tempDir = os.tmpdir();
      const uploadPath = path.join(
        tempDir,
        `${file.name}-${formData.session_id}.${ext}`
      );

      fs.writeFile(uploadPath, buffer);

      return { filepath: uploadPath, filename: file.name };
    })
  );
  return await Promise.all(promises);
}

async function uploadFileToCloudinary(newFiles: any) {
  const promises = newFiles.map((file: any) => {
    return cloudinary.uploader.upload(file.filepath, {
      folder: "hackspsu2024"
    });
  });

  return await Promise.all(promises);
}

export async function uploadFile(formData: any) {
  try {
    const newFiles = await saveFileToLocal(formData);

    const pdfFiles = await uploadFileToCloudinary(newFiles);

    newFiles.map((file) => fs.unlink(file.filepath));

    // save files to mongoDB
    const newPdfFiles = pdfFiles.map((file) => {
      const newFile = new FileModel({
        user_id: formData.get("user_id"),
        session_id: formData.get("session_id"),
        public_id: file.public_id,
        secure_url: file.secure_url
      });
      return newFile;
    });

    // console.log(newPdfFiles);
    await FileModel.insertMany(newPdfFiles);

    return { msg: "Upload Success" };
  } catch (error: any) {
    return { errMsg: error.message };
  }
}
