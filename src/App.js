import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../src/pages/Home";

import History from "../src/components/History"; // Import the History page
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Set up the default redirection */}
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
