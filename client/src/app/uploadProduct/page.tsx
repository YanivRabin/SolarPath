"use client";

import { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3001/api/products";
const applicationOptions = [
  "Streets Lighting",
  "Parking Lots",
  "Residential Roads",
  "Public Parks",
  "Sports Lighting",
  "High Speed way",
  "Boardwalks",
  "Farms",
  "Private gardens",
  "Access roads",
  "Walking paths",
];

export default function UploadProduct() {
  // Product details
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // Color image files
  const [mainImage, setMainImage] = useState(null);
  const [blackImage, setBlackImage] = useState(null);
  const [whiteImage, setWhiteImage] = useState(null);
  const [bronzeImage, setBronzeImage] = useState(null);
  const [silverImage, setSilverImage] = useState(null);
  const [greyImage, setGreyImage] = useState(null);

  // Additional info fields
  const [about, setAbout] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [specSheetLink, setSpecSheetLink] = useState(null);

  // To show the response from the backend
  const [result, setResult] = useState<{ error?: string; data?: any } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Fixed color data (the order here must match the order of your color image uploads)
  const colorsData = [
    { code: "#000", name: "Black" },
    { code: "#FFF", name: "White" },
    { code: "#554E3D", name: "Bronze" },
    { code: "#ACACAC", name: "Silver" },
    { code: "#7F7F7F", name: "Grey" },
  ];

  const handleCheckboxChange = (option: string) => {
    if (selectedApplications.includes(option)) {
      // Uncheck: remove the option
      setSelectedApplications((prev) => prev.filter((item) => item !== option));
    } else {
      // Check: add the option
      setSelectedApplications((prev) => [...prev, option]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    // Append basic fields
    formData.append("name", name);
    formData.append("category", category);

    // Append main image file
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    // Append color image files in the defined order
    if (blackImage) formData.append("colorImages", blackImage);
    if (whiteImage) formData.append("colorImages", whiteImage);
    if (bronzeImage) formData.append("colorImages", bronzeImage);
    if (silverImage) formData.append("colorImages", silverImage);
    if (greyImage) formData.append("colorImages", greyImage);

    // Append colors data as JSON string
    formData.append("colors", JSON.stringify(colorsData));

    // Append additional info as JSON string
    const additionalInfo = [
      { label: "About", value: about },
      { label: "Apllications", value: selectedApplications },
      { label: "Spec Sheet", value: "Donwload Here", link: specSheetLink },
    ];
    formData.append("additionalInfo", JSON.stringify(additionalInfo));

    // Append spec sheet file
    if (specSheetLink) {
      formData.append("specSheetLink", specSheetLink);
    }

    try {
      const response = await axios.post(baseURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error: any) {
      console.error("Error uploading product:", error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Product Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Category:{" "}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="All In One">All In One</option>
              <option value="All In Two">All In Two</option>
              <option value="Bollards">Bollards</option>
              <option value="Cobra">Cobra</option>
              <option value="Deco">Deco</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Main Image:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setMainImage(e.target.files[0])}
              required
            />
          </label>
        </div>

        <h2>Color Images</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Black:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setBlackImage(e.target.files[0])}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            White:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setWhiteImage(e.target.files[0])}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Bronze:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setBronzeImage(e.target.files[0])}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Silver:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setSilverImage(e.target.files[0])}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Grey:{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e: any) => setGreyImage(e.target.files[0])}
              required
            />
          </label>
        </div>

        <h2>Additional Info</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            About:
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              cols={50}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Applications:
          </label>
          {applicationOptions.map((option) => (
            <div key={option} style={{ marginBottom: "0.25rem" }}>
              <label>
                <input
                  type="checkbox"
                  value={option}
                  checked={selectedApplications.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />{" "}
                {option}
              </label>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Spec Sheet:
            <input
              type="file"
              accept="application/pdf"
              onChange={(e: any) => setSpecSheetLink(e.target.files[0])}
            />
          </label>
        </div>

        <button type="submit">Create Product</button>
      </form>

      {loading && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="w-1/2 h-1 bg-blue-500 animate-pulse"></div>
        </div>
      )}

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
