import { cities } from "../../../data/cities.js";

export default async (req, res) => {
  res.status(200).json(cities);
};
