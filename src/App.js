import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import Content from "./components/Content";
import Aside from "./components/Aside";
import { BrowserRouter as Router } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";

class App extends React.Component {
  render() {
    return (
      <Router>
        <SimpleReactLightbox>
          <Aside />
          <Content />
        </SimpleReactLightbox>
      </Router>
    );
  }
}

export default App;
