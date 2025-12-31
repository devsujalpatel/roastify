"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending: isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && session) {
      router.replace("/dashboard");
    }
  }, [session, isLoading, router]);

  // 🔑 Key line: don't render login UI if redirecting
  if (isLoading || session) return null;

  return <>{children}</>;
}
