import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import useForm from "../../hooks/useForm";
import AuthForm from "../../components/auth/AuthForm";

const Login = () => {
  const { userLogin } = useAppContext();
  const { handleInput, form, resetForm } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;

    userLogin(email, password)
      .then((res) => {
        //resetForm();
        console.log("Logged in!", res);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Failed to login", error);
      });
  };

  return (
    <Fragment>
      <h2>Iniciar Sesión</h2>
      <p className="uk-margin-small">
        ¿No tienes cuenta?
        <Link to="/auth/registro" className="links uk-margin-small-left">
          Regístrate aquí
        </Link>
      </p>
      <AuthForm
        action="login"
        submitHandler={handleSubmit}
        handleInput={handleInput}
        form={form}
      />
    </Fragment>
  );
};

export default Login;
