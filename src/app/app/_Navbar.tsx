import Link from "next/link";
import { BotMessageSquare } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { UsersTable } from "@/drizzle/schema";

import { UserMenu } from "./_UserMenu";

type NavbarUser = Pick<typeof UsersTable.$inferSelect, "email" | "imageUrl" | "name">;

export function Navbar({ user }: { user: NavbarUser }) {
  return (
    <header className="border-b h-header">
      <div className="container flex h-header items-center justify-between gap-4">
        <Link
          href="/app"
          className="flex items-center gap-3 rounded-md outline-none transition-colors  focus-visible:text-primary"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/15">
            <BotMessageSquare className="size-5" />
          </span>
          <span className="text-xl font-semibold tracking-tight">Ai Support</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}
