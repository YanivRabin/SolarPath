"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const products = [
  {
    id: "ars-solar-light",
    name: "ARS Solar Street Light",
    category: "cobra",
    image: "/products/ars/ARS.png",
  },
  {
    id: "srl-solar-light",
    name: "SRL Solar Pathway Light",
    category: "cobra",
    image: "/products/srl/SRL.png",
  },
  {
    id: "srs-solar-light",
    name: "SRS Solar Flood Light",
    category: "cobra",
    image: "/products/srs/SRS.png",
  },
];

export default function Products() {
      const params = useParams();
      const category = params.category;
    
      // Filter products based on category
      const filteredProducts = products.filter((p) => p.category === category);
    
      // If no products are found, show a message
      if (filteredProducts.length === 0) {
        return (
          <div className="h-screen flex justify-center items-center text-2xl text-gray-600">
            No products found in this category.
          </div>
        );
      }

  return (
    <div className="h-[calc(100vh-80px)] mx-auto p-8 bg-white">
      <h1 className="text-5xl font-bold mb-6 mt-6 text-center text-title">
        {typeof category === 'string' ? category.toUpperCase() : ''} Products
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-center">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${category}/${product.id}`}>
            <div className="border rounded-md shadow-md hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between p-6">
              {/* Product Image */}
              <div className="w-40 h-40">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              {/* Product Name */}
              <h2 className="text-lg text-subtitle text-center">
                {product.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
