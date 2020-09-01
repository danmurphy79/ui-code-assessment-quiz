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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        fontFamily: "sans-serif",
      }}
    >
      <div>
        <h3
          style={{
            fontWeight: 100,
            fontSize: "20px",
          }}
        >
          {currentQuestion!.question}
        </h3>
      </div>

      <form>
        {currentQuestion!.type !== "text" ? (
          <div style={{ marginBottom: "28px" }}>
            {allAnswers.map((answer, i) => {
              return (
                <div
                  key={i}
                  style={{
                    fontSize: "16px",
                    fontWeight: 100,
                    marginBottom: "10px",
                  }}
                >
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
          </div>
        ) : (
          <div style={{ marginBottom: "16px" }}>
            <input
              type="text"
              style={{
                width: "100%",
                padding: "12px 20px",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "16px",
              }}
            ></input>
          </div>
        )}
      </form>
      <button
        style={{
          borderRadius: "none",
          padding: "10px 20px",
          backgroundColor: "#1e70dd",
          border: "none",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "lighter",
        }}
        onClick={handleClick}
      >
        Next
      </button>
    </div>
  );
};

export default Question;
