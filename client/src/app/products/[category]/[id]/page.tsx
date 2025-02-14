"use client";

import { notFound } from "next/navigation";
import { useState, use } from "react";
import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: "ars-solar-light",
    name: "ARS Solar Street Light",
    category: "cobra",
    colors: [
      { code: "#000", name: "Black", image: "/products/ars/black.png" },
      { code: "#FFF", name: "White", image: "/products/ars/white.png" },
      { code: "#554E3D", name: "Bronze", image: "/products/ars/bronze.png" },
      { code: "#ACACAC", name: "Silver", image: "/products/ars/silver.png" },
      { code: "#7F7F7F", name: "Grey", image: "/products/ars/grey.png" },
    ],
    additionalInfo: [
      {
        label: "About",
        value:
          "The ARS series is an ideal solution for street lighting, available in multiple drive currents and optical distributions. Combining it with our optional motion sensor allows for even greater energy savings.",
      },
      {
        label: "Apllications",
        value:
          "Street light | Parking lots | Boardwalks | Farms | Parks | Gardens and more.",
      },
      { label: "Spec Sheet", value: "Download Here", link: "#" },
    ],
  },
  {
    id: "srl-solar-light",
    name: "SRL Solar Street Light",
    category: "cobra",
    colors: [
      { code: "#000", name: "Black", image: "/products/srl/black.png" },
      { code: "#FFF", name: "White", image: "/products/srl/white.png" },
      { code: "#554E3D", name: "Bronze", image: "/products/srl/bronze.png" },
      { code: "#ACACAC", name: "Silver", image: "/products/srl/silver.png" },
      { code: "#7F7F7F", name: "Grey", image: "/products/srl/grey.png" },
    ],
    additionalInfo: [
      {
        label: "About",
        value:
          "SRL series area light is perfect for outdoor area lighting, providing significant energy and maintenance savings while improving illumination performance.",
      },
      {
        label: "Apllications",
        value:
          "Street light | Parking lots | Boardwalks | Farms | Parks | Gardens and more.",
      },
      { label: "Spec Sheet", value: "Download Here", link: "#" },
    ],
  },
  {
    id: "srs-solar-light",
    name: "SRS Solar Flood Light",
    category: "cobra",
    colors: [
      { code: "#000", name: "Black", image: "/products/srs/black.png" },
      { code: "#FFF", name: "White", image: "/products/srs/white.png" },
      { code: "#554E3D", name: "Bronze", image: "/products/srs/bronze.png" },
      { code: "#ACACAC", name: "Silver", image: "/products/srs/silver.png" },
      { code: "#7F7F7F", name: "Grey", image: "/products/srs/grey.png" },
    ],
    additionalInfo: [
      {
        label: "About",
        value:
          "SRS series area light is perfect for outdoor area lighting, providing significant energy and maintenance savings while improving illumination performance.",
      },
      {
        label: "Apllications",
        value:
          "Street light | Parking lots | Boardwalks | Farms | Parks | Gardens and more.",
      },
      { label: "Spec Sheet", value: "Download Here", link: "#" },
    ],
  },
];

export default function SingleProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  // Set initial color & image
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <section className="h-[calc(100vh-80px)] overflow-hidden flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-6">
          {/* left */}
          <div className="p-6">
            {/* Product Name */}
            <h1 className="text-3xl text-title font-semibold">
              {product.name}
            </h1>

            {/* Additional Information */}
            <div className=" pt-6">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {product.additionalInfo.map((info, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4 font-medium text-subtitle">
                        {info.label}
                      </td>
                      {info.label === "Spec Sheet" ? (
                        <td className="py-3 px-4">
                          <a
                            href={info.link}
                            className="text-primary underline"
                          >
                            {info.value}
                          </a>
                        </td>
                      ) : (
                        <td className="py-3 px-4">{info.value}</td>
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
                src={selectedColor.image}
                alt={product.name}
                className="h-96 w-auto object-cover transition-all duration-300"
              />
            </div>

            {/* Color Selection */}
            <div className="flex justify-center gap-4 my-6">
              {product.colors.map((color) => (
                <div key={color.code} className="relative group">
                  <button
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor.code === color.code
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
