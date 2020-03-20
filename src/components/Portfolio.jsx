import React, { useEffect, useState } from "react";
import datas from "../assets/data";
import { SRLWrapper } from "simple-react-lightbox";

const Portfolio = ({ match }) => {
  const [data, setData] = useState(datas[match.params.id]);
  useEffect(() => {
    console.log("mounted", match.params.id, datas[match.params.id]);
    setData(datas[match.params.id]);
  }, []);
  return (
    <>
      <div className="content-title text-center">
        <h1>{data.name}</h1>
      </div>
      <p>{data.description}</p>
      <p>Technology stack : {data.stack}</p>
      <SRLWrapper>
        <div className="container portfolio">
          <div className="row">
            {data.images.map((val, idx) => {
              return (
                <div className="col-md-4 col-12 col-img-small">
                  <img
                    key={idx}
                    className="img-thumbnail"
                    src={require("../assets/images/" + val)}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </SRLWrapper>
    </>
  );
};

export default Portfolio;
