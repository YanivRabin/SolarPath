"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { ReactNode } from "react";

interface ProtectedContentProps {
  children: ReactNode;
}

export default function ProtectedContent({ children }: ProtectedContentProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(true);

  useEffect(() => {
    const token = Cookies.get("session");
    if (!token) {
      setAuthorized(false);
      // Optionally, wait a couple of seconds before redirecting
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50">
        <h1 className="text-white text-2xl">Unauthorized</h1>
      </div>
    );
  }

  return <>{children}</>;
}
