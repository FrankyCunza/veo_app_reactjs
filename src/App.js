import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Daily from './pages/daily'
import Profile from './pages/profileData'
import Home from './pages/home';
import Protocols from './pages/protocols';
import pageStep from './pages/pageStep';

import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <ul className="hidden">
        <li><Link to="/daily">Daily</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/home">Home</Link></li>
      </ul>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
              return (
                false ?
                <Redirect to="/login" /> :
                <Redirect to="/login" /> 
              )
          }}
        />
        <Route path="/home" >
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/testdiario">
          <Daily />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/protocols">
          <Protocols />
        </Route>
        <Route path="/pageStep">
          <pageStep />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
