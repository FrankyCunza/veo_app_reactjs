import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Daily from './pages/daily'
import Profile from './pages/profileData'
import Home from './pages/home';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul className="hidden">
          <li><Link to="/daily">Daily</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/home">Home</Link></li>
        </ul>
        <Switch>
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
