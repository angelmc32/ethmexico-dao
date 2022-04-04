export const inputValidation = (
  event,
  onChangeHandler,
  setInputState,
  action,
  form,
  setPasswordValidationObj = () => null
) => {
  const { name, value } = event.target;
  onChangeHandler(event);

  switch (name) {
    case "email": {
      if (validateEmail(value)) setInputState("uk-form-success");
      else setInputState("uk-form-danger");
      break;
    }
    case "password": {
      if (action === "login") return null;
      if (validatePassword(value, setPasswordValidationObj))
        setInputState("uk-form-success");
      else setInputState("uk-form-danger");
      break;
    }
    case "confirm_password": {
      if (value === form.password) setInputState("uk-form-success");
      else setInputState("uk-form-danger");
      break;
    }
    default: {
      return null;
    }
  }
};

const validateEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validatePassword = (password, setPasswordValidationObj) => {
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-ZÑñ\d@$!%*?&-_/]{8,}$/;
  const regEXlowcase = /^(?=.*[a-z])/;
  const regEXuppercase = /^(?=.*[A-Z])/;
  const regEXnumber = /^(?=.*\d)/;

  setPasswordValidationObj((prevState) => ({
    ...prevState,
    oneLow: regEXlowcase.test(password),
  }));
  setPasswordValidationObj((prevState) => ({
    ...prevState,
    oneCap: regEXuppercase.test(password),
  }));
  setPasswordValidationObj((prevState) => ({
    ...prevState,
    oneNumber: regEXnumber.test(password),
  }));
  setPasswordValidationObj((prevState) => ({
    ...prevState,
    minLength: password.trim().length > 7 ? true : false,
  }));
  return regEx.test(password);
};
