import React from "react";
import Button from "./Button";

export interface SummaryProps {
  correctAnswerCount: number;
  wrongAnswerCount: number;
  questionCount: number;
  handleRestartQuiz: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  correctAnswerCount,
  wrongAnswerCount,
  questionCount,
  handleRestartQuiz,
}) => {
  const score: number = (correctAnswerCount / questionCount) * 100;

  return (
    <div>
      <h1 style={{ fontWeight: 900, fontSize: "24px", marginBottom: "16px" }}>
        SUMMARY
      </h1>
      <div style={{ lineHeight: ".5", marginBottom: "30px" }}>
        <p>
          Correct: <span style={{ fontWeight: 900 }}>{correctAnswerCount}</span>
        </p>
        <p>
          Wrong: <span style={{ fontWeight: 900 }}>{wrongAnswerCount}</span>
        </p>
        <p>
          Questions Answered:{" "}
          <span style={{ fontWeight: 900 }}>{questionCount}</span>
        </p>
        <p>
          Final Score: <span style={{ fontWeight: 900 }}>{score}%</span>
        </p>
      </div>
      <Button onClick={handleRestartQuiz} text="Restart Quiz" />
    </div>
  );
};

export default Summary;
