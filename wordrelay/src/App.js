import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './Components/Main/Main';
import './App.css';

function App() {
  return (
    <Router>
      <switch>
        <Route exact path="/" component={Main} />
      </switch>
    </Router>
  );
}

export default App;
