import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/smile.jpg";
import { url } from "../../actions/user";

export const formatDate = date => {
  if (date.indexOf(".") !== -1) return date;
  var mass = date.split("/");
  return [mass[1], mass[0], mass[2]].join(".");
};

function Card(props) {
  return (
    <div className="all-post-conteiner" key={props.id}>
      <div className="avatar-conteiner">
        {props.avatar ? (
          <img
            src={url + props.avatar.url}
            className="avatar-posts"
            alt="avatar"
          />
        ) : (
          <img src={avatar} className="avatar-posts" alt="avatar" />
        )}
      </div>
      <div>
        <div className="nick-posts">
          {props.nick || props.login}
          <span className="createdAt-posts">
            {formatDate( new Date(+props.createdAt).toLocaleDateString())}
          </span>
        </div>
        {props.title ? (
          <div className="title">
            <Link to={`/post/${props.id}`}> {props.title} </Link>
          </div>
        ) : (
          <div>
            <Link to={`/post/${props.id}`}> Title </Link>
          </div>
        )}
        {props.text ? <div>{props.text}</div> : null}
        {props.images ? (
          <div>
            {" "}
            {props.images.map(image => {
              return (
                <img
                  key={image._id}
                  alt="img"
                  src={`http://hipstagram.asmer.fs.a-level.com.ua/${image.url}`}
                  className="all-post-img"
                ></img>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export { Card };
