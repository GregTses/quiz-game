import "./Score.css";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function Score() {
  const { score, questionsList } = useContext(AppContext);
  return (
    <div id="score">
      ★ {score} / {questionsList.length}
    </div>
  );
}
