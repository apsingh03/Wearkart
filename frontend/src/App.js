import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Client/HomePage";
import Typography from "./components/Client/Typography";
import Cart from "./components/Client/Cart";
import { useState } from "react";
import ProductFilterPage from "./pages/Client/ProductFilterPage";
import ProductDetail from "./pages/Client/ProductDetail";

function App() {
  const [cartIsHover, setcartIsHover] = useState(false);

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
        <Route path="/collections" element={<ProductFilterPage />} />
        <Route path="/product" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
