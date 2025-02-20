"use client";

import { useState } from "react";
import axios from "axios";
import { baseURL } from "@/types/var";

export default function UploadProject() {
  const [name, setName] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    try {
      const response = await axios.post(baseURL + "projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Project uploaded:", response.data);
    } catch (err: any) {
      console.error("Error uploading project:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upload Project</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>
            Project Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Images:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e: any) => setImages(e.target.files)}
            />
          </label>
        </div>
        <button type="submit">Upload</button>
      </form>

      {loading && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="w-1/2 h-1 bg-blue-500 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
