import logo from "./logo.svg";
import "./App.css";
import CsvUploader from "./Components/CsvUpload";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CompletionLetter from "./Components/CompletionLetter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <p>
                  <Link to="/offer-letter">Generate Offer Letter</Link>
                </p>
                <p>
                  <Link to="/completion-letter">
                    Generate Completion Letter
                  </Link>
                </p>
              </div>
            }
          />
          <Route path="/offer-letter" element={<CsvUploader />} />
          <Route path="/completion-letter" element={<CompletionLetter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
