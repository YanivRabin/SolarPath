"use client";

import ImageGallery from "@/components/ImageGallery";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@/types/var";

export default function Projects() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(baseURL + "projects").then((res) => {
      setImages(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">
      {images.map((project: any) => (
        <ImageGallery
          key={project.id}
          title={project.title}
          images={project.images}
        />
      ))}
      <ScrollToTop />
    </div>
  );
}
