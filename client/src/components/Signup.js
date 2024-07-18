import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Login from './Login';
import './signup.css';

const Signup = ({ onLogin }) => {
  const initialValues = {
    email: '',
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
  });

  const [registered, setRegistered] = useState(false);
  const [loginAfterRegister, setLoginAfterRegister] = useState(false);

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    axios.post('/auth/register', values)
      .then(response => {
        console.log('User registered successfully:', response.data);
        resetForm();
        setRegistered(true);
        setLoginAfterRegister(true);
      })
      .catch(error => {
        console.error('Error registering user:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="form-container">
      {!registered && (
        <div>
          <h1>Sign Up</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {registered && loginAfterRegister && (
        <div>
          <h1>Login after Registration</h1>
          <Login email={initialValues.email} password={initialValues.password} onLogin={onLogin} />
        </div>
      )}
    </div>
  );
};

export default Signup;
