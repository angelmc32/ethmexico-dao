import React, { useState } from "react";
import styled from "styled-components";
import { inputValidation } from "../../helpers/auth-components/auth-helpers";
import SignupValidation from "./SignupValidation";

const AuthForm = ({
  submitHandler = placeholderSubmit,
  action = null,
  handleInput,
  form,
}) => {
  const [emailInputState, setEmailInputState] = useState(null);
  const [passwordInputState, setPasswordInputState] = useState(null);
  const [confPasswordInputState, setConfPasswordInputState] = useState(null);
  const [passwordValidationObj, setPasswordValidationObj] = useState({
    minLength: false,
    oneCap: false,
    oneLow: false,
    oneNumber: false,
  });

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className="uk-form-controls uk-width-4-5 uk-width-1-3@s">
        <label className="uk-text-center" htmlFor="email">
          Correo Electrónico:
        </label>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: user"></span>
          <input
            name="email"
            id="email"
            type="email"
            className={`uk-input ${emailInputState}`}
            onChange={(event) =>
              inputValidation(
                event,
                handleInput,
                setEmailInputState,
                action,
                form
              )
            }
            autoComplete="email"
            required
          />
        </div>
      </div>
      <div className="uk-form-controls uk-width-4-5 uk-width-1-3@s">
        <label className="uk-text-center" htmlFor="password">
          Contraseña:
        </label>
        <div className="uk-inline">
          <span className="uk-form-icon" uk-icon="icon: lock"></span>
          <input
            name="password"
            id="password"
            type="password"
            className={`uk-input ${passwordInputState}`}
            onChange={(event) =>
              inputValidation(
                event,
                handleInput,
                setPasswordInputState,
                action,
                form,
                setPasswordValidationObj
              )
            }
            autoComplete="password"
            required
          />
        </div>
      </div>
      {action == "signup" && (
        <div className="uk-form-controls uk-width-4-5 uk-width-1-3@s">
          <SignupValidation {...passwordValidationObj} />
        </div>
      )}
      <div className="uk-margin uk-width-4-5 uk-width-1-3@s uk-flex uk-flex-center">
        <button className="uk-button uk-button-primary uk-width-1-2">
          {action === "signup" ? "Registrar" : "Entrar"}
        </button>
      </div>
    </StyledForm>
  );
};

const placeholderSubmit = (event) => {
  event.preventDefault();
  console.log("This is a placeholder submitHandler, include handler in props");
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  div.uk-form-controls {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

export default AuthForm;
