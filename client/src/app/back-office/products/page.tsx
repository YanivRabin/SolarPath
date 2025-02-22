"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProtectedContent from "@/components/ProtectedContent";
import BackOfficeProduct from "@/components/BackOfficeProduct";
import { Product } from "@/types/product";
import { baseURL } from "@/types/var";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([
    "All Products",
    "All In One",
    "All In Two",
    "Bollards",
    "Cobra",
    "Deco",
  ]);
  const [processing, setProcessing] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    axios
      .get<Product[]>(`${baseURL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handler for category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // Handler for search input
  // Force uppercase by converting user input to uppercase
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toUpperCase());
  };

  // Filter products by category and search
  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All Products"
        ? true
        : product.category === selectedCategory
    )
    .filter((product) =>
      searchTerm === "" ? true : product.name.includes(searchTerm)
    );

  const handleEdit = (product: Product) => {
    console.log("Editing product:", product);
    // For example, open an edit modal or navigate to an edit page
  };

  const handleDelete = (product: Product) => {
    setProcessing(true);
    axios
      .delete(`${baseURL}/products/${product.id}`)
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== product.id)); 
      })
      .catch((err) => console.error(err))
      .finally(() => setProcessing(false));
  };

  return (
    <ProtectedContent>
      <fieldset disabled={processing} className="w-full">
      <div className="ml-64 h-screen overflow-y-auto bg-white">
        {/* header */}
        <section>
          <h1 className="text-2xl text-white font-bold bg-gray-700 mb-4 p-6">
            All Products
          </h1>
        </section>

        {/* filter and search products */}
        <section className="p-6">
          <div className="flex justify-between items-center mb-4">
            {/* Filter on the left side */}
            <div className="flex items-center">
              <h2 className="text-xl font-semibold mr-4">
                Filter by Category:
              </h2>
              <select
                className="p-2 border border-gray-400 rounded-md"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Search bar on the right side */}
            <div className="flex items-center">
              <input
                type="text"
                className="p-2 border border-gray-400 rounded-md uppercase"
                placeholder="SEARCH"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {/* <button className="p-2 bg-sky-800 hover:bg-sky-600 text-white ml-2 rounded-md">
                Search
              </button> */}
            </div>
          </div>
        </section>

        {/* Product Table */}
        <section className="bg-white">
          <BackOfficeProduct
            products={filteredProducts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
      </fieldset>
    </ProtectedContent>
  );
}
