"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {

    const user =
      localStorage.getItem("starbux_user");

    if (!user) {

      router.push("/");
    }

  }, [router]);

  return <>{children}</>;
}