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

      try {

        const loggedIn =
          localStorage.getItem("loggedIn");

        const sessionId =
          localStorage.getItem("sessionId");

        // =========================
        // LOCAL CHECK
        // =========================

        if (
          loggedIn !== "true" ||
          !sessionId
        ) {

          localStorage.clear();

          router.replace("/login");

          return;
        }

        // =========================
        // CHECK ACTIVE SESSION
        // =========================

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=getSessions`
        );

        const sessions =
          await response.json();

        const validSession =
          sessions.find(
            (s: any) =>
              s.sessionId === sessionId
          );

        // =========================
        // FORCE LOGOUT DETECTED
        // =========================

        if (!validSession) {

          alert("Your session has ended.");

          localStorage.clear();

          router.replace("/login");

          return;
        }

        setAuthorized(true);

      } catch (error) {

        console.error(error);

        localStorage.clear();

        router.replace("/login");
      }
    }

    // FIRST CHECK
    verifySession();

    // LIVE CHECK EVERY 3 SECONDS
    interval = setInterval(() => {

      verifySession();

    }, 3000);

    return () => clearInterval(interval);

  }, [router]);

  // =========================
  // LOADING
  // =========================

  if (!authorized) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl font-bold">
        Checking Session...
      </div>
    );
  }

  return <>{children}</>;
}