import React, { useState, useEffect } from "react";
import "./CurrentAffairs.css";
import api from "../api"; // make sure this path is correct
import { useNavigate } from "react-router-dom";


function CurrentAffairs() {
  const [showDates, setShowDates] = useState(false);
  const [caDates, setCaDates] = useState([]);
  
  
  useEffect(() => {
    // Fetch available CA dates
    api.get("/exam/current-affairs/dates/")
      .then(res => setCaDates(res.data))
      .catch(err => console.error("Error fetching dates:", err));
  }, []);

  
   
   const navigate = useNavigate();

const handleDateClick = (date) => {
  navigate(`/current-affairs/${date}`);
};
 
  


 return (
  <div className="ca-dropdown-container">
    <div className="ca-box" onClick={() => setShowDates(!showDates)}>
      📅 Current Affairs
    </div>

    {showDates && (
      <ul>
        {caDates.map((date) => {
          const formattedDate = new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <li key={date} onClick={() => handleDateClick(date)}>
              {formattedDate}
            </li>
          );
        })}
      </ul>
    )}
  </div>
);
}

export default CurrentAffairs;
