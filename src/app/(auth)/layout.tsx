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

  if (isLoading) return null; // ya spinner daal le

  return <>{children}</>;
}
