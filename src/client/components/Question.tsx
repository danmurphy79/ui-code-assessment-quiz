import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { shuffle } from "lodash";
import { formatString, getAllAnswers } from "../../helpers";

export interface QuestionProps {
  questions: Array<any>;
  questionCount: number;
  setQuestionCount: Dispatch<SetStateAction<number>>;
  correctAnswerCount: number;
  setCorrectAnswerCount: Dispatch<SetStateAction<number>>;
  wrongAnswerCount: number;
  setWrongAnswerCount: Dispatch<SetStateAction<number>>;
}

export interface CurrentQuestionProps {
  correct_answer: string;
  incorrect_answers: [string];
  question: string;
  type: string;
}

const Question: React.FC<QuestionProps> = ({
  questions,
  questionCount,
  setQuestionCount,
  correctAnswerCount,
  setCorrectAnswerCount,
  wrongAnswerCount,
  setWrongAnswerCount,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestionProps>(
    questions[0]
  );

  const [answers, setAnswers] = useState<string[]>([]);
  const [chosenAnswer, setAnswer] = useState<string>("");
  const formattedQuestion = formatString(currentQuestion.question);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  // This shuffles the answers each time question count is changed. I have a feeling there's a better way, perhaps by handling it on the call to graphQL, but this works for now.
  useEffect(() => {
    const allAnswers = getAllAnswers(
      currentQuestion.type,
      currentQuestion.incorrect_answers,
      currentQuestion.correct_answer
    );

    const formattedAnswers = allAnswers.map((answer) => formatString(answer));
    const shuffledAnswers = shuffle(formattedAnswers);

    setAnswers(shuffledAnswers);
  }, [currentQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chosenAnswer === "") {
      alert("You need to choose an answer.");
      return;
    }
    if (
      chosenAnswer.toLowerCase() ===
      currentQuestion.correct_answer.toLowerCase()
    ) {
      setCorrectAnswerCount(correctAnswerCount + 1);
    } else {
      setWrongAnswerCount(wrongAnswerCount + 1);
    }
    setQuestionCount(questionCount + 1);
    setCurrentQuestion(questions[questionCount + 1]);
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3
        style={{
          fontWeight: 100,
          fontSize: "20px",
        }}
      >
        {formattedQuestion}
      </h3>
      {currentQuestion.type !== "text" ? (
        <div style={{ marginBottom: "28px" }}>
          {answers.map((answer, i) => {
            return (
              <div
                key={i}
                style={{
                  fontSize: "16px",
                  fontWeight: 100,
                  marginBottom: "10px",
                }}
              >
                <label>
                  <input
                    type="radio"
                    name={`answer${i}`}
                    value={answer}
                    checked={chosenAnswer === answer}
                    onChange={handleAnswerChange}
                    style={{ marginLeft: 0, marginRight: "5px" }}
                  />
                  {answer}
                </label>
              </div>
            );
          })}
        </div>
      ) : (
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
      )}
      <button
        // I don't know how to control active state here, but I need to to avoid the :active button having a borderRadius. Investigating.
        style={{
          borderRadius: 0,
          padding: "10px 20px",
          backgroundColor: "#1e70dd",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "lighter",
        }}
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

export default Question;
