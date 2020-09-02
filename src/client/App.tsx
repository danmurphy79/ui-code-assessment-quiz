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

  // NOTE: I'm using inline styles here because that was how the original file was set up, and Amber suggested I not make it too complicated. If this was a bigger app in a real-world scenario, I would have chosen styled components, or, if I was in a hurry to bang something out, the Material-UI library.

  // Also, styles were approximated to the best of my ability. In a real-world project I would have consulted the mockups or the designer for type and color specs.

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
