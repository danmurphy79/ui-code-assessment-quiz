import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { shuffle } from "lodash";
import { formatString, getAllAnswers } from "../../helpers";
import Button from "./Button";
import RadioInput from "./RadioInput";
import TextInput from "./TextInput";

export interface QuestionProps {
  questions: Array<any>;
  questionCount: number;
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
  const formattedQuestion: string = formatString(currentQuestion.question);

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

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

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
              <RadioInput
                answer={answer}
                chosenAnswer={chosenAnswer}
                handleAnswerChange={handleAnswerChange}
                index={i}
              />
            );
          })}
        </div>
      ) : (
        <TextInput
          chosenAnswer={chosenAnswer}
          handleAnswerChange={handleAnswerChange}
        />
      )}
      <Button text="Next" />
    </form>
  );
};

export default Question;
