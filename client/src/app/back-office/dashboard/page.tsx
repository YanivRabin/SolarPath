"use client";

import ProtectedContent from "@/components/ProtectedContent";

export default function Dashboard() {
  return (
    <ProtectedContent>
      <div className="ml-64 h-screen overflow-y-auto p-6 bg-white">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      </div>
    </ProtectedContent>
  );
}
