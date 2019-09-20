import React, { Fragment, Component } from 'react'
import '../App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import GameList from '../GamesData/games.json'
import GameCard from '../Components/GameCard'
import tekken from '../images/Tekken7.png'
import streetFighter from  '../images/SF5.png'


const imageGame=[tekken,streetFighter]

class Home extends Component {
state = {gameArray :GameList}

updateDescription = (currentGameIndex,newDescription) => {
this.setState({gameArray: this.state.gameArray.map((game,index) =>{if(currentGameIndex===index){ game.description =newDescription; return game }else{return game}})}
)
}


  renderGameCard = () => {
console.log(this.props.gameArray)
    return this.props.gameArray.map((Game,index) =>{
return <GameCard  id={Game.id} title={Game.title} description={Game.description} image={this.props.imageGame[index]} isOnHome={this.props.isOnHome}></GameCard>
  })}

  render() {
    return <Fragment>{this.renderGameCard()}</Fragment>
  }
}
export default Home
