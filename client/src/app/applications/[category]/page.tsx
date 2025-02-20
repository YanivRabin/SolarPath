"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Product } from "@/types/product";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL } from "@/types/var";

export default function Applications() {
  const params = useParams();
  const category = params.category?.toString() || "";
  // Convert a hyphenated string to title case, e.g., "streets-lighting" -> "Streets Lighting"
  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`);
        // filter products based on applications, take only the products that have the same application as the category
        const filteredProducts = response.data.filter(
          (product: Product) =>
            category && product.additionalInfo[1].value.includes(formattedCategory)
        );
        setProducts(filteredProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2 h-1 bg-blue-500 animate-pulse"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-title text-3xl font-semibold">{error}</p>
      </div>
    );

  // If no products are found, show a message
  if (products.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-2xl text-gray-600">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] mx-auto p-8 bg-white">
      <h1 className="text-5xl font-bold mb-6 mt-6 text-center text-title">
        {formattedCategory} Products
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-center">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${category}/${product.id}`}>
            <div className="border rounded-md shadow-md hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-between p-6">
              {/* Product Image */}
              <div className="w-40 h-40">
                <img src={product.image} alt={product.name} />
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
