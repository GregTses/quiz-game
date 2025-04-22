import "./Popup.css";
import { useContext } from "react";
import { AppContext } from "../../App";

export function Popup() {
  const {
    questionsList,
    score,
    setInitOptions,
    setScore,
    setCurrentQuestionNum,
    setShowPopup,
  } = useContext(AppContext);

  function replayQuiz() {
    setInitOptions(false);
    setScore(0);
    setCurrentQuestionNum(0);
    setShowPopup(false);
  }
  return (
    <div className="popup">
      <h2>Quiz Over!</h2>
      <p>
        Your Score: {score} / {questionsList.length}
      </p>
      <button onClick={replayQuiz}>Play Again</button>
    </div>
  );
}
