"use client";

import ImageGallery from "@/components/ImageGallery";
import ScrollToTop from "@/components/ScrollToTop";

const images = [
  "/projects/1.jpg",
  "/projects/2.jpg",
  "/projects/3.jpg",
  "/projects/4.jpg",
];

const images2 = [
  "/projects/5.jpg",
  "/projects/6.jpg",
  "/projects/7.jpg",
  "/projects/8.jpg",
];


export default function Projects() {
  
  return (
    <div className="min-h-screen bg-white p-10">
      <ImageGallery title="Area & Path Lighting" images={images} />
      <ImageGallery title="Garden & Landscape Lighting" images={images2} />
      <ImageGallery title="Garden & Landscape Lighting" images={images2} />
      <ScrollToTop />
    </div>
  );
}
