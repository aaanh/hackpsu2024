"use client";

import UploadForm from "@/components/UploadForm";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const user = useUser();
  const [response, setResponse] = useState({});

  function startAnalysis() {
    const session_id = localStorage.getItem("session_id");
    try {
      fetch(`https://backend.cantcheatwiththis.tech/analyze/${session_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        mode: "cors"
      })
        .then((response) => response.json())
        .then((data) => setResponse(data));
    } catch (err: any) {
      console.error(err);
    }
  }
  return (
    <main className="w-full flex items-center min-h-[92vh] justify-center flex-col">
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
