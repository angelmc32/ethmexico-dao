import React from "react";

const SignupValidation = ({
  minLength = false,
  oneCap = false,
  oneLow = false,
  oneNumber = false,
}) => {
  return (
    <div className="uk-margin-small uk-flex uk-flex-center uk-width-1-1">
      <div className="uk-flex uk-flex-column uk-width-1-1">
        <div className="uk-width-1-1 uk-flex">
          <div
            className={`uk-width-1-2 uk-flex uk-flex-middle ${
              oneCap ? "uk-text-success" : ""
            }`}
          >
            <span
              uk-icon={oneCap ? "check" : "warning"}
              className="uk-width-1-6"
            ></span>{" "}
            Una letra mayúscula
          </div>
          <div
            className={`uk-width-1-2 uk-flex uk-flex-middle ${
              oneNumber ? "uk-text-success" : ""
            }`}
          >
            <span
              uk-icon={oneNumber ? "check" : "warning"}
              className="uk-width-1-6"
            ></span>{" "}
            Un número
          </div>
        </div>
        <div className="uk-width-1-1 uk-flex">
          <div
            className={`uk-width-1-2 uk-flex uk-flex-middle ${
              oneLow ? "uk-text-success" : ""
            }`}
          >
            <span
              uk-icon={oneLow ? "check" : "warning"}
              className="uk-width-1-6"
            ></span>{" "}
            Una letra minúscula
          </div>
          <div
            className={`uk-width-1-2 uk-flex uk-flex-middle ${
              minLength ? "uk-text-success" : ""
            }`}
          >
            <span
              uk-icon={minLength ? "check" : "warning"}
              className="uk-width-1-6"
            ></span>{" "}
            Mínimo 8 caracteres
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupValidation;
