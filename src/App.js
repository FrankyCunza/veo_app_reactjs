import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Daily from './pages/daily'
import Profile from './pages/profileData'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1 className="hidden">Hello World</h1>
      <BrowserRouter>
        <ul>
          <li><Link to="/daily">Daily</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/daily">
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
