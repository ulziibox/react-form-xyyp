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
    res.status(200).json([
      { id: 1, name: "01" },
      { id: 2, name: "02" },
      { id: 3, name: "03" },
    ]);
  }
};
