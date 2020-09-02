import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { shuffle } from "lodash";

export interface QuestionProps {
  questions: Array<any>;
  questionCount: number;
  setQuestionCount: Dispatch<SetStateAction<number>>;
  correctAnswerCount: number;
  setCorrectAnswerCount: Dispatch<SetStateAction<number>>;
  wrongAnswerCount: number;
  setWrongAnswerCount: Dispatch<SetStateAction<number>>;
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
  const [currentQuestion, setCurrentQuestion] = useState<null | {
    correct_answer: string;
    incorrect_answers: [string];
    question: string;
    type: string;
  }>(questions[0]);

  const [answers, setAnswers] = useState<string[]>([]);
  const [chosenAnswer, setAnswer] = useState<string>("");

  // TODO; Move this to helpers.ts when #4 is merged.
  const getAllAnswers = (type: string, wrong: string[], right: string) => {
    if (type !== "text") {
      return wrong.concat(right);
    }
    return [];
  };

  // This shuffles the answers each time question count is changed. I have a feeling there's a better way, but this works for now.
  useEffect(() => {
    const allAnswers = getAllAnswers(
      currentQuestion!.type,
      currentQuestion!.incorrect_answers,
      currentQuestion!.correct_answer
    );

    const shuffledAnswers = shuffle([...allAnswers]);
    setAnswers(shuffledAnswers);
  }, [questionCount]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      chosenAnswer.toLowerCase() ===
      currentQuestion?.correct_answer.toLowerCase()
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
      <div>{currentQuestion!.question}</div>
      {currentQuestion!.type !== "text" ? (
        answers.map((answer, i) => {
          return (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`answer${i}`}
                  value={answer}
                  checked={chosenAnswer === answer}
                  onChange={handleAnswerChange}
                />
                {answer}
              </label>
            </div>
          );
        })
      ) : (
        <input onChange={handleAnswerChange} type="text"></input>
      )}
      <button type="submit">Next</button>
    </form>
  );
};

export default Question;
