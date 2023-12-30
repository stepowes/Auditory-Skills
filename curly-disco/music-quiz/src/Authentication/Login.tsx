import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Wrapper, Header, FormGroup, Label, Input, SubmitButton} from './Style/User.styles';
import axios from 'axios';
import {getCookie} from '../utils';

const Login = () => {
  const[form, setForm] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  // useEffect(() => {
  //   // Cleanup function
  //   return () => {
  //     console.log("Current User: " + localStorage.getItem('username'))
  //     console.log(location.pathname)
  //     if (location.pathname === '/login'){
  //       console.log("Username Removed")
  //       localStorage.removeItem('username');
  //     }
  //   };
  // }, []); // The empty dependency array ensures the effect runs only on mount and unmount

 


  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const{name, value} = e.target;
    setForm({...form, [name]:value})
  }

  //const history = useHistory();
  //const user = [{username:"zih19", password:"123456"}]
  //const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Fetch CSRF token from Django backend when the login button is pressed
      // const response = await axios.get('http://127.0.0.1:8000/get_csrf_token/');
      // const csrfToken = response.data.csrfToken;
      // console.log('CSRF Token:', csrfToken);
      const csrfToken = getCookie('csrftoken')
      console.log("AT login csrfToken: " + csrfToken)
      console.log("csrfToken: " + csrfToken)
      const response = await axios.post('http://127.0.0.1:8000/api/user/login/', form, {
        withCredentials: false,
        // headers: {
        //   'X-CSRFToken': csrfToken,
        // },
      });
      console.log('Login successful');
      // console.log(loginResponse);
      // const csrfTokenBack = response.headers['x-csrftoken'];
      // console.log('CSRF Token from Response:', csrfTokenBack);
      
      const username = response.data['username'];
      localStorage.setItem('username', username);
      console.log(localStorage)
      navigate('/menu');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response ? error.response.data : error.message); //failing here
      } else {
          console.error('Login failed:', error);
      }
      alert('Invalid username or password');
    }
  };
  useEffect(() => {
    // Check if the user is on the login page and remove the username if necessary
    if (location.pathname === '/' && localStorage.getItem('username')) {
      //console.log("Current User: " + localStorage.getItem('username'))
      //console.log(location.pathname)
      console.log('Username Removed');
      localStorage.removeItem('username');
    }
  }, []);

  return(
      
      <Wrapper>
      <div className="login-page">
            <Header> Login </Header>

            <form onSubmit={handleLogin} data-csrf="{% csrf_token %}">
                    <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" 
                        name="username" 
                        value={form.username} 
                        onChange={handleInput}
                        required />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password"
                        name="password" 
                        value={form.password} 
                        onChange={handleInput}
                        required />
                        
                    </FormGroup>
               <SubmitButton type="submit" >Login</SubmitButton>
            </form>

            {/* <div className="buttons">
                <SubmitButton type="submit">Login</SubmitButton>
                {/* <CancelButton type="button" onClick={() => {}}> 
                        Cancel
                </CancelButton> 
            </div>*/}

            <p>
                Are you a new user? <Link to='/register'> Register </Link>
            </p>
        
    </div>
    </Wrapper>
   );
}
export default Login;