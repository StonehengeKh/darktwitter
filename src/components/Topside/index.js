import React from "react";
import { withRouter } from "react-router-dom";
import "./style.css";

class TopSide extends React.Component {

  upperCaseName = str=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { location } = this.props;
    let name = location.pathname.split("/")[1]
    name = !name ? "Home" : name;
    return (
      <div className="top-side-bar">
        <p className="page-name">{this.upperCaseName(name)}</p>
      </div>
    );
  }
}

export default withRouter(TopSide);
