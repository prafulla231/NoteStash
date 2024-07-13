import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); //to prevent page reload
        const {name,email,password} = credentials//desttructuring
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({name,email,password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            //For redirecting using isehistory hook
            navigate("/")
            props.showAlert("Account created successfully","success")
        }
        else{
            props.showAlert("Invalid user details","danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-3'>
        <h2>Please Create an account to use to Notestash</h2>
            <form onSubmit={handleSubmit} >
            <label htmlFor="name"> Name</label>
                    <input type="text" className="form-control my-3" id="name" name ="name" aria-describedby="emailHelp" placeholder=" Enter your name" onChange={onChange}/>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-3" onChange={onChange} id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted my-3">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control my-3" id="password" name ="password" placeholder="Password" onChange={onChange}  minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control my-3" id="cpassword" name ="cpassword" placeholder="Password" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
