
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import Typography from "./components/Client/Typography";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/typography" element={<Typography />} />
      </Routes>
    </>
  );
}

export default App;
