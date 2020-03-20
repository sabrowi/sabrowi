import React from "react";
import { Route, Switch } from "react-router-dom";
import Portfolios from "./Portfolios";
import Portfolio from "./Portfolio";

const Content = () => {
  return (
    <div className="content">
      <div className="content-body">
        <Switch>
          <Route path="/portfolio/:id" component={Portfolio} />
          <Route path="/" component={Portfolios} />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
