import { useState } from "react";

const useForm = () => {
  const [state, setState] = useState({});

  const handleChange = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  return [state, handleChange];
};

export default useForm;
