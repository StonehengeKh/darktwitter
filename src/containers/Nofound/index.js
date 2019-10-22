import React from "react";
import "./style.css";
import imgError from "../../assets/img/police.png";

function NotFound() {
  return (
    <div className="error-page">
      <img src={imgError} alt="Error" className="error-img" />
      <p>404</p>
      <p>Houston we have a problem!</p>
      <p>Page not found</p>
    </div>
  );
}

export { NotFound };
