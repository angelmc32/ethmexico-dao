import { useState } from "react";

const useForm = () => {
  const [form, setForm] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileInput = (event) => {
    const { name, files } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: files }));
  };

  const resetForm = () => setForm({});

  // Return the form state variable and input handling functions
  return { form, setForm, resetForm, handleInput, handleFileInput };
};

export default useForm;
