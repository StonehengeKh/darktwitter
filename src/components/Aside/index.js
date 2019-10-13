import React from "react";
import "./style.css";

class Aside extends React.Component {
  render() {
    const { children, loadFetching, loadUserFetching } = this.props;
    return (
      <div className="left-side-bar">
        <nav className="aside-nav">
          <ul className="menu">
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Aside;
