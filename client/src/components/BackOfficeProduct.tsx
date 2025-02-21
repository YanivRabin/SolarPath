import React from "react";
import { BackOfficeProductProps, Product } from "@/types/product";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function BackOfficeProduct({
  products,
  onEdit,
  onDelete,
}: BackOfficeProductProps) {
  const handleEdit = (product: Product) => {
    if (onEdit) {
      onEdit(product);
    } else {
      console.log("Edit product:", product);
    }
  };

  const handleDelete = (product: Product) => {
    if (onDelete) {
      onDelete(product);
    } else {
      console.log("Delete product:", product);
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full table-auto text-center border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 font-medium text-gray-600">Image</th>
            <th className="px-4 py-2font-medium text-gray-600">Name</th>
            <th className="px-4 py-2font-medium text-gray-600">Category</th>
            <th className="px-4 py-2font-medium text-gray-600">Edit</th>
            <th className="px-4 py-2 font-medium text-gray-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 object-cover rounded mx-auto"
                />
              </td>
              <td className="px-4 py-2 text-gray-800">{product.name}</td>
              <td className="px-4 py-2 text-gray-800">{product.category}</td>
              <td className="px-4 py-2">
                <button
                  className="inline-flex items-center justify-center w-10 h-10"
                  onClick={() => handleEdit(product)}
                >
                  <FaEdit className="text-blue-800 hover:text-blue-500 text-xl" />
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="inline-flex items-center justify-center w-10 h-10"
                  onClick={() => handleDelete(product)}
                >
                  <FaTrash className="text-red-800 hover:text-red-500 text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
