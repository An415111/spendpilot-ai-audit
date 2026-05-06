import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuditForm from "./pages/AuditForm";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<AuditForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;