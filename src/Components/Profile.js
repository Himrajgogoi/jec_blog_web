import React,{useEffect, useState} from 'react';
import {tokenConfig, tokenConfig_multipart} from "../actions/auth";
import {port} from "../actions/port";
import axios from "axios";
import Header from './common/Header';
import Footer from './common/Footer';
import image from "../images/blog.jpg";
import { Loading } from "./common/Loading";


async function updateUser(id,username,email) {
    console.log("called")
    const config = tokenConfig();
    
    const body = JSON.stringify({username,email});

    axios.put(`${port}/api/users/${id}/`,body,config)
    .then(res=>{
       console.log("success");
    })
    .catch(err=>{
       console.log("failed");
    });
}

// profile creation
async function postProfile(data){
    const config = tokenConfig_multipart();

    axios.post(`${port}/api/user/profile/`,data,config)
    .then(res=>{
        console.log("success");
    })
    .catch(err=>{
        console.log("failed");
    })
}

// updating profile
async function putProfile(id,data){
    console.log(data.get("dp"))
    const config = tokenConfig_multipart();

    axios.put(`${port}/api/user/profile/${id}/`,data,config)
    .then(res=>{
        console.log("success");
    })
    .catch(err=>{
        console.log("failed");
    });
}


function Profile() {

    const [user,setUser] = useState({});
    const [user_profile,setUserProfile] = useState({});
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    
    /// taking in the inputs
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [bio,setBio] = useState(" ");
    const [dp, setDp] = useState(null);
    const data = new FormData();

    useEffect(()=>{
        async function loadUser(){
            const config = tokenConfig();
            await axios.get(`${port}/api/auth/user`, config)
            .then(res=>{
                setUser(res.data);
                setUserProfile(res.data.user_profile);
                console.log(user_profile.dp);
                setLoading(false);
            })
            .catch(err=>{
               setError("An error occured.");
               setLoading(false);
            });
        }
        loadUser();
    },[])

    const addData = (key, value) =>{
        data.append(key,value);
    }

    const handleSubmit = async e =>{
        e.preventDefault();
        console.log("handle Submit is called");
        await updateUser(user.id,username??user.username, email??user.email);

        if(user_profile== null){
            await postProfile(data);
        }
        else if(data != null){
           await putProfile(user_profile.id,data);
        }
        window.location.reload();

    }
    
    if(err==null && loading == false){
        if(user == {}) return(
            <div className="backcolor">
            <Header />
            <div>
              <div className="content">
                <h5 style={{ textAlign: "center", justifyContent: "center", color: "grey" }}>No user found.</h5>
              </div>
            </div>
            <Footer />
          </div>
          )
          else
        return (
            <div>
            <Header/>
              <div>
                 <div className="row profileheader">
                     <div className="col-12 col-md-4 offset-md-1" style={{marginTop: "4vh"}}>
                          <h4>Welcome,</h4>
                          <h2>{user.username}</h2>
                     </div>
                     <div className="col-12 col-md-3 offset-md-4">
                        <img className="img-fluid user" src={user_profile == null || user_profile.dp == null?image: user_profile.dp} style={{borderRadius: "50%"}}></img>
                     </div>
                 </div>
                 <div className="row" style={{marginLeft: "4vw", marginBottom: "7vh"}}>
                    <div className="col-12 col-md-6">
                        <form  onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="username">Username</label>
                                <input type="text" placeholder={user.username} className="form-control" id="username" onChange={e=>setUsername(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="email">Email</label>
                                <input type="email" placeholder={user.email}  className="form-control" id="email"  onChange={e=>setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="bio">Bio</label>
                                <input type="text" placeholder={user_profile == null || user_profile.bio == null?"No bio provided.": user_profile.bio} className="form-control" id="bio"  onChange={e=>addData("bio", e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="dp">Dp</label>
                                <input type="file" className="form-control" id="dp"  onChange={e=>addData("dp", e.target.files[0])} accept=".jpg,.png,.jpeg"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                    <div className="col-12 col-md-6">
                         <a href='https://www.freepik.com/vectors/website'><img className="img-fluid" src={image}></img></a>
                    </div>
                 </div>
              </div>
              <Footer/>  
            </div>
        )
    } else if (loading) {
        return (
          <div className="backcolor">
            <Header />
             <Loading/>
            <Footer />
          </div>
        );
      } 

    else if (err !== null && loading == false){
        return (
            <div className="backcolor">
                <Header/>             
                   <div className="content">
                        <h5  style={{textAlign: "center"}}>{err}</h5>
                   </div>
                <Footer/>
            </div>
           
        )
    }
}

export default Profile
