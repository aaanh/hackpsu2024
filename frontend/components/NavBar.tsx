"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "./theme-toggler";
import { FaHome, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FaLock, FaLockOpen } from "react-icons/fa6";

export function NavBar() {
  const pathname = usePathname();
  const user = useUser();

  return pathname !== "/login" ? (
    <NavigationMenu className="justify-between min-w-full flex p-2 sticky -top-10">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <FaHome></FaHome>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {user.isLoading ? (
          <p>Validating user session...</p>
        ) : user.user ? (
          <>
            <NavigationMenuItem>
              <Link href="/user" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <FaUser></FaUser> &nbsp; User Profile
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/api/auth/logout" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <FaLock></FaLock> &nbsp; Logout
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </>
        ) : (
          <NavigationMenuItem>
            <Link href="/api/auth/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <FaLockOpen></FaLockOpen> &nbsp; Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <ThemeToggle></ThemeToggle>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ) : (
    <NavigationMenu className="justify-between min-w-full flex p-2 sticky top-0">
      <NavigationMenuList>Attention is All You Need</NavigationMenuList>
      <NavigationMenuList>
        <NavigationMenuItem>
          <ThemeToggle></ThemeToggle>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
