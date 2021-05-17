import React, { useState, useEffect } from "react";
import Header from "./common/Header";
import { tokenConfig } from "../actions/auth";
import { port } from "../actions/port";
import axios from "axios";
import { Link } from "react-router-dom";
import image from "../images/article.jpg";
import Footer from "./common/Footer";
import { Loading } from "./common/Loading";

function Allarticles() {
  const [data, setData] = useState([]);
  const [searched, setSearch] = useState([]);
  const [word, setWord] = useState("");
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async function () {
    // personal articles
    async function getAllArticles() {
      const config = tokenConfig();

      axios
        .get(`${port}/api/articles/`, config)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("An error occured. Try logging in again");
          setLoading(false);
        });
    }
    getAllArticles();
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
  };

  if (err == null  && loading == false) {
    if(data == []) return(
      <div className="backcolor">
      <Header />
      <div>
        <div className="content">
          <h5 style={{ textAlign: "center", justifyContent: "center", color: "grey" }}>Nothing has been posted yet.</h5>
        </div>
      </div>
      <Footer />
    </div>
    )
    else 
    return (
      <div className="backcolor">
        <Header />
        <div className="container heading">
          <div className="row">
            <div className="col-12 col-md-4">
              <h2 className="mainheader">All Articles</h2>
            </div>
            <div className="col-10 col-md-4 offset-md-2">
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
                      <Link to={`articles/${art.id}`}  style={{color:"black", textDecoration:"none"}}>
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
                              <p>{art.textArea.slice(0,140)}...</p>
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
              <Link to={`articles/${art.id}`}  style={{color:"black", textDecoration:"none"}}>
                <div className="container recent">
                  <div className="row">
                    <div className="col-12">
                      <h4>{art.header}</h4>
                      <small style={{ color: "grey" }}>
                        Posted By ~ {art.username} :{" "}
                        {art.createdAt.slice(8, 10)}-{art.createdAt.slice(5, 7)}
                        -{art.createdAt.slice(2, 4)}
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
                      <p >{art.textArea.slice(0,140)}...</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  } else if (loading) {
    return (
      <div className="backcolor">
        <Header />
         <Loading/>
        <Footer />
      </div>
    );
  } 
  else if (err !== null && loading == false) {
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

export default Allarticles;
