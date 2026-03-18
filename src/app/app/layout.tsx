import { getCurrentUser } from "@/services/clerk/lib/getCurrentUser";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Navbar } from "./_Navbar";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const { userId, user } = await getCurrentUser({ allData: true });

  if (userId == null) return redirect("/");
  if (user == null) return redirect("/onboarding");

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />
      <main className="min-h-screen-header flex-1">{children}</main>
    </div>
  );
}
