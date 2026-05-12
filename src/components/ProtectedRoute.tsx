"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {

      try {

        const user =
          window.localStorage.getItem("user");

        if (!user) {

          router.replace("/login");

        } else {

          setAuthorized(true);
        }

      } catch (error) {

        console.log(error);

        router.replace("/login");
      }

      setLoading(false);

    }, 300);

    return () => clearTimeout(timer);

  }, [pathname, router]);

  // LOADING
  if (loading) {

    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // BLOCK PAGE
  if (!authorized) {

    return null;
  }

  return <>{children}</>;
}