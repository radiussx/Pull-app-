"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    let interval: NodeJS.Timeout;

    async function verifySession() {

      const loggedIn =
        localStorage.getItem("loggedIn");

      const sessionId =
        localStorage.getItem("sessionId");

      // NOT LOGGED IN

      if (
        loggedIn !== "true" ||
        !sessionId
      ) {

        localStorage.clear();

        router.replace("/login");

        return;
      }

      try {

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=verifySession&sessionId=${sessionId}`
        );

        const data =
          await response.json();

        // SESSION DISABLED

        if (!data.active) {

          localStorage.clear();

          alert(
            "You were logged out by admin."
          );

          router.replace("/login");

          return;
        }

        setAuthorized(true);

      } catch (error) {

        console.error(error);
      }
    }

    // INITIAL CHECK

    verifySession();

    // CHECK EVERY 5 SECONDS

    interval = setInterval(() => {

      verifySession();

    }, 5000);

    return () => clearInterval(interval);

  }, [router]);

  // LOADING

  if (!authorized) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}