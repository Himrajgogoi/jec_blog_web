import React, {useState} from 'react';
import axios from "axios";
import { Link,NavLink } from 'react-router-dom';
import {tokenConfig} from "../../actions/auth";
import { Collapse, NavbarToggler } from 'reactstrap';

// logout user
async function logoutUser(){
  const config = tokenConfig();

  var res = await axios.post(`http://127.0.0.1:8000/api/auth/logout`,null, config);
  return res;
  
}

function Header() {

  const [isOpen, setisOpen] = useState(false);

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
            <span className="navbar-brand" href="#" style={{paddingLeft: `2vw`, color: 'white'}}>Articles</span>
             <NavbarToggler onClick={()=>setisOpen(!isOpen)} style={{color: "white"}}><span className="navbar-toggler-icon"></span></NavbarToggler>
             <Collapse isOpen={isOpen} navbar>
              <ul className="navbar-nav">
                <li className="nav-item active">
                <Link to="/"><span style={{paddingLeft: `2vw`, color: 'white'}}>Recent</span> </Link>
               </li>
             <li className="nav-item">
             <Link to="/all"><span style={{paddingLeft: `2vw`, color: 'white'}}>All</span></Link>
             </li>
             <li className="nav-item">
                 <Link to="/personal" style={{paddingLeft: `2vw`, color: 'white'}}><span> Personal</span></Link>
               </li>
             </ul>
             <button type="button"className="bg-primary" style={{marginLeft: `2vw`,color: `white`}} onClick={()=>logoutUser()}>Logout</button>
               </Collapse>
            </nav>
        </div>
    );
}

export default Header;
