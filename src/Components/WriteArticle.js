import React,{useState, useEffect} from 'react'
import { tokenConfig, tokenConfig_multipart } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Redirect } from 'react-router';


// posting article
async function postArticle(data){
    const config = tokenConfig_multipart();

    axios.post(`${port}/api/articles/`, data, config)
    .then(res=>{
        console.log("success");
    })
    .catch(err=>{
        console.log("failed");
    });
}

function WriteArticle() {

    const [username, setUsername] = useState("");
    const [header, setHeader] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const data = new FormData();

    const [err,setError] = useState(null);

    useEffect(()=>{
        async function loadUser(){
            const config = tokenConfig();
            await axios.get(`${port}/api/auth/user`, config)
            .then(res=>{
                data.append('username', res.data.username);
                setUsername(res.data.username);
            })
            .catch(err=>{
               setError("An error occured.");
            });
        }
        loadUser();
    },[])

    const addData = (key,value) =>{
        data.append(key,value);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        postArticle(data);
    }
    if(err == null){
        return(<div>
            <Header/>
              <div>
                 <div className="row addArticleheader">
                     <div className="col-12 col-md-4 offset-md-1" style={{marginTop: "4vh"}}>
                         <h3>Create something new.</h3>
                     </div>
                 </div>
                 <div className="row" style={{marginLeft: "4vw", marginBottom: "7vh"}}>
                    <div className="col-12 col-lg-8">
                        <form  onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="username">Username</label>
                                <h5>{username}</h5>
                            </div>
                            <div className="form-group">
                                <label for="header">Header</label>
                                <textarea rows="3" className="form-control" id="header"  onChange={e=>addData("header", e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="content">Content</label>
                                <textarea  rows="7" className="form-control" id="content"  onChange={e=>addData("textArea", e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="image">Image</label>
                                <input type="file" className="form-control" id="image"  onChange={e=>addData("image", e.target.files[0])} accept=".jpg,.png,.jpeg"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Post</button>
                        </form>
                    </div>
                 </div>
              </div>
              <Footer/>  
            </div>
        );
    }
    else {
        return (
          <div className="backcolor">
            <Header />
            <div>
              <div className="content">
                <h5 style={{ textAlign: "center" }}>{err}</h5>
              </div>
            </div>
            <Footer />
          </div>
        );
      }
}

export default WriteArticle
