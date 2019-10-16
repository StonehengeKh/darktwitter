import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { ROUTERS } from "../../App";
import { withRouter } from "react-router-dom";
import { url } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg";

class Header extends React.Component {
  exitClick = event => {
    const { delUser } = this.props;
    event.preventDefault();
    delUser();
    localStorage.removeItem("authToken");
  };

  renderLi = el => {
    const { location } = this.props;
    return (
      <li key={el.id} className="header__item">
        <Link
          className={
            location.pathname === el.path
              ? `${el.className} header__link--active`
              : `${el.className}`
          }
          to={el.path}
        >
          <span className={el.icon}/>
          <span className="header__span-text">{el.link.title}</span>
        </Link>
      </li>
    );
  };

  render() {
    const { user } = this.props;
    return (
      <div className="header">
        <nav className="nav-menu">
          <ul className="nav-menu-ul">
            {ROUTERS.map(el =>
              el.link
                ? localStorage.authToken && user
                  ? el.role &&
                    el.role.some(el => el === user.role) &&
                    this.renderLi(el)
                  : !el.privateRoute && this.renderLi(el)
                : null
            )}
            {localStorage.authToken && user ? (
              user.avatar ? (
                <li className="header__item">
                  <Link to="/usercab">
                    <img
                      src={url + user.avatar.url}
                      className="avatar-img"
                      alt="avatar"
                    />
                  </Link>
                </li>
              ) : (
                <li className="header__item">
                  <Link to="/usercab">
                    <img src={kartinka} className="avatar-img" alt="avatar" />
                  </Link>
                </li>
              )
            ) : null}
            {/* {localStorage.authToken && user && (
              <li className="header__item">
                <Link
                  to="/usercab"
                  className={
                    location.pathname === "/usercab"
                      ? "header__link header__link--active"
                      : "header__link"
                  }
                >
                  {user.nick || user.login}
                </Link>
              </li>
            )} */}
            {localStorage.authToken && user && (
              <li className="header__item">
                <span
                  className="exit icon-exit"
                  onClick={this.exitClick}
                ></span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReduser.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Header));
