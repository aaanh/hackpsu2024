"use client";

import UploadForm from "@/components/UploadForm";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const user = useUser();

  return (
    <main className="w-full flex items-center justify-center flex-col">
      {user.user ? (
        <UploadForm></UploadForm>
      ) : (
        "Welcome! Please log in to upload files."
      )}
    </main>
  );
}
