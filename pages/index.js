import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import useForm from "../utils/useForm";

const fetchData = (url) => {
  return axios
    .get(`http://localhost:3000/api/${url}`)
    .then((res) => {
      const results = res.data;
      return results;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function Home() {
  const [values, handleChange] = useForm();
  const [data, setData] = useState({
    cities: [],
    districts: [],
    wards: [],
  });
  const [changed, setChanged] = useState(false);
  // const [cities, setCities] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [wards, setWards] = useState([]);
  // const [selectedCity, setSelectedCity] = useState();
  // const [selectedDistrict, setSelectedDistrict] = useState();
  // const [selectedWard, setSelectedWard] = useState();

  useEffect(() => {
    fetchData(`cities`)
      .then((res) => {
        setData({ ...data, cities: res });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const register = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleSelect = (id, type) => {
    if (type == "city") {
      //get
      // setChanged(true);
      fetchData(`cities/${id}`)
        .then((res) => {
          setData({ ...data, districts: res });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (type == "district") {
      //get wards
      fetchData(`cities/${values.city}/${id}`)
        .then((res) => {
          setData({ ...data, wards: res });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const OptionItems = (props) => {
    console.log(`===== I'm working ======`);
    const item = props.items.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    return item;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <div>
          <form className={styles.grid} onSubmit={register}>
            <label>
              Хот/Аймаг:
              <select
                value={values.name}
                name="city"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                  handleSelect(e.target.value, "city");
                }}
              >
                <option disabled="disabled" selected={true}>
                  Хот/Аймаг
                </option>

                {/* <OptionItems items={data.cities} /> */}

                {data.cities.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>

            <label>
              Сум/Дүүрэг:
              <select
                value={values.district}
                name="district"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                  handleSelect(e.target.value, "district");
                }}
                // onClick={setChangedCity(false)}
              >
                <option disabled="disabled" selected={true}>
                  Сум/Дүүрэг
                </option>
                {data.districts.length > 0 ? (
                  <OptionItems items={data.districts} />
                ) : null}
              </select>
            </label>

            <label>
              Баг/Хороо:
              <select
                value={values.ward}
                name="ward"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
              >
                <option disabled="disabled" selected={true}>
                  Баг/Хороо
                </option>
                {data.wards.length > 0 ? (
                  <OptionItems items={data.wards} />
                ) : null}
              </select>
            </label>
            <button>Бүртгүүлэх</button>
          </form>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
