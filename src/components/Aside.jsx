import React from "react";
import { FaLinkedin, FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import Language from "./Language";

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
          <h3 className="name mb-3">KUKUH SABROWI</h3>
        </Link>
        <p className="bio mb-3">
          Front End Programmer · Mobile & Web Apps Developer · Internet of
          Things{" "}
        </p>
        <ul className="nav social mb-3">
          <li className="nav-link">
            <a
              href="https://www.linkedin.com/in/kukuh-sabrowi-1b8b0b64/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaLinkedin size={25} color="#FFF" />
            </a>
          </li>
          <li className="nav-link">
            <a
              href="https://www.facebook.com/anonyfamous/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaFacebook size={25} color="#FFF" />
            </a>
          </li>
          <li className="nav-link">
            <a
              href="https://github.com/sabrowi"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithub size={25} color="#FFF" />
            </a>
          </li>
          <li className="nav-link">
            <a
              href="mailto:ku2h.sabrowi@gmail.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaEnvelope size={25} color="#FFF" />
            </a>
          </li>
        </ul>
        <Language />
      </div>
    </div>
  );
};

export default Aside;
