import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import Daily from './pages/daily'
import ProfileOld from './pages/profileData'
import Home from './pages/home';
import Protocols from './pages/protocols';
import PageStep from './pages/pageStep';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Informed from './pages/informed';
import InformedEntries from './pages/informedEntries';
import InformedArticle from './pages/informedArticle';
import AuxiliaryControls from './pages/auxiliaryControls';
import AuxiliaryControlsForm from './pages/auxiliaryControlsForm';
import Profile from './pages/profile';
import Register from './pages/register';
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
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/testdiario">
          <Daily />
        </Route>
        <Route path="/profileOld">
          <ProfileOld />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/protocols">
          <Protocols />
        </Route>
        <Route path="/pageStep">
          <PageStep />
        </Route>
        <Route path="/getinformed">
          <Informed />
        </Route>
        <Route path="/informedEntries">
          <InformedEntries />
        </Route>
        <Route path="/informedArticle">
          <InformedArticle />
        </Route>
        <Route path="/auxiliaryControls">
          <AuxiliaryControls />
        </Route>
        <Route path="/auxiliaryControlsForm">
          <AuxiliaryControlsForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
