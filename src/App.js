import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import StartTest from "./components/StartTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/start-test" element={<StartTest />} /> */}
        <Route path="/start-test/:chapterId" element={<StartTest />} />


      </Routes>
    </Router>
    
  );
}

export default App;
