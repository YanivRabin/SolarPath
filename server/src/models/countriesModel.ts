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
