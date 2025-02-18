export interface Company {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
  website?: string;
}

export interface CountryData {
  country: string;
  companies: Company[];
}

export const countries = [
  "Alabama",
  "Alberta",
  "Arizona",
  "Arkansas",
  "British Colombia",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico & Caribbean Islands",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Toronto, Ontario",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "Washington DC",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
