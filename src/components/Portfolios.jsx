import React from "react";
import data from "../assets/data";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Portfolios = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="content-title text-center">
        <h1>{t("portfolio")}</h1>
      </div>
      <div className="row">
        {data.map((val, idx) => {
          return (
            <div className="col-xl-4 col-md-6 col-sm-12" key={idx}>
              <div className="card mb-4">
                <img
                  className="img-fluid"
                  src={require("../assets/images/" + val.images[0])}
                  alt={val.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{val.name}</h5>
                  <p className="card-text">
                    {t("description", { returnObjects: true })[idx].substr(
                      0,
                      60
                    ) + "..."}
                  </p>
                  <Link
                    to={"/portfolio/" + (idx + 1)}
                    className="btn btn-sm btn-primary btn-block"
                  >
                    {t("more")}...
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
