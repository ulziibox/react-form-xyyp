import { useEffect, useState, useReduce } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Select from "react-select";
import address from "../data/address";

export default function Home() {
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const register = (e) => {
    e.preventDefault();
    console.log(city.name, district.name, ward.name);
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
              <p>Хот/Аймаг:</p>
              <Select
                value={city}
                defaultValue="default"
                onChange={setCity}
                options={address}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Сонгох"
              />
            </label>

            <label>
              <p>Сум/Дүүрэг:</p>
              <Select
                value={district}
                defaultValue="default"
                onChange={setDistrict}
                options={city?.districts}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Сонгох"
              />
            </label>

            <label>
              <p>Баг/Хороо:</p>
              <Select
                value={ward}
                defaultValue="default"
                onChange={setWard}
                options={district?.wards}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Сонгох"
              />
            </label>
            <button className={styles.registerBtn}>Бүртгүүлэх</button>
          </form>
        </div>
      </main>
    </div>
  );
}
