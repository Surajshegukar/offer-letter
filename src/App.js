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
              <div className="m-10 p-5 ">
                <p>
                  <Link
                    className="hover:text-blue-900 hover:pointer"
                    to="/offer-letter"
                  >
                    1. Generate Offer Letter
                  </Link>
                </p>
                <p>
                  <Link
                    className="hover:text-blue-900 hover:pointer"
                    to="/completion-letter"
                  >
                    2. Generate Completion Letter
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
