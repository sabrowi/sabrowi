import React from "react";
import data from "../assets/data";
import { Link } from "react-router-dom";

const Portfolios = () => {
  return (
    <>
      <div className="content-title text-center">
        <h1>Portfolios</h1>
      </div>
      <div className="row">
        {data.map((val, idx) => {
          return (
            <div className="col-md-6" key={idx}>
              <div className="card mb-4">
                <div className="thumbnail">
                  <img
                    className="img-fluid"
                    src={require("../assets/images/" + val.images[0])}
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{val.name}</h5>
                  <p className="card-text">{val.description}</p>
                  <Link
                    to={"/portfolio/" + (idx + 1)}
                    className="btn btn-sm btn-primary btn-block"
                  >
                    MORE
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Portfolios;
