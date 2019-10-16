import React from "react";
import { withRouter } from "react-router-dom";
import "./style.css";

class Aside extends React.Component {

  upperCaseName = str=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const { location } = this.props;
    let name = location.pathname.split("/")[1]
    name = !name ? "Home" : name;
    return (
      <div className="left-side-bar">
        {this.upperCaseName(name)}
      </div>
    );
  }
}

export default withRouter(Aside);
