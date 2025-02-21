"use client";

import { useState } from "react";
import axios from "axios";
import ProtectedContent from "@/components/ProtectedContent";
import { applicationOptions } from "@/types/product";
import { baseURL } from "@/types/var";

export default function AddNewProduct() {
  // Product details
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // Color image files
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [blackImage, setBlackImage] = useState<File | null>(null);
  const [whiteImage, setWhiteImage] = useState<File | null>(null);
  const [bronzeImage, setBronzeImage] = useState<File | null>(null);
  const [silverImage, setSilverImage] = useState<File | null>(null);
  const [greyImage, setGreyImage] = useState<File | null>(null);

  // Additional info fields
  const [about, setAbout] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [specSheetLink, setSpecSheetLink] = useState(null);

  // To show the response from the backend
  const [loading, setLoading] = useState(false);

  // Track which tab is active
  const [activeTab, setActiveTab] = useState<
    "about" | "applications" | "colors" | "spec sheet"
  >("about");

  // Fixed color data (the order here must match the order of your color image uploads)
  const colorsData = [
    { code: "#000", name: "Black" },
    { code: "#FFF", name: "White" },
    { code: "#554E3D", name: "Bronze" },
    { code: "#ACACAC", name: "Silver" },
    { code: "#7F7F7F", name: "Grey" },
  ];

  // Renders the appropriate content based on the active tab
  const renderTabContent = () => {
    if (activeTab === "about") {
      return (
        <div className="w-full h-full pr-3 pb-3">
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full h-full resize-none border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      );
    } else if (activeTab === "applications") {
      return (
        <div className="grid grid-cols-2 gap-4 w-full h-full pr-3 pb-3">
          {applicationOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={option}
                checked={selectedApplications.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="h-6 w-6 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-xl font-semibold text-gray-700">
                {option}
              </span>
            </label>
          ))}
        </div>
      );
    } else if (activeTab === "colors") {
      return (
        <div className="w-full h-full  pr-3 pb-3 flex items-center space-x-4">
          {/* left side */}
          <div className="4/12 space-y-9 text-lg font-medium">
            <label className="block">Black</label>
            <label className="block">White</label>
            <label className="block">Bronze</label>
            <label className="block">Silver</label>
            <label className="block">Grey</label>
          </div>
          {/* right side */}
          <div className="8/12 space-y-6 ">
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setBlackImage(e.target.files[0])}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setWhiteImage(e.target.files[0])}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setBronzeImage(e.target.files[0])}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setSilverImage(e.target.files[0])}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e: any) => setGreyImage(e.target.files[0])}
                required
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "spec sheet") {
      return (
        <div className="pr-3 pb-3">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e: any) => setSpecSheetLink(e.target.files[0])}
            className=" shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      );
    }
  };

  const handleCheckboxChange = (option: string) => {
    if (selectedApplications.includes(option)) {
      setSelectedApplications((prev) => prev.filter((item) => item !== option));
    } else {
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
      { label: "Applications", value: selectedApplications },
      { label: "Spec Sheet", value: "Download Here", link: specSheetLink },
    ];
    formData.append("additionalInfo", JSON.stringify(additionalInfo));

    // Append spec sheet file
    if (specSheetLink) {
      formData.append("specSheetLink", specSheetLink);
    }

    try {
      await axios.post(`${baseURL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error: any) {
      console.error("Error uploading product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedContent>
      <div className="ml-64 min-h-screen bg-gray-100">
        {/* Header */}
        <section className="mb-10">
          <h1 className="text-2xl font-bold text-white bg-gray-700 p-6">
            Add New Products
          </h1>
        </section>

        {/* Form */}
        <section className="">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex px-10 pb-10"
          >
            {/* LEFT (70%) */}
            <div className="w-8/12 pr-6">
              {/* Product Name */}
              <div className="mb-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  required
                  className="block w-full p-2 placeholder:font-bold placeholder:text-xl border border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 uppercase"
                />
              </div>

              {/* Product Data */}
              <div className="mx-auto bg-white shadow-md rounded">
                {/* Top Title */}
                <h1 className="text-xl font-bold p-4 bg-gray-200 text-gray-900 mb-6">
                  Product Data
                </h1>

                {/* Main Container: Sidebar (Tabs) + Content */}
                <div className="flex w-full" style={{ height: "333px" }}>
                  {/* Left Sidebar (Tabs) */}
                  <div className="w-1/4 border-r border-gray-200 mr-4 pb-4">
                    <ul className="space-y-2">
                      <li>
                        <button
                          type="button"
                          className={`block w-full text-left p-2 hover:bg-gray-100 ${
                            activeTab === "about"
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }`}
                          onClick={() => setActiveTab("about")}
                        >
                          About
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`block w-full text-left p-2 hover:bg-gray-100 ${
                            activeTab === "applications"
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }`}
                          onClick={() => setActiveTab("applications")}
                        >
                          Applications
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`block w-full text-left p-2 hover:bg-gray-100 ${
                            activeTab === "colors"
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }`}
                          onClick={() => setActiveTab("colors")}
                        >
                          Colors
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`block w-full text-left p-2 hover:bg-gray-100 ${
                            activeTab === "spec sheet"
                              ? "bg-gray-200 font-semibold"
                              : ""
                          }`}
                          onClick={() => setActiveTab("spec sheet")}
                        >
                          Spec Sheet
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Right Content Area */}
                  <div className="w-3/4">{renderTabContent()}</div>
                </div>
              </div>
            </div>

            {/* RIGHT (30%) */}
            <div className="w-4/12">
              {/* Category */}
              <div className="mb-6">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 p-2 w-full text-xl rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a category</option>
                  <option value="All In One">All In One</option>
                  <option value="All In Two">All In Two</option>
                  <option value="Bollards">Bollards</option>
                  <option value="Cobra">Cobra</option>
                  <option value="Deco">Deco</option>
                </select>
              </div>

              {/* Main Image */}
              <div className="mb-6">
                <div className="flex items-center">
                  {/* Custom "Choose File" button */}
                  <label
                    className="w-full p-3 font-semibold cursor-pointer 
             flex items-center justify-center 
             bg-indigo-100 text-sky-900 rounded 
             hover:bg-sky-600 hover:text-white text-center"
                  >
                    Main Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files && e.target.files[0]) {
                          setMainImage(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      required
                    />
                  </label>
                </div>

                {/* Show file name if one is selected */}
                <div className="mt-2 flex items-center text-sm text-gray-700">
                  {mainImage && (
                    <span className="text-gray-700">{mainImage.name}</span>
                  )}
                </div>

                {/* Display a larger preview below, if desired */}
                {mainImage && (
                  <div className="mt-4">
                    <img
                      src={URL.createObjectURL(mainImage)}
                      alt="Preview"
                      className="w-f h-64 object-contain rounded border border-gray-300"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 font-semibold rounded bg-indigo-100 text-sky-900 hover:bg-sky-600 hover:text-white"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </ProtectedContent>
  );
}
