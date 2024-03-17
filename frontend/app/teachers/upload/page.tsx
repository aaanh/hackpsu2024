import React, { useState } from 'react';
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
 
export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}
const UploadPage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            // Perform upload logic here
            console.log('Uploading file:', selectedFile);
        }
    };
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Upload PDF</Label>
          <Input id="picture" type="file" accept=".pdf" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      );
    };

export default UploadPage;