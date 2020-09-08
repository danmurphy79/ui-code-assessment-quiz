import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      style={{
        borderRadius: 0,
        padding: "10px 20px",
        backgroundColor: "#1e70dd",
        border: "none",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "lighter",
      }}
      onClick={onClick}
      type="submit"
    >
      {text}
    </button>
  );
};

export default Button;
