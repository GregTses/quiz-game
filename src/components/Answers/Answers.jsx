import "./Answers.css";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "../../App";

export default function Answers() {
  const {
    questionsList,
    setScore,
    currentQuestionNum,
    setCurrentQuestionNum,
    setAnswerHistory,
    setIsLoading,
  } = useContext(AppContext);
  const [clickedAnswerIndex, setClickedAnswerIndex] = useState(null);
  const answersList = useMemo(() => {
    if (!questionsList[currentQuestionNum]) return [];
    return [
      questionsList[currentQuestionNum].correct_answer,
      ...questionsList[currentQuestionNum].incorrect_answers,
    ].sort(() => Math.random() - 0.5);
  }, [questionsList, currentQuestionNum]);

  function checkAnswer(index, answerText) {
    if (clickedAnswerIndex !== null) return; // Prevent multiple clicks
    const isCorrect =
      questionsList[currentQuestionNum].correct_answer === answerText;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setClickedAnswerIndex(index);
    setAnswerHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[currentQuestionNum] = isCorrect ? "right" : "wrong";
      return newHistory;
    });
    setTimeout(() => {
      setCurrentQuestionNum((prevValue) => prevValue + 1);
      setClickedAnswerIndex(null);
      setIsLoading(false);
    }, 2000);
    setIsLoading(true);
  }

  function getClassName(index, answerText) {
    if (clickedAnswerIndex === null) return "answer";
    const isCorrect =
      questionsList[currentQuestionNum].correct_answer === answerText;
    if (index === clickedAnswerIndex)
      return isCorrect ? "answer right" : "answer wrong";
    return isCorrect ? "answer right" : "answer";
  }

  function getBorderClassName(index, answerText) {
    const isCorrect =
      questionsList[currentQuestionNum].correct_answer === answerText;
    if (
      clickedAnswerIndex !== null &&
      index === clickedAnswerIndex &&
      isCorrect
    ) {
      return "answer-border shadow";
    }
    return "answer-border";
  }

  return (
    <div id="answers-container">
      <ul id="answers-list">
        {answersList.map((answerText, index) => {
          return (
            <div className={getBorderClassName(index, answerText)} key={index}>
              <li
                onClick={() => checkAnswer(index, answerText)}
                className={getClassName(index, answerText)}
                key={index}
              >
                {answerText}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

// add sound
