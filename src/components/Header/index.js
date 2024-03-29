import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { delUser } from "../../actions/user";
import { ROUTERS } from "../../App";
import { withRouter } from "react-router-dom";
import { url } from "../../actions/user";
import kartinka from "../../assets/img/smile.jpg";
import { Logo } from "../../containers/Auth";

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
          <span className={el.icon} />
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
            <li className="header__item">
              <Logo />
            </li>
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
                  <Link to="/user_cabinet" className="header__link">
                    <img
                      src={url + user.avatar.url}
                      className="avatar-img"
                      alt="avatar"
                    />
                  </Link>
                </li>
              ) : (
                <li className="header__item">
                  <Link className="header__link" to="/user_cabinet">
                    <img src={kartinka} className="avatar-img" alt="avatar" />
                  </Link>
                </li>
              )
            ) : null}
            {localStorage.authToken && user && (
              <li className="header__item">
                <span className="header__link" onClick={this.exitClick}>
                  <span className="exit icon-exit"></span>
                  <span className="header__span-text">Log out</span>
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer }) => {
  return {
    user: userReducer.user
  };
};

export default connect(
  mapStateToProps,
  { delUser }
)(withRouter(Header));
