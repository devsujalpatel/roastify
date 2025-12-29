"use client";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
