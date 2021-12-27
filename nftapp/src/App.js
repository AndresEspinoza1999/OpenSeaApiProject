import { Link } from "react-router-dom";
import "./App.css"
export default function App() {
  return (
    <div>
     <div className="App">
          <h2 className="homeTitle">Random NFT Generator</h2>
          <Link to="/random">
            <button className="generateButton">Generate NFT</button>
          </Link>
        </div>
    </div>
  );
}