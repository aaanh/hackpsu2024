"use client";
import { useRef, useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import { uploadFile } from "@/actions/uploadActions";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { v4 as uuidv4 } from "uuid";

const UploadForm = () => {
  const [history, setHistory] = useState([]);

  const user = useUser();

  const formRef = useRef();
  const [files, setFiles] = useState([]);

  async function handleInputFiles(e) {
    const files = e.target.files;

    setFiles((prev) => [...files, ...prev]);
    formRef.current.reset();
  }

  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload() {
    const session_id = uuidv4();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("user_id", user.user.sub);
    formData.append("session_id", session_id);

    // await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // });

    const res = await uploadFile(formData);
    if (res?.msg) alert(`Success: ${res.msg}`);
    if (res?.error) alert(`Error: ${res.error}`);

    setFiles([]);
    formRef.current.reset();

    // revalidatePath("/"); // revalidate the path to update the UI
  }

  return (
    <form action={handleUpload} ref={formRef}>
      <input type="file" accept="" multiple onChange={handleInputFiles} />
      <ul>
        {files.map((file, index) => (
          <div key={index} className="my-1">
            {index + 1}. {file.name} ({(file.size / (1024 * 1024)).toFixed(2)}{" "}
            MB) &nbsp;
            <Button
              variant={"destructive"}
              type="button"
              onClick={() => handleDeleteFile(index)}
            >
              Delete
            </Button>
          </div>
        ))}
      </ul>
      <ButtonSubmit value="Upload" />
    </form>
  );
};

export default UploadForm;
