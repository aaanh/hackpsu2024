"use client";
import { useRef, useState } from 'react';
import ButtonSubmit from './ButtonSubmit';
import { uploadFile } from '@/actions/uploadActions';
import React from 'react'

const UploadForm = () => {
  const formRef = useRef();
  const [files, setFiles] = useState([]);

  async function handleInputFiles(e) {
    const files = e.target.files;

    // configure max file size (10MB) and type
    // const newFiles = [...files].filter((file) => {
    //   if (file.type === 'application/pdf' && file.size < 10000000) {
    //     return file;
    //   }
    // });

    setFiles(prev => [...files, ...prev]);
    formRef.current.reset();
  }

  async function handleDeleteFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload() {
    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    // await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // });

    const res = await uploadFile(formData);
    if(res?.msg) alert(`Success: ${res.msg}`);
    if(res?.error) alert(`Error: ${res.error}`);

    setFiles([]);
    formRef.current.reset();

    // revalidatePath("/"); // revalidate the path to update the UI
  }

  return (
    <form action={handleUpload} ref={formRef}>
      <input type="file" accept="" multiple onChange={handleInputFiles} />
      <ul>
        {files.map((file, index) => (
          <div key={index}>
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            <button type='button' onClick={() => handleDeleteFile(index)}>Delete</button>
          </div>
        ))}
      </ul>
      <ButtonSubmit value="Upload" />
    </form>
  )
}

export default UploadForm;