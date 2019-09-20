import React, { Fragment } from 'react'
import '../App.css'

import { Link } from 'react-router-dom'

const GameCard = props => {

const  displayer =() => {
    console.log(props.updateDescription,"func")
  }

 const handleButtonDetailsClick =() => {
   props.isOnHome()
 }
  return (
    <Fragment>
      {displayer()}
      <img className="GameCardImg" alt="game" src={props.image}/>
      <p className="GameCardTitle">{props.title}</p>
        
      <Link
        to={{
          pathname: '/Details',
          state: {
           image:props.image,
            id: props.id,
            title: props.title,
            description: props.description,
            
          }
        }}
      >
        <button onClick={handleButtonDetailsClick}>Details</button>
      </Link>
    </Fragment>
  )
}

export default GameCard
