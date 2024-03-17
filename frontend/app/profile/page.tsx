"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

export default function ProfilePage() {
  const userCtx = useUser();

  return (
    <div className="flex items-center justify-center w-full flex-col">
      <div className="text-center">
        <h1 className="text-4xl pointer-events-none hover:pointer-events-none">
          Profile
        </h1>
        {userCtx.isLoading ? (
          <p>Loading...</p>
        ) : userCtx.error ? (
          <p>{userCtx.error.message}</p>
        ) : userCtx.user ? (
          <div className="flex justify-center items-center flex-col">
            <div className="h-32 w-32 relative">
              <Image
                src={userCtx.user.picture ?? ""}
                alt={userCtx.user.name ?? ""}
                className="rounded-full h-16 w-16 inline-block border p-2 dark:border-white"
                fill={true}
              ></Image>
            </div>
            <p>{userCtx.user.name}</p>
            <p>{userCtx.user.email}</p>
            <p>{userCtx.user.sub}</p>

            <code>
              {JSON.stringify(
                {
                  ...userCtx.user,
                  email_verified: userCtx.user.email_verified
                    ? "verified"
                    : "not verified"
                },
                null,
                " "
              )}
            </code>
          </div>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </div>
  );
}
