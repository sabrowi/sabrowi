import React from "react";
import { Route, Switch } from "react-router-dom";
import Portfolios from "./Portfolios";
import Portfolio from "./Portfolio";
import withPageView from "../withPageView";

const Content = () => {
  return (
    <div className="content">
      <div className="content-body">
        <Switch>
          <Route path="/portfolio/:id" component={withPageView(Portfolio)} />
          <Route path="/" component={withPageView(Portfolios)} />
        </Switch>
      </div>
    </div>
  );
};

export default Content;
