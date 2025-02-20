"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useParams } from "next/navigation";
import axios from "axios";
import { baseURL } from "@/types/var";

export default function SingleProduct() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState<{
    code: string;
    image: string;
    name: string;
  } | null>(null);
  const [applications, setApplications] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${baseURL}/products/${id}`);
        setProduct(response.data);
        setSelectedColor(response.data.colors[0]);
        setApplications(response.data.additionalInfo[1].value);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  return (
    <section className="h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-6">
          {/* left */}
          <div className="p-6">
            {/* Product Name */}
            <h1 className="text-3xl text-title font-semibold">
              {product?.name}
            </h1>

            {/* Additional Information */}
            <div className=" pt-6">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product?.additionalInfo.map((info, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4 font-medium text-subtitle">
                        {info.label}
                      </td>
                      {info.label === "About" && (
                        <td className="py-3 px-4">{info.value}</td>
                      )}
                      {info.label === "Apllications" &&
                        applications.length > 0 && (
                          <td className="py-3 px-4">
                            <ul className="list-disc list-inside">
                              {applications.map((app, index) => (
                                <li key={index}>{app}</li>
                              ))}
                            </ul>
                          </td>
                        )}
                      {info.label === "Spec Sheet" && (
                        <td className="py-3 px-4">
                          <a
                            href={info.link}
                            className="text-primary underline"
                          >
                            {info.value}
                          </a>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* right */}
          <div className="p-6">
            {/* Product Image */}
            <div className="flex justify-center mt-6">
              <img
                src={selectedColor?.image || ""}
                alt={product?.name}
                className="h-96 w-auto object-cover transition-all duration-300"
              />
            </div>

            {/* Color Selection */}
            <div className="flex justify-center gap-4 my-6">
              {product?.colors.map((color) => (
                <div key={color.code} className="relative group">
                  <button
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor?.code === color.code
                        ? "border-gray-800 scale-110"
                        : "border-black"
                    } transition-all duration-300`}
                    style={{ backgroundColor: color.code }}
                  ></button>
                  <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
