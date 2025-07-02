import React, { useState, useEffect } from "react";
import api from "../api";
import "./MCQPractice.css";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CurrentAffairs from "../components/CurrentAffairs"; // adjust path if needed



function MCQPractice() {
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
   const [searchQuery, setSearchQuery] = useState(""); 
   const [totalTests, setTotalTests] = useState(0);
const [attemptedTests, setAttemptedTests] = useState(0);

  const navigate = useNavigate();

  // Load subjects on mount
  useEffect(() => {
    api.get("/exam/subjects/")
      .then(res => setSubjects(res.data))
      .catch(err => console.error("Error fetching subjects:", err));

    api.get("/exam/progress/")
    .then(res => {
      setTotalTests(res.data.total_tests);
      setAttemptedTests(res.data.attempted_tests);
    })
    .catch(err => console.error("Progress API error:", err));


  }, []);

    
     
const percentage = totalTests > 0 ? Math.round((attemptedTests / totalTests) * 100) : 0;



  // Load chapters when subject is selected
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setSearchQuery(""); 

    api.get(`/exam/chapters/${subject.id}/`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  })
      .then(res => setChapters(res.data))
      .catch(err => console.error("Error fetching chapters:", err));
  };

  const filteredChapters = chapters.filter((chapter) =>
    chapter.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

const getSubjects = () => {
  api.get("/exam/subjects/")
    .then(res => setSubjects(res.data))
    .catch(err => console.error("Error fetching subjects:", err));
};


  return (
    <div className="mcq-container">
  {!selectedSubject ? (
    <>
      {/* ✅ Progress Card */}
      <div className="progress-card">
        <div>
          <p className="progress-title">Total Progress</p>
          <p className="progress-count">{attemptedTests} / {totalTests}</p>
        </div>
        <div className="progress-circle">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#00bcd4",
              trailColor: "#333",
            })}
          />
        </div>
      </div>

      {/* ✅ Subjects list */}
      <h2>Select a Subject</h2>
      <ul>

      <CurrentAffairs onDateClick={(date) => {
  console.log("Clicked CA date:", date);
  // Navigate or fetch test later
}} />



  {subjects.map((subject) => {
    const percent = subject.total_tests > 0
      ? Math.round((subject.attempted_tests / subject.total_tests) * 100)
      : 0;

    return (
      <li
        key={subject.id}
        onClick={() => handleSubjectClick(subject)}
        style={{ position: "relative", paddingBottom: "20px" }}
      >
        {subject.name}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "5px",
            width: `${percent}%`,
            backgroundColor: "green",
            transition: "width 0.3s ease",
          }}
        />
      </li>
    );
  })}
</ul>

    </>
  ) : (
    <>
      {/* ✅ Chapters & Search Bar */}
      <div className="headingBar-container">
        <h2>{selectedSubject.name} - Chapter Tests</h2>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="chapter-search-input"
          />
        </div>
      </div>

      <ul>
  {filteredChapters.map((chapter) => (
    <li key={chapter.id}>
            {chapter.name}{" "}

      {chapter.score != null && `(Marks: ${chapter.score})`}{" "}
      
      <button
        onClick={() => navigate(`/start-test/${chapter.id}`)}
        className="start-test-btn"
      >
        {chapter.is_completed ? "Reattempt" : "Start Test"}
      </button>
    </li>
  ))}
</ul>

      <button
        className="back-btn"
        onClick={() => {
          setSelectedSubject(null);
          setChapters([]);
          getSubjects(); 
      
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
