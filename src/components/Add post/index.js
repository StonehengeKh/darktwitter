import React from "react";
import { connect } from "react-redux";
import "./style.css";

class AddRecipes extends React.Component {
  render() {
    return <div>Add new post</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(AddRecipes);
