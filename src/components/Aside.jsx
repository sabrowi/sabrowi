import React from "react";
import { FaLinkedin, FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <div className="aside">
      <div className="profile">
        <img
          src={require("../assets/images/avatar.jpg")}
          className="avatar"
          alt=""
        />
        <Link to="/">
          <h3 className="name mb-5">KUKUH SABROWI</h3>
        </Link>
        <p className="bio mb-5">
          Front End Programmer · Mobile & Web Apps Developer · Internet of
          Things{" "}
        </p>
        <ul className="nav social">
          <li className="nav-link">
            <a href="https://www.linkedin.com/in/kukuh-sabrowi-1b8b0b64/">
              <FaLinkedin size={25} color="#FFF" />
            </a>
          </li>
          <li className="nav-link">
            <a href="https://www.facebook.com/anonyfamous/" target="_blank">
              <FaFacebook size={25} color="#FFF" />
            </a>
          </li>
          <li className="nav-link">
            <a href="https://github.com/sabrowi">
              <FaGithub size={25} color="#FFF" />
            </a>
          </li>
          <li className="nav-link">
            <a href="mailto:ku2h.sabrowi@gmail.com">
              <FaEnvelope size={25} color="#FFF" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
