import React, { useState } from "react";
import cx from "classnames";
import { useTranslation } from "react-i18next";

const langSaved = localStorage.getItem("lang");

const Language = () => {
  const [active, setActive] = useState(langSaved === null ? "en" : langSaved);
  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    setActive(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="language">
      <a
        href="javascript:void(0)"
        className={cx({ active: active === "en" })}
        onClick={() => changeLanguage("en")}
      >
        EN
      </a>{" "}
      |{" "}
      <a
        href="javascript:void(0)"
        className={cx({ active: active === "id" })}
        onClick={() => changeLanguage("id")}
      >
        ID
      </a>
    </div>
  );
};

export default Language;
