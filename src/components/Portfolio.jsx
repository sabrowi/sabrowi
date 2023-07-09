import React, { useEffect, useState } from "react";
import datas from "../assets/data";
import { SRLWrapper } from "simple-react-lightbox";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Portfolio = ({ match }) => {
  const [data, setData] = useState(datas[match.params.id - 1]);
  const { t } = useTranslation();
  useEffect(() => {
    // console.log("mounted", match.params.id, datas[match.params.id]);
    // setData(datas[match.params.id - 1]);
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="content-title text-center">
        <h1>{data.name}</h1>
      </div>
      <p>{t("description", { returnObjects: true })[match.params.id - 1]}</p>
      <p>
        {t("stack")} : {data.stack}
      </p>
      <Link to="/" className="btn btn-sm  btn-primary">
        {t("back")}
      </Link>{" "}
      {data.link ? (
        <a
          href={data.link}
          className="btn-sm btn btn-primary"
          rel="noopener noreferrer"
          target="_blank"
        >
          {data.linkname}
        </a>
      ) : null}
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
