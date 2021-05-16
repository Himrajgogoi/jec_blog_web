import React,{useEffect, useState, Component} from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import {Link, Redirect} from "react-router-dom";
import {tokenConfig} from "../../actions/auth";
import background from "../../images/login-background.jpeg";


/// Loggin in user
async function loginUser(username, password, setToken, setError){

    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username,password});

    axios.post(`http://127.0.0.1:8000/api/auth/login`, body, config)
    .then(res=>{
        setToken(res.data.token);
    })
    .catch(err=>{
       setError("Incorrect username or password");
    })
   
        
}

export default function Login(props) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);


        const handleSubmit = async e =>{
            e.preventDefault();
            loginUser(username,password, props.setToken, setError);
        }
            return (
                <div style={{backgroundImage:`url(${background})`, backgroundPosition:"center center", backgroundRepeat:"no repeat",
                backgroundSize: "cover",height:"100vh", width: "100vw"}}>
                        <div className="container" style={{paddingTop:"8vh"}}>
                            <div className="col-12 offset-md-3 col-md-6">
                                <div className="card">
                                <div className="cardheader bg-secondary" style={{color: `white`}}><h4>Login</h4></div>
                                <div className="cardbody" style={{padding: "2vh 2vw 2vh 2vw ", }}>
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group">
                                      <label for="username">Username</label>
                                       <input type="text" className="form-control" id="username"  placeholder="Enter username" onChange={e=> setUsername(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                      <label for="passwordoftheuser">Password</label>
                                      <input type="password" className="form-control" id="passwordoftheuser" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            </div>
                            <small style={{color: "wheat"}}>Dont have an account?</small><small><Link to="/register"> Register</Link></small>
                            <div>
                                 <small style={{color:"red", fontWeight: "bold"}}>{error}</small>
                            </div>
                        </div>
                    </div>
                </div>
             );
   

  
}

