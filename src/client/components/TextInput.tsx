import React from "react";

export interface TexInputProps {
  chosenAnswer: string;
  handleAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TexInput: React.SFC<TexInputProps> = ({
  chosenAnswer,
  handleAnswerChange,
}) => {
  return (
    <input
      onChange={handleAnswerChange}
      type="text"
      value={chosenAnswer}
      style={{
        width: "100%",
        padding: "12px 20px",
        margin: "8px 0",
        display: "inline-block",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
        fontSize: "16px",
        marginBottom: "28px",
      }}
    ></input>
  );
};

export default TexInput;
