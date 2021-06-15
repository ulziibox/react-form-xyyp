import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = () => {
  return axios
    .get("http://localhost:3000/api/cities")
    .then((res) => {
      const results = res.data;
      // console.log(results);
      return results;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function Home() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData().then((apiCities) => {
      setCities(apiCities);
    });
  }, []);

  function OptionItems(props) {
    const negHuvisagch = props.items;
    negHuvisagch.map((item) => {
      <option key={item.id}>{item.name}</option>;
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <label>
            Аймаг/Хот:
            <select>
              <OptionItems items={cities} />
            </select>
          </label>

          {/* <label>
            Сум/Дүүрэг:
            <select value="value" onChange={() => console.log("hello")}>
              <option value="grapefruit">Grapefruit</option>;
              <option value="lime">Lime</option>;
              <option value="coconut">Coconut</option>;
              <option value="mango">Mango</option>;
            </select>
          </label> */}
          {/* <label>
            Баг/Хороо:
            <select value="value" onChange={() => console.log("hello")}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
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
