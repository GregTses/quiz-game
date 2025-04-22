import QuestionIndex from "../QuestionIndex/QuestionIndex";
import Score from "../Score/Score";
import Timer from "../Timer/Timer";

import "./ProgressBar.css";

export default function ProgressBar() {
  return (
    <div id="progress-container">
      <QuestionIndex />
      <Score />
      {/* <Timer /> */}
    </div>
  );
}
