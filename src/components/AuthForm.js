import React, { useState, useCallback } from 'react';

//Import CSS module
import classes from './AuthForm.module.css';

//Import from react-redux
import { useDispatch } from 'react-redux';

//Import auth actions
import { authActions } from '../store/auth';

//Import from react-router-dom
import { Link, useNavigate } from 'react-router-dom';

const AuthForm = ({ login }) => {
  //Get userArr from localStorage
  const userArr = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];

  // Email array
  const emailArr = userArr.length > 0 && userArr.map((user) => user.email);

  //Check function
  //Check is email func
  const isEmail = (value) => value.trim() !== '' && value.includes('@');
  //Check empty field func
  const isNotEmpty = (value) => value.trim() !== '';
  const isPassword = (value) => value.trim() !== '' && value.trim().length > 8;
  //Check phone func
  const isPhone = (value) => value.trim() !== '' && /^\d{10}$/.test(value);
  //Check mail exist func
  const isEmailExist = (value) =>
    emailArr.length > 0 &&
    emailArr.find((email) => email.trim() === value.trim());

  //navigate
  const navigate = useNavigate();

  //Dispatch
  const dispatch = useDispatch();

  //auth data state
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  //Error input state
  const [errorInput, setErrorInput] = useState(null);
  //Success state
  // const [successMessage, setSuccessMessage] = useState('');

  //Input change handler func
  const inputChangeHandler = (e) => {
    //reset error state
    setErrorInput(null);

    //reset success state
    // setSuccessMessage('');

    //Set state value change
    setAuthData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  //Handle submit form
  const authSubmit = (e) => {
    //prevent  default behavior submit form
    e.preventDefault();

    //Case register
    if (!login) {
      //Check valid
      //Check name
      if (!isNotEmpty(authData.name)) {
        setErrorInput('Name input field could not be empty');
        return;
      } //Check email
      else if (!isEmail(authData.email)) {
        setErrorInput('Email input field could not be empty and contain @!');
        return;
      } //Check email exist
      else if (isEmailExist(authData.email)) {
        setErrorInput('Email adready exist!');
        return;
      }

      //Check password
      else if (!isPassword(authData.password)) {
        setErrorInput(
          'Password input field could not be empty and its length is greater than 8 words'
        );
      } //Check phone
      else if (!isPhone(authData.phone)) {
        setErrorInput(
          'Phone input field could not be empty and must be valid phone number with 10 digits'
        );

        return;
      } //Success
      else {
        //Reset error
        setErrorInput('');

        //Form obj
        const formObj = {
          name: authData.name,
          email: authData.email,
          password: authData.password,
          phone: authData.phone,
        };

        //Add userObj submit form to user array
        userArr.push(formObj);

        //Save user array to localStorage
        localStorage.setItem('users', JSON.stringify(userArr));

        //Redirect to login
        navigate('/login');
      }
    }
    //Case login
    else {
      //Check valid
      if (!isEmail(authData.email)) {
        setErrorInput('Email input field could not be empty and contain @!');
        return;
      } //Check email exist
      else if (!isEmailExist(authData.email)) {
        setErrorInput('Email  is  invalid!');
        return;
      }

      //Check password
      else if (!isPassword(authData.password)) {
        setErrorInput(
          'Password input field could not be empty and its length is greater than 8 words'
        );
      } else {
        //Find current user
        const user = userArr.find(
          (user) => user.password === authData.password
        );

        //Check user
        if (!user) {
          //Set error
          setErrorInput('Password is not matching, please try again!');

          //Set password is empty  when submit an error password
          setAuthData((prevAuthData) => {
            return { ...prevAuthData, password: '' };
          });
          return;
        }
        //Success
        alert('Login successfully!');

        //Set user to local storage
        localStorage.setItem('user', JSON.stringify(user));

        //dispatch set state isLogin true
        dispatch(authActions.onLogin(user));

        //Navigate to home page after login
        navigate('/');
      }
    }
  };

  return (
    <div className={classes.auth}>
      <div className={classes.container}>
        <form className={classes['auth-form']} onSubmit={authSubmit}>
          <div className={classes['form-group']}>
            <h1>{login ? 'Sign In' : 'Sign Up'}</h1>
            {errorInput && <p className={classes.error}>{errorInput}</p>}
            {/* {successMessage.length > 0 && (
              <p className={classes.success}>{successMessage}</p>
            )} */}
            {!login && (
              <>
                <input
                  value={authData.name}
                  onChange={inputChangeHandler}
                  type='text'
                  name='name'
                  placeholder='Full Name'
                />
                <input
                  value={authData.email}
                  onChange={inputChangeHandler}
                  type='email'
                  name='email'
                  placeholder='Email'
                />
                <input
                  value={authData.password}
                  onChange={inputChangeHandler}
                  type='password'
                  name='password'
                  placeholder='Password'
                />
                <input
                  value={authData.phone}
                  onChange={inputChangeHandler}
                  type='tel'
                  name='phone'
                  placeholder='Phone'
                />
              </>
            )}
            {login && (
              <>
                <input
                  value={authData.email}
                  onChange={inputChangeHandler}
                  type='email'
                  name='email'
                  placeholder='Email'
                />
                <input
                  value={authData.password}
                  onChange={inputChangeHandler}
                  type='password'
                  name='password'
                  placeholder='Password'
                />
              </>
            )}
          </div>
          <button type='Submit'>{login ? 'Sign in' : 'Sign up'}</button>
          <p className={classes.link}>
            {login ? 'Create an account? ' : 'Login? '}
            <Link to={login ? '/register' : '/login'}>
              {login ? 'Sign up' : 'Click'}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
