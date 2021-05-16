import React, {useState} from 'react';
import axios from "axios";
import { Link,NavLink, useHistory } from 'react-router-dom';
import {tokenConfig} from "../../actions/auth";
import { Collapse, NavbarToggler } from 'reactstrap';


function Header() {

  const [isOpen, setisOpen] = useState(false);
  const history = useHistory();

  // logout user
  const logoutUser = async ()=>{
  const config = tokenConfig();

  var res = await axios.post(`http://127.0.0.1:8000/api/auth/logout`,null, config);
  localStorage.removeItem('token');
  history.push('/')
  window.location.reload();
  
  }


    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <span className="navbar-brand" href="#" style={{color: 'white',marginLeft:"2vw"}}>Jec Blog</span>
             <NavbarToggler onClick={()=>setisOpen(!isOpen)}><span className="navbar-toggler-icon"></span></NavbarToggler>
             <Collapse isOpen={isOpen} navbar>
              <ul className="navbar-nav">
              <li className="nav-item">
                <span onClick={()=>logoutUser()}><i className="fa fa-sign-out fa-lg" style={{color:'white', marginRight: '5px'}}></i><span>Logout</span></span>
                </li>
               <li className="nav-item">
                  <Link to="/users"><span>Users</span></Link>
                </li>
                <li className="nav-item active">
                  <Link to="/"><span>Dashboard</span> </Link>
                </li>
                <li className="nav-item">
                  <Link to="/all"><span>All Articles</span></Link>
                </li>
                <li className="nav-item">
                <i className="fa fa-newspaper-o fa-lg" style={{marginRight: '5px'}}></i><Link to="/writeArticle"><span>Write an Article</span></Link>
                </li>
                <li className="nav-item">
                   <Link to="/profile"><span className= 'fa fa-user-circle-o fa-lg' style={{color: 'white'}}></span></Link>
                </li>
             </ul>
               </Collapse>
          </nav>
        </div>
    );
}

export default Header;
