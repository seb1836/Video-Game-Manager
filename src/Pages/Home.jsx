import React, { Fragment, Component } from 'react'
import '../App.css'
//import { BrowserRouter as Router, Route } from 'react-router-dom'
import GameList from '../GamesData/games.json'
import GameCard from '../Components/GameCard'
//import tekken from '../images/tekken7.png'
//import streetFighter from  '../images/streetfighter5.png'

//const imageGame=[tekken,streetFighter]

let arrayLine = []
class Home extends Component {
  state = { gameArray: GameList }

  componentDidMount() {
    this.props.isOnHome()
  }
  renderGameCard = () => {
    console.log(this.props.gameArray, 'game Array')

    return this.props.gameArray.map((Game, index, array) => {
      console.log(
        this.props.imageGame[index],
        'current img',
        this.props.gameArray[index],
        'index',
        index,
        this.props.gameArray.length
      )
      let imagePathstr = JSON.stringify(Game.imageSrc)
      let imagePath = imagePathstr.replace(/"/g, '')

      // if(index===this.props.gameArray.length-1)

      // {

      //   alert('pass')

      // if (index % 2) {
      //   return (
          
      //       <div className='gameCardLine'>
              
      //         <GameCard
      //           key={Game.id}
      //           id={Game.id}
      //           title={Game.title}
      //           description={Game.description}
      //           image={imagePath}
      //           isOnHome={this.props.isOnHome}
      //         ></GameCard>
      //       </div>
            
            
          
      //   )
      // }
      return (
        
        <div className={`gameCardLine${index+1}`}>
          
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
      //  }

      // if (index % 2) {
      //   console.log(index, 'before')
      //   index--
      //   console.log(index, 'after')
      // } else {
      //   return (
      //     <div className='gameCardLine'>
      //       <GameCard
      //         key={Game.id}
      //         id={Game.id}
      //         title={Game.title}
      //         description={Game.description}
      //         image={imagePath}
      //         isOnHome={this.props.isOnHome}
      //       ></GameCard>
      //       <GameCard
      //         key={array[Game.id + 1].id}
      //         id={array[Game.id + 1].id}
      //         title={array[Game.id + 1].title}
      //         description={array[Game.id + 1].description}
      //         image={array[Game.id + 1].imageSrc}
      //         isOnHome={this.props.isOnHome}
      //       ></GameCard>
      //     </div>
      //   )
      // }
    })
  }
  renderImagesContainer = () => {
    if (this.props.gameArray.length===1){
      return(<div className="imagesContainer solo">{this.renderGameCard()}</div>)
    }else if (this.props.gameArray.length<4){
      return(<div className="imagesContainer NotFull">{this.renderGameCard()}</div>)
    }
    return (
      <div className="imagesContainer">{this.renderGameCard()}</div>)
  }
  render() {
    return(<div> {this.renderImagesContainer()}</div>
    
    )}
}
export default Home
