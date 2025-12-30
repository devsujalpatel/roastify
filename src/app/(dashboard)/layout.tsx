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
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  return <>{children}</>;
}
