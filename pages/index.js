import { useState, useReducer } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Select from "react-select";
import address from "../data/address";
import { Button } from "@material-ui/core";

const SET_CITY = "city";
const SET_DISTRICT = "district";
const SET_WARD = "ward";
//initial
const reducer = (state, action) => {
  switch (action.type) {
    case SET_CITY:
      return {
        city: action.index,
        district: null,
        ward: null,
      };
    case SET_DISTRICT:
      return {
        ...state,
        district: action.index,
        ward: null,
      };
    case SET_WARD:
      return {
        ...state,
        ward: action.index,
      };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, {
    city: null,
    district: null,
    ward: null,
  });

  const handleChange = (index, type) => {
    dispatch({ type: type, index });
  };

  const register = (e) => {
    e.preventDefault();
    console.log(state);
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
                value={address.map((i, index) => ({ ...i, index }))[state.city]}
                onChange={(e) => handleChange(e.index, SET_CITY)}
                options={address.map((i, index) => ({ ...i, index }))}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.index}
                placeholder="Сонгох"
              />
            </label>

            <label>
              <p>Сум/Дүүрэг:</p>
              <Select
                value={
                  state.district != null
                    ? address[state.city].districts.map((i, index) => ({
                        ...i,
                        index,
                      }))[state.district]
                    : []
                }
                onChange={(e) => handleChange(e.index, SET_DISTRICT)}
                options={
                  state.city != null
                    ? address[state.city].districts.map((i, index) => ({
                        ...i,
                        index,
                      }))
                    : []
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.index}
                placeholder="Сонгох"
              />
            </label>

            <label>
              <p>Баг/Хороо:</p>
              <Select
                value={
                  state.ward != null
                    ? address[state.city].districts[state.district].wards.map(
                        (i, index) => ({ ...i, index })
                      )[state.ward]
                    : []
                }
                onChange={(e) => handleChange(e.index, SET_WARD)}
                options={
                  state.district != null
                    ? address[state.city].districts[state.district].wards.map(
                        (i, index) => ({ ...i, index })
                      )
                    : []
                }
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.index}
                placeholder="Сонгох"
              />
            </label>
            <Button variant="contained" color="primary">
              Бүртгүүлэх
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
