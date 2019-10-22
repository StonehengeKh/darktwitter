import React, { Component } from "react";
import { connect } from "react-redux";

import Preloader from "../../components/Preloader";

class Admin extends Component {
  render() {
    return (
      <div>
        <Preloader />
        <p> Hello Admin</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Admin);
