import React, {useState} from "react";
import axios from 'axios';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({ username: 'Lambda School', password: 'i<3Lambd4' })

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

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className='bubble-wrap'>
      <h2>Bubles!</h2>
      <input type='text' name='username' placeholder='Username' onChange={handleChange} value={credentials.username} />
      <input type='password' name='password' placeholder='' onChange={handleChange} value={credentials.password} />
      <button>Log in</button>
    </form>
  );
};

export default Login;
