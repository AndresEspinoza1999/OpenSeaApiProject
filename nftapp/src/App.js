import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
     <div className="App">
          <h2>Random NFT Generator</h2>
          <Link to="/random">
            <button className="generateButton">Generate NFT</button>
          </Link>
        </div>
    </div>
  );
}