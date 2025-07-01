import React, { useState,useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MCQPractice from "./MCQPractice";
import "./Dashboard.css";
import { UserContext } from "../context/UserContext";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("mcq");
  const userName = "Student"; // TODO: pass real name later
  const { user } = useContext(UserContext);


  

  return (
    <div className="dashboard-container">
      <Navbar userName={user} onSelect={setActiveTab} />
      <div>
        {activeTab === "mcq" && <MCQPractice />}
        {activeTab === "pyq" && <h2 style={{ padding: "2rem", color: "#fff" }}>PYQ Coming Soon...</h2>}
        {activeTab === "material" && <h2 style={{ padding: "2rem", color: "#fff" }}>Material Coming Soon...</h2>}
         {activeTab === "mindmap" && <h2 style={{ padding: "2rem", color: "#fff" }}>Mind map Coming Soon...</h2>}
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
