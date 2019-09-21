import React, { Component } from "react";
import { connect } from "react-redux";

class Admin extends Component {

  render() {
    return (
      <div>
        <p>	Hello Admin</p>
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {
    
  };
};

export default connect(mapStateToProps)(Admin);