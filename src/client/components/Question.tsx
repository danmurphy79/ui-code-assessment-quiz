import React, { useState, Dispatch, SetStateAction } from "react";

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

  const [chosenAnswer, setAnswer] = useState<string>("");

  // TODO; Move this to helpers.ts when #4 is merged. Figure out a way to shuffle these answers so that it's not always the last answer that is correct.
  const getAllAnswers = (type: string, wrong: string[], right: string) => {
    if (type !== "text") {
      return wrong.concat(right);
      // .map((a) => ({ sort: Math.random(), value: a }))
      // .sort((a, b) => a.sort - b.sort)
      // .map((a) => a.value);
    }
    return [];
  };

  const allAnswers = getAllAnswers(
    currentQuestion!.type,
    currentQuestion!.incorrect_answers,
    currentQuestion!.correct_answer
  );

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  //TODO: type the event
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
        allAnswers.map((answer, i) => {
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
