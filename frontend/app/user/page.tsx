"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function UserPage() {
  const user = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl">User Profile</h1>
      <div>
        <div className="w-32 h-32 relative">
          <Image
            className="rounded-full"
            src={user.user?.picture ?? ""}
            alt={user.user?.name ?? ""}
            fill={true}
          ></Image>
        </div>
        {user.isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {" "}
            <p>User ID: {user.user?.sub}</p>
            <p>Name: {user.user?.name}</p>
            <p>E-mail: {user.user?.email}</p>
            <p>E-mail verification status: {user.user?.email_verified}</p>
            <p>Organization ID: {user.user?.org_id}</p>
          </>
        )}
      </div>
    </div>
  );
}
