import React, { Component, Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Details from './Pages/Details'
import NavBar from './Components/Navbar'
import GameList from './GamesData/games.json'
import editJsonFile from 'edit-json-file'
import tekken from './images/Tekken7.png'
import streetFighter from './images/SF5.png'

let imageGame = [tekken, streetFighter]
let gameTitleStringify=GameList.map((game) =>{
  let stringifyTitle=JSON.stringify(game.title)
  return stringifyTitle.replace(/"/g, '')
})

let file = editJsonFile('./GamesData/games.json')

let arrayFiltered = []
    let arrayIndex = []

class App extends Component {
  state = { gameArray: GameList, isOnHome:true }

  displayer = () => {
    console.log(gameTitleStringify,"arraytitle------",typeof(gameTitleStringify[0],"type"))
  }

  updateDescription = (currentGameId, newDescription) => {
    console.log(currentGameId, 'index----')
    this.setState({
      gameArray: this.state.gameArray.map((game, index) => {
        if (currentGameId === index) {
          game.description = newDescription
          return game
        } else {
          return game
        }
      })
    })
  }

  changeIsOnHomeState =() =>{
    
    this.setState({isOnHome:!this.state.isOnHome},()=>console.log("called",this.state.isOnHome))
  }

  deletGame = currentGameId => {
    this.setState({ gameArray: this.state.gameArray.filter((game, index) => currentGameId !== game.id) })
    imageGame = imageGame.filter((img, indexImg) => {
      let imgSrcJson = JSON.stringify(GameList[currentGameId].imageSrc)
      imgSrcJson = imgSrcJson.replace(/"/g, '')

      return imgSrcJson !== img
    })
  }

  searchGame =(searchValue) =>{
    let arrayMatch= gameTitleStringify.map((string)=>{ return string.slice(0,searchValue.length) })
    arrayMatch.forEach((element,index) => {
      if(searchValue === arrayMatch[index]){
        
      }
    });
     arrayIndex = []
    console.log("myarraystr",arrayMatch)
    if(searchValue.length>0){
    //this.setState({gameArray:this.state.gameArray.map((game,index)=>{
      if(searchValue === arrayMatch[index]){
          return game
      }
return 'q'
    })},() => console.log(this.state.gameArray,"gamearrayfetr"))

  }
  
  }

  render() {
    return (
      <Fragment>
        {this.displayer()}
        <Router>
          <NavBar isOnHomeForNav={this.state.isOnHome} isOnHome={this.changeIsOnHomeState} searchGame={this.searchGame}></NavBar>
          <Route
            path='/'
            exact
            render={props => <Home gameArray={this.state.gameArray} imageGame={imageGame} isOnHome={this.changeIsOnHomeState}></Home>}
          />
          <Route
            path='/Details'
            render={props => <Details updateDescription={this.updateDescription} deletGame={this.deletGame} isOnHome={this.changeIsOnHomeState}></Details>}
          />
        </Router>
      </Fragment>
    )
  }
}
export default App
