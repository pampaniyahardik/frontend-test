import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import StartTest from "./components/StartTest";
import { UserProvider } from "./context/UserContext";
import CurrentAffairDetails from './components/CurrentAffairDetails';
// import Counter from "./pages/Counter";

function App() {
  return (
    
        <UserProvider>

    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/start-test" element={<StartTest />} /> */}
        <Route path="/start-test/:chapterId" element={<StartTest />} />
         <Route path="/current-affairs/:date" element={<CurrentAffairDetails />} /> 
            
      </Routes>
    </Router>
        </UserProvider>

    
  );
}

export default App;
