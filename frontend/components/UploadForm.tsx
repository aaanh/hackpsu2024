import { useRef, useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import { uploadFile } from "@/actions/uploadActions";

const UploadForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  async function handleInputFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    const newFiles: File[] = Array.from(fileList).filter(
      (file) => file.type === "application/pdf" && file.size < 10000000
    );

    setFiles((prev) => [...prev, ...newFiles]);
    if (formRef.current) formRef.current.reset();
  }

  function handleDeleteFile(index: number) {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await uploadFile(formData);
    if (res?.msg) alert(`Success: ${res.msg}`);
    if (res?.error) alert(`Error: ${res.error}`);

    setFiles([]);
    if (formRef.current) formRef.current.reset();
  }

  return (
    <form onSubmit={handleUpload} ref={formRef}>
      <input type="file" accept=".pdf" multiple onChange={handleInputFiles} />
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            <button type="button" onClick={() => handleDeleteFile(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ButtonSubmit value="Upload" />
    </form>
  );
};

export default UploadForm;
