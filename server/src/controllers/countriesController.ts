import { Request, Response } from "express";
import { db } from "../config/firebase";
import { CountryData } from "../models/countriesModel";
import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 7 * 24 * 60 * 60, checkperiod: 7 * 24 * 60 * 60 });


export const createCountry = async (req: Request, res: Response) => {
  const countryData: CountryData = req.body;

  try {
    await db.collection("countries").doc(countryData.country).set(countryData);
    res.status(201).send("Country added to database");
  } catch (error) {
    res.status(500).send(error);
  }
};

// make one that i give an array of countires and it create all of them, for each country it will create a document with the name of the country and the data of the country
export const createCountries = async (req: Request, res: Response) => {
  const countriesData: CountryData[] = req.body;

  try {
    countriesData.forEach(async (country) => {
      await db.collection("countries").doc(country.country).set(country);
    });
    res.status(201).send("Countries added to database");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCountries = async (req: Request, res: Response) => {
  try {
    // Check if countries exist in cache
    const cachedCountries = cache.get("countries") as CountryData[];
    if (cachedCountries) {
      console.log("Serving from cache");
      return res.json(cachedCountries);
    }

    // Fetch from Firestore
    console.log("Fetching from Firestore...");
    const snapshot = await db.collection("countries").get();
    const countries: CountryData[] = snapshot.docs.map((doc) => ({
      country: doc.id,
      ...doc.data(),
    })) as CountryData[];

    // Store in cache (1 week)
    cache.set("countries", countries);

    res.json(countries);
  } catch (error) {
    console.error("Error getting countries:", error);
    res.status(500).json({ error: "Server error" });
  }
};
