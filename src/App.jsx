import { useState, useEffect, createContext } from "react";
import "./App.css";
import Question from "./components/Question/Question";
import Answers from "./components/Answers/Answers";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import Options from "./components/Options/Options";
import { Popup } from "./components/Popup/Popup";

export const QuestionsContext = createContext();
export const QuestionNumberContext = createContext();
export const ScoreContext = createContext();
export const AppContext = createContext();

function App() {
  const [initOptions, setInitOptions] = useState(false);
  const [options, setOptions] = useState({
    numOfQuestions: "5",
    category: "9",
    difficulty: "medium",
  });
  const [questionsList, setQuestionsList] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function decodeText(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }

  useEffect(() => {
    if (!initOptions) return;

    const { numOfQuestions, category, difficulty } = options;
    const URL = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        for (let result of data.results) {
          result.question = decodeText(result.question);
          result.correct_answer = decodeText(result.correct_answer);
          result.incorrect_answers = result.incorrect_answers.map(decodeText);
        }
        setQuestionsList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [initOptions, options]);

  useEffect(() => {
    if (
      currentQuestionNum >= questionsList.length &&
      questionsList.length > 0
    ) {
      setShowPopup(true);
    }
  }, [currentQuestionNum, questionsList]);

  const optionsState = { options, setOptions };
  const appState = {
    questionsList,
    score,
    setScore,
    currentQuestionNum,
    setCurrentQuestionNum,
    showPopup,
    setShowPopup,
    setInitOptions,
    answerHistory,
    setAnswerHistory,
    isLoading,
    setIsLoading,
  };

  return (
    <div>
      {!initOptions ? (
        <Options setInitOptions={setInitOptions} optionsState={optionsState} />
      ) : (
        <AppContext.Provider value={appState}>
          {showPopup ? (
            <Popup setInitOptions={setInitOptions} />
          ) : (
            <>
              <Question />
              <Answers />
              <ProgressBar />
            </>
          )}
        </AppContext.Provider>
      )}
    </div>
  );
}

export default App;

// adjust answers fonts
// popup
// style options
// reset question index color
