import React, { useState, useEffect } from "react";
import Header from "./common/Header";
import { tokenConfig } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import image from "../images/article.jpg";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";

function Users() {
  const [data, setData] = useState([]);
  const [searched, setSearch] = useState([]);
  const [err, setError] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    // all users
    async function getAllUsers() {
      const config = tokenConfig();

      axios
        .get(`${port}/api/users/`, config)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          setError("An error occured");
        });
    }
    getAllUsers();
  }, []);

  const makepattern = (word) => {
    let splitted = word.split("");
    let pattern = "";
    splitted.forEach((letter) => {
      pattern += letter + ".*";
    });
    return pattern + "";
  };

  const search = (item) => {
    let pattern = makepattern(item.toLowerCase());
    let re = new RegExp(pattern, "i");
    setSearch(
      data.filter((element) => {
        let found = re.exec(element.username);
        return found ? true : false;
      })
    );
    console.log(data);
  };
  if (err == null) {
    return (
      <div>
        <Header />
        <div className="container" style={{ marginTop: "8vh" }}>
          <div className="row">
            <div className="col-10 col-lg-4 offset-lg-4">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="search for a user."
                    className="form-control"
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="col-1 col-lg-1">
              <i
                className="fa fa-search fa-lg"
                onClick={() => search(user)}
              ></i>
            </div>
          </div>
          <div>
            {searched.length > 0 ? (
              <div className="row heading">
                <div className="col-12">
                  <h3 className="mainheader">Search Results</h3>
                  {searched.map((user) => (
                    <div className="row">
                      <Link to={`/users/${user.id}`}  style={{color:"black", textDecoration:"none"}}>
                        <div className="container recent">
                          <div className="row">
                            <div className="col-12">
                              <h4>{user.username}</h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-5">
                              <img
                                className="img-fluid user"
                                src={
                                  user.user_profile == null ||
                                  user.user_profile.dp == null
                                    ? image
                                    : user.user_profile.dp
                                }
                                height="4vh"
                              />
                            </div>
                            <div className="col-12 col-md-7">
                              <label>
                                <b>Bio</b>
                              </label>
                              <p>
                                {user.user_profile == null ||
                                user.user_profile.bio == null
                                  ? "No bio was written"
                                  : user.user_profile.bio}
                              </p>
                              <p>
                                <i className="fa fa-envelope fa-lg"></i>{" "}
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="row heading">
            <div className="col-12">
              <h3 className="mainheader">All Users</h3>
              {data.map((user) => (
                <div className="row">
                  <Link to={`/users/${user.id}`}  style={{color:"black", textDecoration:"none"}}>
                    <div className="container recent">
                      <div className="row">
                        <div className="col-12">
                          <h4>{user.username}</h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-5">
                          <img
                            className="img-fluid user"
                            src={
                              user.user_profile == null ||
                              user.user_profile.dp == null
                                ? image
                                : user.user_profile.dp
                            }
                            height="4vh"
                          />
                        </div>
                        <div className="col-12 col-md-7">
                          <label>
                            <b>Bio</b>
                          </label>
                          <p>
                            {user.user_profile == null ||
                            user.user_profile.bio == null
                              ? "No bio was written"
                              : user.user_profile.bio}
                          </p>
                          <p>
                            <i className="fa fa-envelope fa-lg"></i>{" "}
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="backcolor">
        <Header />
        <div className="content">
          <h5 style={{ textAlign: "center" }}>{err}</h5>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Users;
