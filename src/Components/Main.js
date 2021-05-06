import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import DashBoard from "./DashBoard";
import Login from "./Account/login";
import Register from "./Account/register";
import Allarticles from "./AllArticles";
import PersonalArticles from "./PersonalArticles";
import Profile from "./Profile";
import useToken from "./common/useToken";

export default function Main() {
     
  const [token, setToken] = useToken("");

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={DashBoard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/all" component={Allarticles} />
        <Route path="/personal" component={PersonalArticles} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </HashRouter>
  );
}
