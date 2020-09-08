import React from "react";

export interface RadioInputProps {
  chosenAnswer: string;
  answer: string;
  index: number;
  handleAnswerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  chosenAnswer,
  answer,
  index,
  handleAnswerChange,
}) => {
  return (
    <div
      key={index}
      style={{
        fontSize: "16px",
        fontWeight: 100,
        marginBottom: "10px",
      }}
    >
      <label>
        <input
          type="radio"
          name={`answer${index}`}
          value={answer}
          checked={chosenAnswer === answer}
          onChange={handleAnswerChange}
          style={{ marginLeft: 0, marginRight: "5px" }}
        />
        {answer}
      </label>
    </div>
  );
};

export default RadioInput;
