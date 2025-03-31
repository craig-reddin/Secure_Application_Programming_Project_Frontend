import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateStudent from "./CreateStudent";
import Navigation from "./Navigation";
import AllStudents from "./ViewStudents";
import UpdateStudent from "./UpdateStudent";
import SignIn from "./SignIn";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/view_all" element={<AllStudents />} />
          <Route path="/update/:id" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
