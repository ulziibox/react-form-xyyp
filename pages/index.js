import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

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
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetchData(`cities`).then((apiCities) => {
      setCities(apiCities);
    });
  }, []);

  function SelectedCity(id) {
    console.log(id);
    fetchData(`cities/${id}`)
      .then((apiDistricts) => {
        setDistricts(apiDistricts);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function SelectedDistrict(districtId, wardId) {
    fetchData(`cities/${districtId}/${wardId}`)
      .then((apiWards) => {
        setWards(apiWards);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function OptionItems(props) {
    console.log("working map function");
    const data = props.items.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });
    return data;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <label>
            Хот/Аймаг:
            <select onChange={(e) => SelectedCity(e.target.value)}>
              <option disabled selected>
                Хот/Аймаг
              </option>
              <OptionItems items={cities} />
              {/* {cities.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                );
              })} */}
            </select>
          </label>

          <label>
            Сум/Дүүрэг:
            <select>
              <OptionItems items={districts} />
            </select>
          </label>

          {/* <label>
            Баг/Хороо:
            <select>
              <OptionItems items={wards} />
            </select>
          </label> */}

          {/* <label>
            Сум/Дүүрэг:
            <select value="value" onChange={() => console.log("hello")}>
              <option value="grapefruit">Grapefruit</option>;
              <option value="lime">Lime</option>;
              <option value="coconut">Coconut</option>;
              <option value="mango">Mango</option>;
            </select>
          </label> */}
        </div>
      </main>
      <footer>
        <p>Таны сонгосон утга: 'city', 'district', 'ward'</p>
      </footer>
    </div>
  );
}
