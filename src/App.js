import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Daily from './pages/daily'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/daily">
            <Daily />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
