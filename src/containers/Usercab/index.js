import React, { Component } from "react";
import { connect } from "react-redux";
import "./style.css";
import * as actions from "../../actions/user";
import Dropzone from "react-dropzone";

const imageMaxSize = 1024 * 1024;

class UserCab extends Component {
  state = { nick: "" };

  nickChange = e => this.setState({ nick: e.target.value });
  clear = () => this.setState({ nick: "" });
  send = () => {
    const { user, UserUpsertNick } = this.props;
    UserUpsertNick(user.id, this.state.nick);
    this.clear();
  };
  handleOnDrop = async (files, rejectedFile) => {
    const { UserUpsertAvatar, user } = this.props;
    // console.log("file rejected", rejectedFile);
    if (files && files.length > 0) {
      const data = new FormData();
      data.append("photo", files[0], "photo");

      let res = await (await fetch("/upload", {
        method: "POST",
        headers: localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {},
        body: data
      })).text();
      let avatar = JSON.parse(res);
      if (avatar._id) {
        UserUpsertAvatar(user.id, avatar._id);
      }
    }
  };

  render() {
    const { nick } = this.state;
    const { user, upsertFetching } = this.props;
    return (
      <div>
        {upsertFetching ? (
          <div>Loading...</div>
        ) : (
          <>
            {user.nick ? <span>Change nick</span> : <span>Add nick</span>}
            <input
              name="nick"
              type="text"
              value={nick}
              onChange={this.nickChange}
            />{" "}
            <button onClick={this.send}>Go!</button>
          </>
        )}
        <Dropzone
          onDrop={this.handleOnDrop}
          maxSize={imageMaxSize}
          multiple={false}
          accept="image/*"
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()} className="drop_div">
                {/* <input {...getInputProps()} /> */}
                <p>Drop image here</p>
                <p>Max size 1Mb</p>
              </div>
            </section>
          )}
        </Dropzone>
        {/* <img src="http://hipstagram.asmer.fs.a-level.com.ua/images/a05e9310478fe38ec8d3824d0a41f581"/> */}
      </div>
    );
  }
}

const mapStateToProps = ({ userReduser }) => {
  return {
    user: userReduser.user,
    upsertFetching: userReduser.upsertFetching
  };
};

export default connect(
  mapStateToProps,
  actions
)(UserCab);
