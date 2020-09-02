import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Question from "./components/Question";
import Summary from "./components/Summary";

const QUESTIONS = gql`
  query GetQuestions {
    questions {
      question
      type
      correct_answer
      incorrect_answers
    }
  }
`;

export const App: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(QUESTIONS);
  // NOTE: I'm handling everything here with useState because it was a quick way to handle it. I considered using a context/reducer combo, but thought it might be overkill for such a small app.
  const [questionCount, setQuestionCount] = useState<number>(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(0);

  const handleRestartQuiz = () => {
    refetch();
    setQuestionCount(0);
    setCorrectAnswerCount(0);
    setWrongAnswerCount(0);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontFamily: "sans-serif",
        margin: "0 30%",
      }}
    >
      {questionCount < 5 ? (
        <Question
          questions={data.questions}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          correctAnswerCount={correctAnswerCount}
          setCorrectAnswerCount={setCorrectAnswerCount}
          wrongAnswerCount={wrongAnswerCount}
          setWrongAnswerCount={setWrongAnswerCount}
        />
      ) : (
        <Summary
          questionCount={questionCount}
          correctAnswerCount={correctAnswerCount}
          wrongAnswerCount={wrongAnswerCount}
          handleRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
};
