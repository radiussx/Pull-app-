"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [isReady, setIsReady] =
    useState(false);

  useEffect(() => {

    const user =
      sessionStorage.getItem("user");

    if (!user) {

      router.replace("/login");

    } else {

      setIsReady(true);
    }

  }, [router]);

  if (!isReady) {

    return (
      <div className="min-h-screen bg-black" />
    );
  }

  return <>{children}</>;
}