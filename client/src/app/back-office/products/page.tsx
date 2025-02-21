"use client";

import ProtectedContent from "@/components/ProtectedContent";

export default function Products() {
  return (
    <ProtectedContent>
      <div className="ml-64 h-screen overflow-y-auto p-6 bg-white">
          <h1 className="text-2xl font-bold mb-4">All Products</h1>
      </div>
    </ProtectedContent>
  );
}
