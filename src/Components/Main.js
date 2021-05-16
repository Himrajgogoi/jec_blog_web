import React, { useEffect, useState } from "react";
import {Route, Switch, BrowserRouter } from "react-router-dom";
import DashBoard from "./DashBoard";
import Login from "./Account/login";
import Register from "./Account/register";
import Allarticles from "./AllArticles";
import Users from "./Users";
import Profile from "./Profile";
import useToken from "./common/useToken";
import SpecificArticle from "./SpecificArticle";
import SpecificUser from "./SpecificUser";
import WriteArticle from "./WriteArticle";
import EditArticle from "./EditArticle";

export default function Main() {

     const [token, setToken] = useToken("");

     useEffect(function(){
       console.log("token state changes");
       console.log(token);
     },[token])
     
     if(!token){
          const LoginPage = ()=>{
               return(<Login setToken={setToken}/>);
          }
          const RegisterPage = ()=>{
               return(<Register setToken={setToken}/>);
          }
          return (
               <div>
               <BrowserRouter>
                         <Switch>
                                 <Route exact path = "/" component={LoginPage}/>
                                 <Route exact path = "/register" component={RegisterPage}/>
                         </Switch>
                 </BrowserRouter>
          </div> 
          );
     }
     const Article = ({match})=>{
          return(
               <SpecificArticle id ={parseInt(match.params.articleId,10)}/>
          );
     }

     const Editarticle = ({match}) =>{
          return(<EditArticle id={parseInt(match.params.editId,10)}/>)
     }

     const User = ({match}) =>{
          return(<SpecificUser id = {parseInt(match.params.userId,10)}/>)
     }
     return(<div>
          <BrowserRouter>
                    <Switch>
                        <Route exact path = "/" component={DashBoard}/>
                            <Route exact path = "/login" component={Login}/>
                            <Route exact path = "/register" component={Register}/>
                            <Route path = "/all" component={Allarticles}/>
                            <Route path = "/articles/:articleId" component={Article}/>
                            <Route path = "/personal/:editId" component={Editarticle}/>
                            <Route path = "/users/:userId" component={User}/>
                            <Route path = "/users" component = {Users}/>
                            <Route path="/writeArticle" component = {WriteArticle}/>
                            <Route path="/profile" component = {Profile}/>
                    </Switch>
            </BrowserRouter>
     </div>);
}
