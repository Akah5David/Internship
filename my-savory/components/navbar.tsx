"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { AuthContext } from "./auth";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Item } from "@radix-ui/react-dropdown-menu";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About" },
  { href: "/auth/signup", label: "Sign Up" },
  { href: "/auth/signin", label: "Sign In" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { isLoggedIn, logout } = useContext(AuthContext);

  console.log("Is Logged In", isLoggedIn);

  const newNav = isLoggedIn
    ? nav.filter(
        (item) => item.href !== "/auth/signin" && item.href !== "/auth/signup"
      )
    : nav;

  const filteredNav = newNav.find((item) => item.href === pathname);
  const isActive = filteredNav
    ? "hover:rounded-none rounded-none border-none hover:text-white hover:bg-green-700 w-full"
    : "";
  const buttonCommonClass = cn(" px-2 py-2 text-sm flex items-center justify-center ", isActive);

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-4">
        {newNav.map((item) => {
          const isActive = item.href === pathname;

          const commonClass = cn(
            "rounded-md px-3 py-2 text-sm",
            isActive && "bg-green-600 text-white hover:bg-green-700"
          );

          return (
            <li key={item.href}>
              <Link href={item.href} className={commonClass}>
                {item.label}
              </Link>
            </li>
          );
        })}

        {isLoggedIn && (
          <>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none flex justify-center">
                    <Avatar>
                      <AvatarImage src="/user.png" alt="Me" />
                      <AvatarFallback>EA</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-[#c8c8c8] flex flex-col justify-center items-center gap-2 px-0 py-2">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <button onClick={logout} className={buttonCommonClass}>
                      Log out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link
                href="/admin/new-post"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm transition-colors hover:bg-primary/90"
              >
                <PlusCircle className="h-4 w-4" />
                New Post
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
