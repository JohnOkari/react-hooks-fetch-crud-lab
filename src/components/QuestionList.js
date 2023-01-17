import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((items) => {
        setItems(items);
      });
  }, []);

 
  function handleNewAnswer(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        const updatedQuestions = items.map((item) => {
          if (item.id === updatedQuestion.id) return updatedQuestion;
          return item;
        });
        setItems(updatedQuestions);
      });
  }


  function handleAnswerDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedQuestions = items.filter((item) => item.id !== id);
        setItems(updatedQuestions);
      });
  }

  const itemlist = items.map((item)=>{
   return <QuestionItem 
    key={item.id}
    question={item}
    onAnswerChange={handleNewAnswer}
    onAnwerDelete={handleAnswerDelete}
    />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{itemlist}</ul>
    </section>
  );
}

export default QuestionList;
