import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import QuizList from './QuizList';
import Home from './Home';
import Quiz from './Quiz';

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Router>
          <nav className="flex flex-row p-10 bg-gray-800 rounded-md text-white font-bold">
            <ul className="flex flex-row">
              <li className="text-2xl font-bold">KaleidoSoft Frontend</li>
              <li className="m-4">
                <Link to="/">Home</Link>
              </li>
              <li className="m-4">
                <Link to="/quizes">Quiz Lists</Link>
              </li>
              
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/quizes">
              <QuizList />
            </Route>
            <Route exact path="/quiz/:id" render={(props) => {
              return(<Quiz id={props.match.params.id} />)
            }} >
            </Route>
            
            <Route path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
