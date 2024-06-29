import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import Typography from "./components/Client/Typography";
import Cart from "./components/Client/Cart";
import { useState } from "react";

function App() {
  const [cartIsHover, setcartIsHover] = useState(true);

  return (
    <>
      {cartIsHover ? <Cart setcartIsHover={setcartIsHover} /> : null}

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              cartIsHover={cartIsHover}
              setcartIsHover={setcartIsHover}
            />
          }
        />
        <Route path="/typography" element={<Typography />} />
      </Routes>
    </>
  );
}

export default App;
