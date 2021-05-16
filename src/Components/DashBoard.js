import React, { useState, useEffect } from "react";
import Header from "./common/Header";
import { tokenConfig } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardImg, Card, CardBody, CardHeader } from "reactstrap";
import image from "../images/article.jpg";
import Footer from "./common/Footer";


// delete article
async function deleteArticle (id){

  const config = tokenConfig();
  
  axios.delete(`${port}/api/personal/${id}/`,config)
  .then(res=>{
      console.log("success");
  })
  .catch(err=>{
      console.log("failed");
  });
  
}


function DashBoard() {
  const [data, setData] = useState([]);
  const [personalData, setPersonal] = useState([]);
  const [searched, setSearch] = useState([]);
  const [word, setWord] = useState("");
  const [err, setError] = useState(null);

  useEffect(function () {
    // recent articles
    async function getRecentArticles() {
      const config = tokenConfig();

      axios
        .get(`${port}/api/recent/`, config)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          setError("An error occured. Try logging in again");
        });
    }

    async function getPersonalArticles() {
      const config = tokenConfig();

      axios
        .get(`${port}/api/personal/`, config)
        .then((res) => {
          setPersonal(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getRecentArticles();
    getPersonalArticles();
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
        let found = re.exec(element.header);
        return found ? true : false;
      })
    );
    console.log(data);
  };

  if (err == null) {
    return (
      <div className="backcolor">
        <Header />
        <div className="row">
          <div className="col-12 col-lg-7 offset-lg-1 order-lg-2">
            <div className="container heading">
              <div className="row">
                <div className="col-12 col-md-4">
                  <h2 className="mainheader">Recently Posted</h2>
                </div>
                <div className="col-10 col-md-5 offset-md-1">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="search for an article"
                        className="form-control"
                        onChange={(e) => setWord(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-1 col-md-1">
                  <i
                    className="fa fa-search fa-lg"
                    onClick={() => search(word)}
                  ></i>
                </div>
              </div>
              <div>
                {searched.length > 0 ? (
                  <div className="row searchHeading">
                    <div className="col-12">
                      <h3 className="mainheader">Search Results</h3>
                      {searched.map((art) => (
                        <div className="row">
                          <Link
                            to={`articles/${art.id}`}
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            <div className="container recent">
                              <div className="row">
                                <div className="col-12">
                                  <h4>{art.header}</h4>
                                  <small style={{ color: "grey" }}>
                                    Posted By ~ {art.username} :{" "}
                                    {art.createdAt.slice(8, 10)}-
                                    {art.createdAt.slice(5, 7)}-
                                    {art.createdAt.slice(2, 4)}
                                  </small>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-12 col-md-5">
                                  <img
                                    className="img-fluid articleimage"
                                    src={art.image ?? image}
                                  />
                                </div>
                                <div className="col-12 col-md-7">
                                  <p>{art.textArea.slice(0, 140)}...</p>
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
              {data.map((art) => (
                <div className="row">
                  <Link
                    to={`/articles/${art.id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <div className="container recent">
                      <div className="row">
                        <div className="col-12">
                          <h4>{art.header}</h4>
                          <small style={{ color: "grey" }}>
                            Posted By ~ {art.username} :{" "}
                            {art.createdAt.slice(8, 10)}-
                            {art.createdAt.slice(5, 7)}-
                            {art.createdAt.slice(2, 4)}
                          </small>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-5">
                          <img
                            className="img-fluid articleimage"
                            src={art.image ?? image}
                          />
                        </div>
                        <div className="col-12 col-md-7">
                          <p>{art.textArea.slice(0, 140)}...</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-3 posted order-lg-1">
            <h2
              style={{
                color: "white",
                borderBottom: "1px solid",
                marginLeft: "3vw",
              }}
            >
              Posted by you
            </h2>
            <ul className="all">
              {personalData.map((art) => (
                <Link
                  to={`/articles/${art.id}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <Card className="articles" key={art.id}>
                    <CardHeader>
                      <div className="row">
                        <div className="col-10">
                          <h5>{art.header}</h5>
                          <p>
                            Posted on: {art.createdAt.slice(8, 10)}-
                            {art.createdAt.slice(5, 7)}-
                            {art.createdAt.slice(2, 4)}
                          </p>
                        </div>
                        <div className="col-1">
                          <Link to={`/personal/${art.id}`} style={{color:"white"}}><i className="fa fa-edit fa-lg"></i></Link>
                        </div>
                        <div className="col-1">
                         <i className="fa fa-trash fa-lg" onClick={()=>deleteArticle(art.id)}></i>
                        </div>
                      </div>
                    </CardHeader>
                    <CardImg src={art.image} />
                    <CardBody>{art.textArea.slice(0, 140)}...</CardBody>
                  </Card>
                </Link>
              ))}
            </ul>
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

export default DashBoard;
