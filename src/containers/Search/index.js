import React from 'react';
import { connect } from "react-redux";
import './style.css'

class Search extends React.Component {



  render() {
    return (
      <div className="search-block">
          <h3>Search</h3>
          <input

          />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps)(Search);