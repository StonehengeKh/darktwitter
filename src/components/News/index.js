import React from 'react';
import { connect } from "react-redux";
import {getPost} from '../../actions/user'
import './style.css'

class News extends React.Component {


  clicker =()=>{
    const {getPost} = this.props
    getPost()
  }

  render() {
    return (
      <div>
          <button onClick={this.clicker}>Click</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  };
};

export default connect(mapStateToProps, {getPost})(News);

