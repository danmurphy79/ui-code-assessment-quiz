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
    <>
      <div>SUMMARY</div>
      <div>Correct: {correctAnswerCount}</div>
      <div>Wrong: {wrongAnswerCount}</div>
      <div>Questions Answered: {questionCount}</div>
      <div>Final Score: {score}%</div>
      <button onClick={handleRestartQuiz}>Restart Quiz</button>
    </>
  );
};

export default Summary;
