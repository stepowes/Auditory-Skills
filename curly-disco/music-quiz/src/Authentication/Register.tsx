import React, { useState } from 'react';
import {Wrapper, Header, FormGroup, Label, Input, SubmitButton} from './Style/User.styles';
import { useNavigate, Link } from 'react-router-dom';

import axios from 'axios';

const Register = () => {
    const[form, setForm] = useState({
       lastname: '',
       firstname: '',
       username: '',
       age: '',
       musicalYear: '',
       email: '',
       password:'',
       confirmedPassword: '',
    });

    // const[username, setUserName] = useState('');
    // const[age, setAge] = useState('');
    // const[musicalYear, setMusicalYear] = useState('');
    // const[email, setEmail] = useState('');
    // const[password, setPassword] = useState('');
    // const[confirmedpassword, setConfirmedPassword] = useState('')
    
     

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]:value});
    };

    const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault();
       if (form.password !== form.confirmedPassword){
              console.error('Passwords do not match!');
              return;
       }
       const requiredFields: Array<keyof typeof form> = ['firstname', 'lastname', 'username', 'age', 'musicalYear', 'email', 'password', 'confirmedPassword'];
       for (const field of requiredFields) {
         if (!form[field]) {
           console.error(`${field} is required`);
           // Set an error state or display a message to the user
           return;
         }
       }
       try {
           //console.log('Form data: ', form);
           const response = await axios.post('http://127.0.0.1:8000/api/user/create/', form);
           //console.log("SUCCESS")
           //console.log('User registered successfully', response.data);
           //console.log(form);
           navigate("/register/success");
       } catch (error) {
              // console.log("ERROR ENCOUNTERED")
              //console.log(error)
              if (axios.isAxiosError(error)) {
                     const errorMessage = error.response ? error.response.data : error.message;
                     console.error('Registration failed:', errorMessage); //failing here
                     alert('Registration failed: ' + errorMessage);
                 } else {
                     console.error('Registration failed:', error);
                     alert('Registration failed: ' + error);
                 }

       }
    };

   

    return(
        <Wrapper>
            <Header>Sign Up Your Account</Header>

            <p>Please Enter the following information below</p>
            
            <form onSubmit={handleRegister}>
                <FormGroup>
                    
                    <Label htmlFor="firstname">First Name</Label>
                    <Input type="text"
                           name="firstname" 
                           value={form.firstname}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="lastname">Last Name</Label>
                    <Input type="text" 
                           name="lastname"
                           value={form.lastname}
                           onChange={handleInputChange}
                    />
                   

                    <Label htmlFor="username">Username</Label>
                    <Input type="text"
                           name="username"
                           value={form.username}
                           onChange={handleInputChange}
                    />
                    
                    <Label htmlFor="age">Age</Label>
                    <Input type="text"
                           name="age"
                           value={form.age}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="musicalYear">Musical Year</Label>
                    <Input type="text"
                           name="musicalYear"
                           value={form.musicalYear}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="email">Email</Label>
                    <Input type="email" 
                           name="email" 
                           value={form.email}
                           onChange={handleInputChange} 
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password"
                           name="password"
                           value={form.password}
                           onChange={handleInputChange}
                    />

                    <Label htmlFor="confirmedPassword">Confirmed Password</Label>
                    <Input type="password"
                           name="confirmedPassword"
                           value={form.confirmedPassword}
                           onChange={handleInputChange}
                    />

                   
                </FormGroup>
                <SubmitButton type="submit"> Register </SubmitButton>
            </form>

            {/* Back button */}
            <Link to="/">Back to Login</Link>
            

        </Wrapper>

    );
    


}
export default Register