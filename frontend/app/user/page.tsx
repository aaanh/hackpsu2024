"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserPage() {
  const user = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the user page</p>
    </div>
  );
}
