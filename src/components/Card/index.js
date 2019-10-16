import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return (
    <div className="all-post-conteiner" key={props.id}>
      {props.title ? (
        <p>
          <Link to={`/post/${props.id}`}> {props.title} </Link>
        </p>
      ) : (
        <p>
          <Link to={`/post/${props.id}`}> Title </Link>
        </p>
      )}
      {props.text ? <p>{props.text}</p> : null}
      {props.images
        ? props.images.map(image => {
            return (
              <img
                key={image._id}
                alt="img"
                src={`http://hipstagram.asmer.fs.a-level.com.ua/${image.url}`}
                className="all-post-img"
              ></img>
            );
          })
        : null}
    </div>
  );
}

export { Card };
