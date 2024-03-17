"use client";
import { useRef, useState } from "react";
import ButtonSubmit from "./ButtonSubmit";
import { uploadFile } from "@/actions/uploadActions";
import React from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { v4 as uuidv4 } from "uuid";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const UploadForm = () => {
  const user = useUser();

  const formRef = useRef();
  const [files, setFiles] = useState([]);

  async function handleInputFiles(e) {
    const files = e.target.files;

    setFiles((prev) => [...files, ...prev]);
    console.log(files);
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

    localStorage.setItem("session_id", session_id);

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
      <input
        className="mb-4"
        type="file"
        accept=""
        multiple
        onChange={handleInputFiles}
      />
      <ButtonSubmit value="Upload" />
      <br></br>

      <Table>
        <TableCaption>Files selected for upload</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>File name</TableHead>
            <TableHead>File size</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{file.name}</TableCell>
              <TableCell>
                {(file.size / (1024 * 1024)).toFixed(2)} {" MB"}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"destructive"}
                  type="button"
                  onClick={() => handleDeleteFile(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Size</TableCell>
            <TableCell className="text-right">{files.forEach()}</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </form>
  );
};

export default UploadForm;
