"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  function handleLogin() {
    router.push("/api/auth/login");
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col">
      <div className="text-center">
        <Button className="w-full" onClick={handleLogin} size={"lg"}>
          Login
        </Button>
      </div>
    </div>
  );
}
