"use client";

import React, { useEffect, useState } from "react";
import { CountryData, countries } from "@/types/country";
import CountryCard from "@/components/CountryCard";
import ScrollToTop from "@/components/ScrollToTop";
import axios from "axios";
import { baseURL } from "@/types/var";

export default function Contact() {
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`${baseURL}/countries`);
        // oreder by alphabetical order
        response.data.sort((a: CountryData, b: CountryData) =>
          a.country.localeCompare(b.country)
        );
        setCountryData(response.data);
      } catch (err: any) {
        console.error(err.message);
      }
    };

    fetchCountryData();
  }, []);

  // Scroll to target element
  const handleScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Adjust this value for spacing
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <section className="py-20 bg-bgPrimary">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl  text-title leading-snug ">
            We are actively looking for resellers in the US and around the world
            to have a better regional coverage for our products.
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-serif text-title">
              You can find us at
            </h2>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-subtitle uppercase">
                Email
              </h3>
              <p className="text-xl ">contact@solarpathusa.com</p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-subtitle uppercase">
                Phone Number
              </h3>
              <p className="text-xl ">
                Toll free: 1.888.333.SOLAR(7652) <br />
                International: +1.201.490.4499
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-subtitle uppercase">
                Location
              </h3>
              <p className="text-xl ">
                USA <br />
                123 Town Square Pl. #333 <br />
                Jersey City, NJ 07310 USA
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex  gap-4">
              <a
                href="https://www.linkedin.com/company/solarpath-sun-solutions"
                className="flex items-center justify-center text-black text-xl font-semibold bg-white border-2 border-black rounded-full px-4 py-2 w-fit"
              >
                Linkedin{" "}
                <span className="ml-2 p-2 bg-blue-900 text-white rounded-full flex items-center justify-center w-8 h-8">
                  in
                </span>
              </a>
              <a
                href="https://www.facebook.com/solarpathsunsolutions/?fref=ts"
                className="flex items-center justify-center text-black text-xl font-semibold bg-white border-2 border-black rounded-full px-4 py-2 w-fit"
              >
                Facebook{" "}
                <span className="ml-2 p-2 bg-blue-900 text-white rounded-full flex items-center justify-center w-8 h-8">
                  f
                </span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-serif text-title">
              Let's get in touch
            </h2>

            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-title"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-title"
              />
              <textarea
                placeholder="Message"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-title"
                rows={4}
              ></textarea>
              <button
                type="submit"
                className="mt-4 bg-link hover:bg-linkHover text-subtitle font-bold py-3 px-6 rounded-lg text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-bgPrimary">
        <div className="container max-w-6xl  mx-auto px-6 text-center pb-4">
          {/* title */}
          <h1 className="text-4xl font-semibold text-title leading-snug">
            Local Representatives
          </h1>
          {/* countries href */}
          <div className="max-w-6xl flex flex-wrap justify-center gap-1 text-subtitle text-sm mt-6">
            {countries.map((country, index) => (
              <a
                key={index}
                href={`#${country.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={(e) =>
                  handleScroll(e, country.replace(/\s+/g, "-").toLowerCase())
                }
                className="hover:underline flex"
              >
                {country} {index !== countries.length - 1 && <> | </>}
              </a>
            ))}
          </div>
        </div>

        {/* Country Cards */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="border-subtitle border-b" />
          {countryData && countryData.map((data, index) => (
            <CountryCard
              key={index}
              country={data.country}
              companies={data.companies}
            />
          ))}
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
