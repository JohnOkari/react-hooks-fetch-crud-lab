import React from "react";

function QuestionItem({ question, onAnswerChange, onAnwerDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleNewAnswer(event) {
    onAnswerChange(id, parseInt(event.target.value))
    
  }

  function onAnwerDeleteClick() {
    onAnwerDelete(id);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleNewAnswer}>
          {options}
        </select>
      </label>
      <button onClick={onAnwerDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
