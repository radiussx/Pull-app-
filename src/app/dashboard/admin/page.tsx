"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Session {
  sessionId: string;
  username: string;
  loginTime: string;
  active: boolean;
  role: string;
}

export default function AdminPage() {

  const router = useRouter();

  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // ADMIN PROTECTION
  // =========================

  useEffect(() => {

    const role =
      sessionStorage.getItem("role");

    if (role !== "admin") {

      router.replace("/dashboard");

      return;
    }

    loadSessions();

  }, []);

  // =========================
  // LOAD ACTIVE SESSIONS
  // =========================

  async function loadSessions() {

    try {

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SCRIPT_URL}?action=getSessions`
      );

      const data =
        await response.json();

      setSessions(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  // =========================
  // FORCE LOGOUT
  // =========================

  async function logoutUser(
    sessionId: string
  ) {

    try {

      await fetch(
        process.env.NEXT_PUBLIC_SCRIPT_URL!,
        {

          method: "POST",

          body: JSON.stringify({

            action: "logoutSession",
            sessionId

          })

        }
      );

      loadSessions();

    } catch (error) {

      console.error(error);
    }
  }

  // =========================
  // LOGOUT
  // =========================

  function logout() {

    sessionStorage.clear();

    window.location.href =
      "/login";
  }

  return (

    <ProtectedRoute>

      <div className="min-h-screen bg-black text-white p-5 pb-24">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Active User Sessions
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-500 transition-all px-5 py-3 rounded-2xl font-bold"
          >
            Logout
          </button>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="text-zinc-400">
            Loading sessions...
          </div>
        )}

        {/* SESSION LIST */}

        <div className="space-y-4">

          {sessions.map((session) => (

            <div
              key={session.sessionId}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    {session.username}
                  </h2>

                  <p className="text-green-500 font-semibold mt-1">
                    {session.role}
                  </p>

                  <p className="text-zinc-400 text-sm mt-2">
                    Logged In:
                  </p>

                  <p className="text-zinc-500 text-sm">
                    {session.loginTime}
                  </p>

                </div>

                <button
                  onClick={() =>
                    logoutUser(
                      session.sessionId
                    )
                  }
                  className="bg-red-600 hover:bg-red-500 transition-all px-5 py-3 rounded-2xl font-bold"
                >
                  Force Logout
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* NAVIGATION */}

        <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 h-20 flex items-center justify-around z-50">

          <a
            href="/dashboard"
            className="flex flex-col items-center text-zinc-400 text-[10px]"
          >
            <span className="text-lg">🏠</span>
            Dashboard
          </a>

          <a
            href="/deck"
            className="flex flex-col items-center text-zinc-400 text-[10px]"
          >
            <span className="text-lg">📦</span>
            Deck
          </a>

          <a
            href="/dashboard/bakery"
            className="flex flex-col items-center text-zinc-400 text-[10px]"
          >
            <span className="text-lg">🥐</span>
            Bakery
          </a>

          <a
            href="/dashboard/breakfast"
            className="flex flex-col items-center text-zinc-400 text-[10px]"
          >
            <span className="text-lg">🍳</span>
            Breakfast
          </a>

          <a
            href="/dashboard/milk"
            className="flex flex-col items-center text-zinc-400 text-[10px]"
          >
            <span className="text-lg">🥛</span>
            Milk
          </a>

          <a
            href="/dashboard/admin"
            className="flex flex-col items-center text-red-400 text-[10px] font-bold"
          >
            <span className="text-lg">🛡️</span>
            Admin
          </a>

        </div>

      </div>

    </ProtectedRoute>
  );
}