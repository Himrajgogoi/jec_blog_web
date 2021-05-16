import React,{useState, useEffect} from 'react'
import { tokenConfig } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import Header from "./common/Header";
import Footer from "./common/Footer";
import image from "../images/blog.jpg";
import image1 from "../images/article.jpg";

function SpecificUser(props) {

    const [user, setUser] = useState({});
    const [user_profile, setProfile] = useState(null);
    const [posted, setPosted] = useState([]);
    const [err, setError] = useState(null);

    useEffect(()=>{

        // specific user
        async function getSpecificUser(id) {
           const config = tokenConfig();
  
           axios.get(`${port}/api/users/${id}/`, config)
            .then((res) => {
              setUser(res.data);
              setProfile(res.data.user_profile)
              setPosted(res.data.posted)
            })
            .catch((err) => {
              setError("An error occured");
            });
        }
        getSpecificUser(props.id);
    },[])
    if(err==null){
        return (
            <div>
            <Header/>
              <div>
                 <div className="row profileheader">
                     <div className="col-12 col-md-4 offset-md-1" style={{marginTop: "4vh"}}>
                          <h4>Hello from,</h4>
                          <h2>{user.username}</h2>
                     </div>
                     <div className="col-12 col-md-3 offset-md-4">
                        <img className="img-fluid user" src={user_profile == null || user_profile.dp == null?image1: user_profile.dp} style={{borderRadius: "50%"}}></img>
                     </div>
                 </div>
                 <div className="row" style={{marginLeft: "4vw", marginBottom: "7vh"}}>
                    <div className="col-12 col-md-6">
                       <label for="username">Username</label>
                       <p id="username" className="userDetail"><b>{user.username}</b></p>
                       <label for="email" >Email</label>
                       <p id="email" className="userDetail"><b>{user.email}</b></p>
                       <label for="bio">Bio</label>
                       <p id="bio" className="userDetail"><b>{user_profile == null || user_profile.bio == null?"No bio provided.": user_profile.bio}</b></p>
                    </div>
                    <div className="col-12 col-md-6">
                         <a href='https://www.freepik.com/vectors/website'><img className="img-fluid" src={image}></img></a>
                    </div>
                 </div>
              </div>
              <Footer/>  
            </div>
        )
    }

    else{
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

export default SpecificUser
