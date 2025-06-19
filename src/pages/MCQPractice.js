import React, { useState, useEffect } from "react";
import api from "../api";
import "./MCQPractice.css";
import { useNavigate } from "react-router-dom";

function MCQPractice() {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const navigate = useNavigate();

  // Load subjects on mount
  useEffect(() => {
    api.get("/exam/subjects/")
      .then(res => setSubjects(res.data))
      .catch(err => console.error("Error fetching subjects:", err));
  }, []);

  // Load chapters when subject is selected
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    api.get(`/exam/chapters/${subject.id}/`)
      .then(res => setChapters(res.data))
      .catch(err => console.error("Error fetching chapters:", err));
  };

  return (
    <div className="mcq-container">
      {!selectedSubject ? (
        <>
          <h2>Select a Subject</h2>
          <ul>
            {subjects.map((subject) => (
              <li key={subject.id} onClick={() => handleSubjectClick(subject)}>
                {subject.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2>{selectedSubject.name} - Chapter Tests</h2>
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                {chapter.name}{" "}
                <button
                  onClick={() => navigate(`/start-test/${chapter.id}`)}
                  className="start-test-btn"
                >
                  Start Test
                </button>
              </li>
            ))}
          </ul>
          <button
            className="back-btn"
            onClick={() => {
              setSelectedSubject(null);
              setChapters([]);
            }}
          >
            Back to Subjects
          </button>
        </>
      )}
    </div>
  );
}

export default MCQPractice;
