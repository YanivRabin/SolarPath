"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageGalleryProps } from "@/types/imageGallery";

export default function ImageGallery({ title, images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openModal = (index: number): void => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(null);
  };

  const prevImage = () => {
    if (currentIndex !== null) {
      const newIndex =
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  const nextImage = () => {
    if (currentIndex !== null) {
      const newIndex =
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold text-title mb-4">{title}</h2>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition"
            onClick={() => openModal(index)}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={100}
              height={75}
              className="object-cover w-full max-h-24"
            />
          </div>
        ))}
      </div>

      {/* Separating Line */}
      <div className="border-t border-gray-300 my-8"></div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={prevImage}
          >
            &#10094;
          </button>
          <div className="max-w-4xl mx-auto">
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={600}
              className="object-contain"
            />
          </div>
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={nextImage}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
