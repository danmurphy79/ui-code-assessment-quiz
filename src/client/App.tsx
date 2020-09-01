import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Question from "./components/Question";

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
  const { loading, error, data } = useQuery(QUESTIONS);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState<number>(1);
  const [wrongAnswerCount, setWrongAnswerCount] = useState<number>(1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Question
        questions={data.questions}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        correctAnswerCount={correctAnswerCount}
        setCorrectAnswerCount={setCorrectAnswerCount}
        wrongAnswerCount={wrongAnswerCount}
        setWrongAnswerCount={setWrongAnswerCount}
      />
    </div>
  );
};
