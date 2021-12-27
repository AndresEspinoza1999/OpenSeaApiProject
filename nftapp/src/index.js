import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Random from "./components/randomNFT";
import App from "./App";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/OpenSeaApiProject" element={<App />} />
      <Route path="random" element={<Random />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
