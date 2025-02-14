import React from "react";
import { CountryData } from "@/types/country";

const CountryCard: React.FC<CountryData> = ({ country, companies }) => {
  return (
    <div
      id={country.replace(/\s+/g, "-").toLowerCase()}
      className="border-b border-subtitle py-10 "
    >
      <h2 className="text-2xl font-semibold text-title ">{country}</h2>

      {/* Grid Layout for Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <div key={index} className="mt-4">
            <h3 className="font-bold text-subtitle">{company.name}</h3>
            <p className="text-gray-800">
              {company.address}
              <br />
              {company.city}, {company.state} {company.zip}
            </p>
            {company.phone && <p className="font-medium">{company.phone}</p>}
            {company.website && (
              <a
                href={company.website}
                className="font-bold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {company.website}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryCard;
