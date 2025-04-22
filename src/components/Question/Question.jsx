import { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import "./Question.css";

export default function Question() {
  const { questionsList, currentQuestionNum, isLoading } =
    useContext(AppContext);
  const question = questionsList[currentQuestionNum]
    ? questionsList[currentQuestionNum].question
    : "";

  return (
    <div className="question-container">
      <div className="question-border">
        <div className={`question ${isLoading ? "animate" : ""}`}>
          {question}
        </div>
      </div>
    </div>
  );
}
