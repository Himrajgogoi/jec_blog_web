import React, { useState, useEffect } from "react";
import { tokenConfig } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";

function SpecificArticle(props) {
  const [data, setData] = useState({});
  const [owner, setOwner] = useState({});
  const [profile, setProfile] = useState({});
  const [date, setDate] = useState(null);
  const [err, setError] = useState(null);

  useEffect(() => {
    async function getSpecificArticle(id) {
      const config = tokenConfig();

      await axios
        .get(`${port}/api/articles/${id}/`, config)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setDate(res.data.createdAt);
          getSpecificUser(res.data.owner);
        })
        .catch((err) => {
          setError("An error occured");
        });
    }

    // specific user
    async function getSpecificUser(id) {
      const config = tokenConfig();

      axios
        .get(`${port}/api/users/${id}/`, config)
        .then((res) => {
            setOwner(res.data);
            setProfile(res.data.user_profile)
        })
        .catch((err) => {
            setError("An error occured");
        });
    }
    getSpecificArticle(props.id);
  }, []);
  if (err == null) {
    return (
      <div>
        <Header />
        <div className="container content">
          <div className="row">
            <div className="col-12 col-lg-9  order-lg-2">
              <div className="container">
                <div className="row heading">
                  <div className="col-12 col-md-10">
                    <h3>
                      <b>{data.header}</b>
                    </h3>
                    {date != null ? (
                      <h5>
                        Posted on: {date.slice(8, 10)}-{date.slice(5, 7)}-
                        {date.slice(2, 4)}
                      </h5>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-10">
                    <img src={data.image} className="img-fluid specificArticleimage" />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 col-md-10">
                    <p>{data.textArea}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-12 col-lg-2 order-lg-1"
              style={{ borderRight: `1px solid grey`, paddingRight: "2vw" }}
            >
              <div>
                <div className="row heading">
                  <div className="col-12 col-md-11">
                    <p style={{ color: "grey" }}>
                      <b>Posted by:</b>
                    </p>
                    <img src={profile.dp} className="img-fluid user"/>
                    <Link to={`/users/${owner.id}`}><h3>{owner.username}</h3></Link>
                    <i className="fa fa-envelope fa-lg"></i><p>{owner.email}</p>
                    <p>{profile.bio}</p>
                  </div>
                </div>
              </div>
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

export default SpecificArticle;
