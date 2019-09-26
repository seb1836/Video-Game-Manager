import React, { Fragment, Component } from 'react'
import '../App.css'
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import GameList from '../GamesData/games.json'
import GameCard from '../Components/GameCard'
//import tekken from '../images/tekken7.png'
//import streetFighter from  '../images/streetfighter5.png'

//const imageGame=[tekken,streetFighter]

class Home extends Component {
  state = { gameArray: GameList }

  renderGameCard = () => {
    console.log(this.props.gameArray)

    return this.props.gameArray.map((Game, index) => {
         console.log(this.props.imageGame[index],"current img",this.props.gameArray[index])
      let imagePathstr = JSON.stringify(Game.imageSrc)
      let imagePath = imagePathstr.replace(/"/g, '')
      return (
        <div className="gameCardLine">
        <GameCard
          key={Game.id}
          id={Game.id}
          title={Game.title}
          description={Game.description}
          image={imagePath}
          isOnHome={this.props.isOnHome}
        ></GameCard>
        <GameCard
          key={Game.id}
          id={Game.id}
          title={Game.title}
          description={Game.description}
          image={imagePath}
          isOnHome={this.props.isOnHome}
        ></GameCard>
        </div>
      )
    })
  }

  render() {
    return <Fragment>{this.renderGameCard()}</Fragment>
  }
}
export default Home
