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

  const [chosenAnswer, setAnswer] = useState<any>("");
  // there's something wrong with the way I'm using useEffect here
  // TODO: Fix it
  useEffect(() => {
    setCurrentQuestion(questions[questionCount + 1]);
    setAnswer("");
  }, [questionCount]);

  const allAnswers =
    currentQuestion!.type !== "text"
      ? currentQuestion!.incorrect_answers.concat(
          currentQuestion!.correct_answer
        )
      : [];

  const handleOptionChange = (e: any) => {
    setAnswer(e.target.value);
  };

  //TODO: type the event
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(`You picked ${chosenAnswer}`);
    if (chosenAnswer === currentQuestion?.correct_answer) {
      console.log(correctAnswerCount);
      setCorrectAnswerCount(correctAnswerCount + 1);
    }
    // chosenAnswer === currentQuestion?.correct_answer
    //   ? setCorrectAnswerCount(correctAnswerCount++)
    //   : setWrongAnswerCount(wrongAnswerCount++);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{currentQuestion!.question}</div>

      {currentQuestion!.type !== "text" ? (
        allAnswers.map((answer, i) => {
          return (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`answer${i}`}
                  value={answer}
                  checked={chosenAnswer === answer}
                  onChange={handleOptionChange}
                />
                {answer}
              </label>
            </div>
          );
        })
      ) : (
        <input type="text"></input>
      )}
      <button type="submit">Next</button>
    </form>
  );
};

export default Question;
