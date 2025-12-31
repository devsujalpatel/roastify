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
    if (isLoading) return;

    if (!session) {
      router.replace("/login");
      return;
    }
  }, [session, isLoading, router]);

  if (isLoading || !session) return null;

  return <>{children}</>;
}
