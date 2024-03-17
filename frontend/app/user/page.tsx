"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function UserPage() {
  const user = useUser();

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <div className="flex items-center bg-neutral-900 rounded-xl border p-4">
          <div className="w-32 h-32 relative m-4">
            <Image
              className="rounded-full border-2 border-white p-2"
              src={user.user?.picture ?? ""}
              alt={user.user?.name ?? ""}
              fill={true}
            ></Image>
          </div>
          {user.isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h1 className="text-4xl">User Profile</h1>{" "}
              <p>User ID: {user.user?.sub}</p>
              <p>
                Name:{" "}
                {user.user?.nickname ? user.user?.nickname : user.user?.name}
              </p>
              <p>E-mail: {user.user?.email}</p>
              <p>
                E-mail verification status:{" "}
                {user.user?.email_verified ? "Verified" : "Unverified"}
              </p>
              <p>Organization ID: {user.user?.org_id}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
