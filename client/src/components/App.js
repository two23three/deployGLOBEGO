import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LocationList from './LocationList';
import LocationDetails from './LocationDetails';
import Navbar from './Navbar';
import AuthForm from './AuthForm';
import './App.css';
import UserReviews from './Reviews';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            {isAuthenticated ? <LocationList /> : <Redirect to="/login" />}
          </Route>
          <Route path="/location/:id">
            {isAuthenticated ? <LocationDetails /> : <Redirect to="/login" />}
          </Route>
          <Route path="/reviews">
            {isAuthenticated ? <UserReviews /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <AuthForm onLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <AuthForm onLogin={handleLogin} />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
