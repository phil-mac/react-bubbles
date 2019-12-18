import React from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const credentials = { username: 'Lambda School', password: 'i<3Lambd4' };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  }

  const login = () => {
    axios
    .post(`http://localhost:5005/api/login`, credentials)
    .then(res => {
      const token = res.data.payload;
      console.log('loggedin with tok: ' + token);
      localStorage.setItem('token', token);
      props.history.push('/bubbles');
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <button>Log in as Admin</button>
    </form>
  );
};

export default Login;
