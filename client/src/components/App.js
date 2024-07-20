import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LocationList from './LocationList';
import LocationDetails from './LocationDetails';
import AuthForm from './AuthForm';
import PrivateRoute from './PrivateRoute';
import AuthLayout from './AuthLayout';
import MainLayout from './MainLayout';
import './App.css';
import UserReviews from './Reviews';
import Profile from './Profile';
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
      <Switch>
        <Route path="/login">
          <AuthLayout>
            <AuthForm onLogin={handleLogin} />
          </AuthLayout>
        </Route>
        <Route path="/signup">
          <AuthLayout>
            <AuthForm onLogin={handleLogin} />
          </AuthLayout>
        </Route>
        <MainLayout isAuthenticated={isAuthenticated}>
          <Switch>
            <PrivateRoute path="/" exact isAuthenticated={isAuthenticated}>
              <LocationList />
            </PrivateRoute>
            <PrivateRoute path="/location/:id" isAuthenticated={isAuthenticated}>
              <LocationDetails />
            </PrivateRoute>
            <PrivateRoute path="/reviews" isAuthenticated={isAuthenticated}>
              <UserReviews />
            </PrivateRoute>
            <PrivateRoute path="/profile" isAuthenticated={isAuthenticated}>
              <Profile /> 
            </PrivateRoute>
            <Redirect to="/login" />
          </Switch>
        </MainLayout>
      </Switch>
    </Router>
  );
};

export default App;
