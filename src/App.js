import "./App.css";
import { Route } from "react-router-dom";
import Poster from "./pages/Poster";
import Map from "./pages/Map";
import Card from "./pages/Card";
import Organize from "./pages/Organaize";
import FootballOrganize from "./pages/Football";
import PosterImage from "./pages/Image";
import MyTournament from "./pages/MyTournament";
import Participate from "./pages/Participate";
import Edit from "./pages/Edit";
import ParticipateRecord from "./pages/ParticipateRecord";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Map} exact />
      <Route path="/poster" component={Poster} />
      <Route path="/card" component={Card} />
      <Route path="/organize" component={Organize} />
      <Route path="/Football" component={FootballOrganize} />
      <Route path="/image" component={PosterImage} />
      <Route path="/mytournament" component={MyTournament} />
      <Route path="/participate" component={Participate} />
      <Route path="/edit" component={Edit} />
      <Route path="/participaterecord" component={ParticipateRecord} />
    </div>
  );
}
export default App;
