import { cities } from "../../../data/cities.js";

export default async (req, res) => {
  let result = cities;
  // result.unshift({ id: 0, name: "Аймаг/Хот" });
  res.status(200).json(result);
};
