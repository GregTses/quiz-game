import "./Options.css";

export default function Options({ setInitOptions, optionsState }) {
  const { options, setOptions } = optionsState;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  function startQuiz() {
    setInitOptions(true);
  }

  return (
    <div id="options-container">
      <h1 id="options-title">Quiz Configuration</h1>
      <form onSubmit={startQuiz}>
        <label className="options-labels" htmlFor="category">
          Category{" "}
        </label>
        <select
          className="options-select"
          value={options.category}
          name="category"
          onChange={handleChange}
        >
          <option value="9">General Knowledge</option>
          <option value="15">Video Games</option>
          <option value="20">Mythology</option>
          <option value="18">Computers</option>
        </select>

        <label className="options-labels" htmlFor="difficulty">
          Difficulty{" "}
        </label>
        <select
          className="options-select"
          value={options.difficulty}
          name="difficulty"
          onChange={handleChange}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label className="options-labels" htmlFor="numOfQuestions">
          Number Of Questions{" "}
        </label>
        <select
          className="options-select"
          value={options.numOfQuestions}
          name="numOfQuestions"
          onChange={handleChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <button className="options-btn" type="submit">
          Start Quiz
        </button>
      </form>
    </div>
  );
}
