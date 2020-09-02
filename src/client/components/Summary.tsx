import React from "react";

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
  const score = (correctAnswerCount / questionCount) * 100;

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
        onClick={handleRestartQuiz}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Summary;
