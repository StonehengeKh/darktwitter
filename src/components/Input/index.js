import React from "react";

export const Input = ({ label, type = "text", touch, valid, ...rest }) => {
  return (
    <div>
      <label htmlFor="" className="input__label">
        <span className="input__label--span">{label}</span>
        <input
          className={touch && valid ? "input input-error" : "input input-valid"}
          type={type}
          {...rest}
        />
      </label>
    </div>
  );
};
