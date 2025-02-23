"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProtectedContent from "@/components/ProtectedContent";
import { applicationOptions } from "@/types/product";
import { baseURL } from "@/types/var";
import { Product } from "@/types/product";
import { create } from "domain";

export default function AddNewProduct() {
  // Get the productId from the URL
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [specSheetUrl, setSpecSheetUrl] = useState<string | null>(null);
  const [blackUrl, setBlackUrl] = useState<string | null>(null);
  const [whiteUrl, setWhiteUrl] = useState<string | null>(null);
  const [bronzeUrl, setBronzeUrl] = useState<string | null>(null);
  const [silverUrl, setSilverUrl] = useState<string | null>(null);
  const [greyUrl, setGreyUrl] = useState<string | null>(null);

  // Product details
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  // Color image files
  const [mainImage, setMainImage] = useState<File>();
  const [blackImage, setBlackImage] = useState<File>();
  const [whiteImage, setWhiteImage] = useState<File>();
  const [bronzeImage, setBronzeImage] = useState<File>();
  const [silverImage, setSilverImage] = useState<File>();
  const [greyImage, setGreyImage] = useState<File>();

  // Additional info fields
  const [about, setAbout] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    []
  );
  const [specSheetLink, setSpecSheetLink] = useState<string | null>(null);

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

  // If productId exists, fetch its data to prefill the form
  useEffect(() => {
    if (productId) {
      axios
        .get(`${baseURL}/products/${productId}`)
        .then(async (res) => {
          const data: Product = res.data;
          setName(data.name);
          setCategory(data.category);
          setAbout(data.additionalInfo[0].value);
          if (Array.isArray(data.additionalInfo[1].value)) {
            // It's already an array of strings
            setSelectedApplications(data.additionalInfo[1].value);
          } else {
            // It's a single string; wrap it in an array
            setSelectedApplications([data.additionalInfo[1].value]);
          }
          setImageUrl(data.image);
          setSpecSheetUrl(
            data.additionalInfo[2]?.link?.split("/").pop() || null
          );
          setBlackUrl(data.colors[0].image?.split("/").pop() || null);
          setWhiteUrl(data.colors[1].image?.split("/").pop() || null);
          setBronzeUrl(data.colors[2].image?.split("/").pop() || null);
          setSilverUrl(data.colors[3].image?.split("/").pop() || null);
          setGreyUrl(data.colors[4].image?.split("/").pop() || null);
        })
        .catch((error) =>
          console.error("Error fetching product details:", error)
        );
    }
  }, [productId]);

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
            {/* black */}
            <div className="flex items-center space-x-4">
              {/* Custom label acting as a button */}
              <label
                htmlFor="blackImageInput"
                className="p-2 font-semibold cursor-pointer flex items-center justify-center 
               bg-indigo-100 text-sky-900 rounded hover:bg-sky-600 hover:text-white text-center 
               w-28 whitespace-normal break-words"
              >
                Upload File
              </label>
              {/* Hidden file input to remove default text */}
              <input
                id="blackImageInput"
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setBlackImage(e.target.files[0]);
                  setBlackUrl(e.target.files[0].name);
                }}
                className="hidden"
              />
              {/* Display the filename or "No file selected" */}
              <span>{blackUrl ? blackUrl : "No file selected"}</span>
            </div>

            {/* white */}
            <div className="flex items-center space-x-4">
              {/* Custom label acting as a button */}
              <label
                htmlFor="whiteImageInput"
                className="p-2 font-semibold cursor-pointer flex items-center justify-center 
               bg-indigo-100 text-sky-900 rounded hover:bg-sky-600 hover:text-white text-center 
               w-28 whitespace-normal break-words"
              >
                Upload File
              </label>
              {/* Hidden file input to remove default text */}
              <input
                id="whiteImageInput"
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setWhiteImage(e.target.files[0]);
                  setWhiteUrl(e.target.files[0].name);
                }}
                className="hidden"
              />
              {/* Display the filename or "No file selected" */}
              <span>{whiteUrl ? whiteUrl : "No file selected"}</span>
            </div>

            {/* bronze */}
            <div className="flex items-center space-x-4">
              {/* Custom label acting as a button */}
              <label
                htmlFor="bronzeImageInput"
                className="p-2 font-semibold cursor-pointer flex items-center justify-center 
               bg-indigo-100 text-sky-900 rounded hover:bg-sky-600 hover:text-white text-center 
               w-28 whitespace-normal break-words"
              >
                Upload File
              </label>
              {/* Hidden file input to remove default text */}
              <input
                id="bronzeImageInput"
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setBronzeImage(e.target.files[0]);
                  setBronzeUrl(e.target.files[0].name);
                }}
                className="hidden"
              />
              {/* Display the filename or "No file selected" */}
              <span>{bronzeUrl ? bronzeUrl : "No file selected"}</span>
            </div>

            {/* silver */}
            <div className="flex items-center space-x-4">
              {/* Custom label acting as a button */}
              <label
                htmlFor="silverImageInput"
                className="p-2 font-semibold cursor-pointer flex items-center justify-center 
               bg-indigo-100 text-sky-900 rounded hover:bg-sky-600 hover:text-white text-center 
               w-28 whitespace-normal break-words"
              >
                Upload File
              </label>
              {/* Hidden file input to remove default text */}
              <input
                id="silverImageInput"
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setSilverImage(e.target.files[0]);
                  setSilverUrl(e.target.files[0].name);
                }}
                className="hidden"
              />
              {/* Display the filename or "No file selected" */}
              <span>{silverUrl ? silverUrl : "No file selected"}</span>
            </div>

            {/* grey */}
            <div className="flex items-center space-x-4">
              {/* Custom label acting as a button */}
              <label
                htmlFor="greyImageInput"
                className="p-2 font-semibold cursor-pointer flex items-center justify-center 
               bg-indigo-100 text-sky-900 rounded hover:bg-sky-600 hover:text-white text-center 
               w-28 whitespace-normal break-words"
              >
                Upload File
              </label>
              {/* Hidden file input to remove default text */}
              <input
                id="greyImageInput"
                type="file"
                accept="image/*"
                onChange={(e: any) => {
                  setGreyImage(e.target.files[0]);
                  setGreyUrl(e.target.files[0].name);
                }}
                className="hidden"
              />
              {/* Display the filename or "No file selected" */}
              <span>{greyUrl ? greyUrl : "No file selected"}</span>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "spec sheet") {
      return (
        <div className="flex items-center space-x-4 pr-3 pb-3">
          {/* Custom label acting as a button */}
          <label
            htmlFor="specSheetInput"
            className="p-2 font-semibold cursor-pointer flex items-center justify-center 
               bg-indigo-100 text-sky-900 rounded hover:bg-sky-600 hover:text-white text-center 
               w-32 whitespace-normal break-words"
          >
            Upload File
          </label>
          {/* Hidden file input to remove default text */}
          <input
            id="specSheetInput"
            type="file"
            accept="application/pdf"
            onChange={(e: any) => {
              setSpecSheetLink(e.target.files[0]);
              setSpecSheetUrl(e.target.files[0].name);
            }}
            className="hidden"
          />
          {/* Display the filename or "No file selected" */}
          <span>{specSheetUrl ? specSheetUrl : "No file selected"}</span>
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

  const createFormData = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }
    if (blackImage) {
      formData.append("colorImages", blackImage);
    }
    if (whiteImage) {
      formData.append("colorImages", whiteImage);
    }
    if (bronzeImage) {
      formData.append("colorImages", bronzeImage);
    }
    if (silverImage) {
      formData.append("colorImages", silverImage);
    }
    if (greyImage) {
      formData.append("colorImages", greyImage);
    }
    formData.append("colors", JSON.stringify(colorsData));
    const additionalInfo = [
      { label: "About", value: about },
      { label: "Applications", value: selectedApplications },
      { label: "Spec Sheet", value: "Download Here", link: specSheetLink },
    ];
    formData.append("additionalInfo", JSON.stringify(additionalInfo));
    if (specSheetLink) {
      formData.append("specSheetLink", specSheetLink);
    }
    return formData;
  };

  const clearFormFields = () => {
    // product details
    setName("");
    setCategory("");
    // images
    setMainImage(undefined);
    setBlackImage(undefined);
    setWhiteImage(undefined);
    setBronzeImage(undefined);
    setSilverImage(undefined);
    setGreyImage(undefined);
    // additional info
    setAbout("");
    setSelectedApplications([]);
    setSpecSheetLink(null);
    // urls
    setImageUrl(null);
    setSpecSheetUrl(null);
    setBlackUrl(null);
    setWhiteUrl(null);
    setBronzeUrl(null);
    setSilverUrl(null);
    setGreyUrl(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!mainImage) {
      alert("Main image is required");
      return;
    }

    setLoading(true);
    const formData = createFormData();

    try {
      await axios.post(`${baseURL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error: any) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
      // alert
      alert("Product created successfully!");
      // clear form fields
      clearFormFields();
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const formData = createFormData();

    try {
      await axios.put(`${baseURL}/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // alert
      alert("Product updated successfully!");
      // clear form fields
      clearFormFields();
    } catch (error: any) {
      console.error("Error updating product:", error);
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
              <fieldset disabled={loading} className="w-full">
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
              </fieldset>
            </div>

            {/* RIGHT (30%) */}
            <div className="w-4/12">
              <fieldset disabled={loading} className="w-full">
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
                            setImageUrl(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Display a larger preview below, if desired */}
                  {imageUrl && (
                    <div className="mt-4">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-f h-64 object-contain rounded border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                {productId ? (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleUpdate}
                    className="w-full py-3 font-semibold rounded bg-indigo-100 text-sky-900 hover:bg-sky-600 hover:text-white"
                  >
                    {loading ? "Updating..." : "Update Product"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 font-semibold rounded bg-indigo-100 text-sky-900 hover:bg-sky-600 hover:text-white"
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </button>
                )}
              </fieldset>
            </div>
          </form>
        </section>
      </div>
    </ProtectedContent>
  );
}
