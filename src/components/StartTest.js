import React, { useEffect, useState } from "react";
import "./StartTest.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function StartTest() {
  const { chapterId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Load questions for chapter
  useEffect(() => {
    api.get(`/exam/questions/${chapterId}/`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error("Error fetching questions:", err));
  }, [chapterId]);

  const handleOptionSelect = (qid, option) => {
    if (submitted) return;
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const attemptedCount = Object.keys(answers).length;
  const score = questions.filter(q => answers[q.id] === q.answer).length;

  return (
    <div className="start-test-container">
      <div className="test-header">
        Attempted: {attemptedCount} / {questions.length}
      </div>

      <div className="questions-list">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`question-card ${
              submitted && answers[q.id] === q.answer ? "correct" : ""
            } ${
              submitted && answers[q.id] && answers[q.id] !== q.answer ? "wrong" : ""
            }`}
          >
            <h3>{q.question_text}</h3>
            <div className="options">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  className={`option-btn ${answers[q.id] === opt ? "selected" : ""}`}
                  onClick={() => handleOptionSelect(q.id, opt)}
                  disabled={submitted}
                >
                  {opt}
                </button>
              ))}
            </div>
            {submitted && (
              <div className="correct-answer">
                સાચો જવાબ: <strong>{q.answer}</strong>
              </div>
            )}
          </div>
        ))}
      </div>

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Test
        </button>
      )}

      {submitted && (
        <>
          <div className="score-display">Your Score: {score} / {questions.length}</div>
          <button
            className="back-dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </>
      )}
    </div>
  );
}

export default StartTest;
