import "./App.css";

import { Route } from "react-router-dom";
import Poster from "./pages/Poster";
import Map from "./pages/Map";
import Card from "./pages/Card";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Map} exact />
      <Route path="/poster" component={Poster} />
      <Route path="/card" component={Card} />
    </div>
  );
}
export default App;
