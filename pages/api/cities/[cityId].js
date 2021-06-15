import { districts } from "../../../data/districts.js";

export default async (req, res) => {
  const { cityId } = req.query;
  const result = districts.filter((city) => city.city_id === parseInt(cityId));

  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: `City with id ${cityId} not found` });
  }
};
