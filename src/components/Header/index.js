import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/user";
import { ROUTERS } from '../../App'
import { withRouter } from "react-router-dom";

class Header extends React.Component {

  exitClick = event => {
    const { delUser } = this.props
    event.preventDefault();
    delUser();
    localStorage.removeItem("authToken")
  }

  renderLi = el => {
    const { location } = this.props;
    return (
      <li key={el.id} className="header__item">
        <Link
          className={
            location.pathname === el.path ? `${el.className} header__link--active` : `${el.className}`
          }
          to={el.path}>
          {el.link.title}
        </Link>
      </li>
    );
  };
  
  render() {
    const { user, location } = this.props
    return (
      <div className="header">
        <nav>
          <ul>
            {ROUTERS.map(el =>
              el.link
                ? user
                  ? el.role && el.role.some(el => el === user.role) && this.renderLi(el)
                  : !el.privateRoute && this.renderLi(el)
                : null
            )}
            {user && <li className="header__item"><Link to="/usercab" className={
              location.pathname === "/usercab" ? "header__link header__link--active" : "header__link"}>{user.login}</Link></li>}
            {user && <li className="header__item"><span className="exit icon-exit" onClick={this.exitClick}></span></li>}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReduser.user,
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(Header));