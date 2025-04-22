import "./QuestionIndex.css";
import { AppContext } from "../../App";
import { useContext } from "react";

export default function QuestionIndex() {
  const { questionsList, currentQuestionNum, answerHistory } =
    useContext(AppContext);

  return (
    <div id="questions-index-container">
      {questionsList.map((_, index) => {
        let statusClass = "";
        if (answerHistory[index] === "right") {
          statusClass = "right-answer";
        } else if (answerHistory[index] === "wrong") {
          statusClass = "wrong-answer";
        }

        return (
          <div
            className={`index-container ${statusClass} ${
              currentQuestionNum === index ? "highlighted" : ""
            }`}
            key={index}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}
