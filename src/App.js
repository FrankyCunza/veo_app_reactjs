import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Daily from './pages/daily'
import Profile from './pages/profileData'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1 className="hidden">Hello World</h1>
      <BrowserRouter>
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
