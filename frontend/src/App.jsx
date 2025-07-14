import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CodeReview from "./pages/CodeReview";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-review" element={<CodeReview />} />
      </Routes>
    </Router>
  );
};

export default App;
