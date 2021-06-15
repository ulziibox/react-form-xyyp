import { wards } from "../../../data/wards.js";

export default async (req, res) => {
  const { ward } = req.query;
  const [cityId, districtId, ...other] = ward;

  const result = wards.filter(
    (city) =>
      city.city_id === parseInt(cityId) &&
      city.district_id === parseInt(districtId)
  );
  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: `Ward is not found` });
  }
};
