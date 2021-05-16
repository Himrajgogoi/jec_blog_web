import React,{useState, useEffect} from 'react'
import { tokenConfig, tokenConfig_multipart } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import Header from "./common/Header";
import Footer from "./common/Footer";



//updating article
async function putArticle (id,data){
    const config = tokenConfig_multipart();

    axios.put(`${port}/api/personal/${id}/`, data, config)
    .then(res=>{
       console.log("success");
    })
    .catch(err=>{
       console.log("failed");
    });
}

function EditArticle(props) {

    const data = new FormData();

    const [article, setArticle] = useState({});
    const [err, setError] = useState(null);

    useEffect(()=>{
        async function getSpecificArticle(id) {
            const config = tokenConfig();
      
            await axios
              .get(`${port}/api/personal/${id}/`, config)
              .then((res) => {
                setArticle(res.data);
              })
              .catch((err) => {
                setError("An error occured");
            });
        }
        getSpecificArticle(props.id);
    },[])
    
    const addData = (key,value) =>{
        data.append(key,value);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        data.append('username', article.username);
        putArticle(props.id,data);
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
                                <h5>{article.username}</h5>
                            </div>
                            <div className="form-group">
                                <label for="header">Header</label>
                                <textarea rows="3" className="form-control" id="header" placeholder={article.header} onChange={e=>addData("header", e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="content">Content</label>
                                <textarea  rows="7" className="form-control" id="content" placeholder={article.textArea} onChange={e=>addData("textArea", e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="image">Image</label>
                                <input type="file" className="form-control" id="image" onChange={e=>addData("image", e.target.files[0])} accept=".jpg,.png,.jpeg"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
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

export default EditArticle
