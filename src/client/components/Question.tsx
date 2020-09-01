import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

// TODO: Uncomment when this is being passed down
export interface QuestionProps {
  questions: Array<any>;
  questionCount: number;
  setQuestionCount: Dispatch<SetStateAction<number>>;
  correctAnswerCount: number;
  setCorrectAnswerCount: Dispatch<SetStateAction<number>>;
  wrongAnswerCount: number;
  setWrongAnswerCount: Dispatch<SetStateAction<number>>;
}

interface AnswerCountProps {
  questions: number;
  wrongAnswers: number;
  correctAnswers: number;
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
  //TODO: handle the randomness in the GraphQL query
  const [currentQuestion, setCurrentQuestion] = useState<null | {
    correct_answer: string;
    incorrect_answers: [string];
    question: string;
    type: string;
  }>(questions[0]);

  const [chosenAnswer, setAnswer] = useState<any>();
  useEffect(() => {
    setCurrentQuestion(questions[1]);
    setAnswer("");
  }, [questionCount]);

  const allAnswers =
    currentQuestion!.type !== "text"
      ? currentQuestion!.incorrect_answers.concat(
          currentQuestion!.correct_answer
        )
      : [];

  const handleClick = () => {
    console.log("click");
    console.log(questionCount);
    // if (chosenAnswer === currentQuestion!.correct_answer) {
    //   setCorrectAnswerCount(correctAnswerCount++);
    // } else {
    //   setWrongAnswerCount(wrongAnswerCount++);
    // }
    setQuestionCount(questionCount++);
    console.log(questionCount);
  };

  return (
    <>
      <div>{currentQuestion!.question}</div>

      {currentQuestion!.type !== "text" ? (
        <form>
          {allAnswers.map((answer, i) => {
            return (
              <div key={i}>
                <input
                  onChange={(e) => setAnswer(e.target.value)}
                  type="radio"
                  name="answer"
                  id={answer}
                  value={chosenAnswer}
                ></input>
                <label htmlFor={answer}> {answer}</label>
              </div>
            );
          })}
        </form>
      ) : (
        <input type="text"></input>
      )}
      <button onClick={handleClick}>Next</button>
    </>
  );
};

export default Question;
