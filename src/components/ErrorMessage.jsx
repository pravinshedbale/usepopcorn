import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>{message}</span>
    </p>
  );
};

export default ErrorMessage;
