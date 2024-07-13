import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent page reload
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email : credentials.email,password: credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            props.showAlert("User logged in successfully","success")
            //For redirecting using isehistory hook
            navigate("/")
            
        }
        else{
            props.showAlert("Invalid user credentials","danger")
        }
    }
 
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='mt-3'>
        <h2>Please login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-2" id="email" name="email" value ={credentials.email} onChange={onChange}aaria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control my-2" id="password" name="password" value ={credentials.password}  onChange={onChange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
