import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';
import './CurrentAffairDetails.css';


function CurrentAffairDetails() {
  const { date } = useParams();
  
  const [caContent, setCaContent] = useState("");
  
   

   useEffect(() => {
  const disableRightClick = (e) => e.preventDefault();
  const disableSelect = () => false;

  document.addEventListener("contextmenu", disableRightClick);
  document.addEventListener("selectstart", disableSelect);
  document.addEventListener("copy", (e) => e.preventDefault());

  return () => {
    document.removeEventListener("contextmenu", disableRightClick);
    document.removeEventListener("selectstart", disableSelect);
    document.removeEventListener("copy", (e) => e.preventDefault());
  };
}, []);








  useEffect(() => {
    

        api.get(`/exam/current-affairs/content/${date}/`)
          .then(res => setCaContent(res.data.content))
          .catch(err => {
            console.error("Error fetching content:", err);
            setCaContent("Content not found.");
          });
     
  }, [date]);

  if (!caContent) return <p>Loading current affairs...</p>;

  return (
    <div className="ca-details-container">
      <h2>Current Affairs - {date}</h2>
      <div className="ca-content">
        <p>{caContent}</p>
      </div>
    </div>
  );
}

export default CurrentAffairDetails;
