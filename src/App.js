import "./App.css";

import { Route } from "react-router-dom";
import Poster from "./pages/Poster";
import Map from "./pages/Map";
import Card from "./pages/Card";
import Organize from "./pages/Organaize";
import FootballOrganize from "./pages/Football";
import PosterImage from "./pages/Image";
function App() {
  return (
    <div className="App">
      <Route path="/" component={Map} exact />
      <Route path="/poster" component={Poster} />
      <Route path="/card" component={Card} />
      <Route path="/organize" component={Organize} />
      <Route path="/Football" component={FootballOrganize} />
      <Route path="/image" component={PosterImage} />
    </div>
  );
}
export default App;
