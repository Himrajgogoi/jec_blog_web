import React,{useState} from 'react'
import axios from "axios";
import {Link} from "react-router-dom";
import background from "../../images/login-background.jpeg";

async function registerUser (username, email, password) {
    
    const config = {
        headers:{
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({username,email,password});

    var res = await axios.post(`http://127.0.0.1:8000/api/auth/register`,body,config)
    console.log(res.data);
    console.log(res.data.token);
    return res.data;
    
}

export default function Register(props) {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const handleSubmit = async e =>{
        e.preventDefault();
        const data = await registerUser(username,email,password);
        props.setToken(data.token);
    }
        return (
            <div style={{backgroundImage:`url(${background})`, backgroundPosition:"center center", backgroundRepeat:"no repeat",
            backgroundSize: "cover",height:"100vh", width: "100vw"}}>
                    <div className="container" style={{paddingTop:"8vh"}}>
                        <div className="col-12 offset-md-3 col-md-6">
                            <div className="card">
                            <div className="cardheader bg-secondary" style={{color: `white`}}><h4>Register</h4></div>
                            <div className="cardbody" style={{padding: "2vh 2vw 2vh 2vw ", }}>
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                  <label for="username">Username</label>
                                   <input type="text" class="form-control" id="username"  placeholder="Enter username" onChange={e=> setUsername(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                  <label for="username">Email</label>
                                   <input type="email" class="form-control" id="username"  placeholder="Enter username" onChange={e=> setEmail(e.target.value)}/>
                                </div>
                                <div class="form-group">
                                  <label for="passwordoftheuser">Password</label>
                                  <input type="password" class="form-control" id="passwordoftheuser" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        </div>
                    </div>
                </div> 
                <small>Already have an account?</small><Link to="/"><small>Login</small></Link>
            </div>
         );
}
