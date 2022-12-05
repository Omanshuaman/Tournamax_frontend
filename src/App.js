import "./App.css";

import { Route } from "react-router-dom";
import Poster from "./pages/Poster";
import Map from "./pages/Map";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Map} exact />
      <Route path="/poster" component={Poster} />
    </div>
  );
}
export default App;
