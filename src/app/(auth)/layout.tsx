"use client";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
