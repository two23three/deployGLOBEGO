import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const AuthForm = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      <h1>Welcome</h1>
      {showLogin ? (
        <div>
          <Login onLogin={onLogin} />
          <p>Don't have an account? <button onClick={toggleForm}>Sign Up</button></p>
        </div>
      ) : (
        <div>
          <Signup onLogin={onLogin} />
          <p>Already have an account? <button onClick={toggleForm}>Login</button></p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
