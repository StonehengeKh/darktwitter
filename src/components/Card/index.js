import React from "react"
import { Link } from "react-router-dom";


function Card(props) {
  return (
    <div className="all-rec-conteiner" key={props.id}>
      <p><Link to={`/recipe/${props.id}`}>{props.title}</Link></p>
      <img alt="img" src={props.file} className="all-rec-img"></img>
    </div>
  )
}


export { Card }