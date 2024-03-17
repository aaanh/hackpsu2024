"use client";

import UploadForm from "@/components/UploadForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const user = useUser();

  function startAnalysis() {
    const session_id = localStorage.getItem("session_id");
    fetch(`/api/analysis?session_id=${session_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ session_id })
    });
  }

  return (
    <main className="w-full flex items-center justify-center flex-col">
      {user.user ? (
        <>
          <UploadForm></UploadForm>
          <br></br>
          {localStorage.getItem("session_id") ? (
            <Button
              className="bg-green-500 hover:bg-green-400"
              onClick={startAnalysis}
            >
              Start Analysis
            </Button>
          ) : null}
        </>
      ) : (
        <h1 className="text-4xl">
          Please login to get started with document analysis.
        </h1>
      )}
    </main>
  );
}
