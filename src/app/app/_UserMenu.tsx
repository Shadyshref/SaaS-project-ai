"use client";

import { useTransition } from "react";
import { LogOut, UserRound } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type UserMenuUser = {
  email: string;
  imageUrl: string;
  name: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const menuItemHoverClassName =
  "text-foreground focus:bg-primary focus:text-primary-foreground data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground";

export function UserMenu({ user }: { user: UserMenuUser }) {
  const { openUserProfile, signOut } = useClerk();
  const [isPending, startTransition] = useTransition();
  const initials = getInitials(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open user menu"
        type="button"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-10 rounded-full p-0"
        )}
      >
        <Avatar size="default">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="space-y-1 px-2 py-2">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={menuItemHoverClassName}
          onClick={() => openUserProfile()}
        >
          <UserRound />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className={menuItemHoverClassName}
          disabled={isPending}
          onClick={() => {
            startTransition(() => {
              void signOut({ redirectUrl: "/" });
            });
          }}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
