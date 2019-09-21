import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../Modal";
import "./style.css";

class Post extends Component {


  render() {
    const { recipes, isFetching } = this.props;
    const rec = recipes.find(x => x.id === +this.props.match.params.id);

    return (
      <div>
          Post
      </div >
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps)(Post);
