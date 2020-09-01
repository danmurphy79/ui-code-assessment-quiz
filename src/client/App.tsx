import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { formatString } from "../helpers";

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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Lucid</h1>
      <h2>Welcome to UI Team code assessment!</h2>
      <p>{formatString(data.questions[0].question)}</p>
    </div>
  );
};
