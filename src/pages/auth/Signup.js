import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import AuthForm from "../../components/auth/AuthForm";
import UserPool from "../../helpers/aws/UserPool";

const Signup = () => {
  const { handleInput, form } = useForm();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) console.error(err);
      console.log(data);
    });
  };
  return (
    <Fragment>
      <h2>Registro</h2>
      <p className="uk-margin-small">
        ¿Ya tienes cuenta?
        <Link to="/auth/login" className="links uk-margin-small-left">
          Ingresa aquí
        </Link>
      </p>
      <AuthForm
        action="signup"
        submitHandler={handleSubmit}
        handleInput={handleInput}
        form={form}
      />
    </Fragment>
  );
};

export default Signup;
