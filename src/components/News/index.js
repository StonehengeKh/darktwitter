import React from 'react';
import { connect } from "react-redux";
import './style.css'

class News extends React.Component {

  render() {
    return (
      <div>
          News
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(News);

