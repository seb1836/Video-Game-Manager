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
let gameTitleStringify = GameList.map(game => {
  let stringifyTitle = JSON.stringify(game.title)
  return stringifyTitle.replace(/"/g, '')
})

let file = editJsonFile('./GamesData/games.json')

let arrayFiltered = []
let arrayIndex = []
let arrayMatch =[]

class App extends Component {
  state = { gameArray: GameList, isOnHome: true }

  displayer = () => {
    console.log(gameTitleStringify, 'arraytitle------', typeof (gameTitleStringify[0], 'type'))
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

  changeIsOnHomeState = () => {
    this.setState({ isOnHome: !this.state.isOnHome }, () => console.log('called', this.state.isOnHome))
  }

  deletGame = currentGameId => {
    this.setState({ gameArray: this.state.gameArray.filter((game, index) => currentGameId !== game.id) })
    imageGame = imageGame.filter((img, indexImg) => {
      let imgSrcJson = JSON.stringify(GameList[currentGameId].imageSrc)
      imgSrcJson = imgSrcJson.replace(/"/g, '')

      return imgSrcJson !== img
    })
  }

arrayMatchFiller =(searchWord) =>{
for(let i=0; i<gameTitleStringify.length;i++){
  console.log(gameTitleStringify[i],"beforecondition",searchWord,gameTitleStringify[i].slice(0,searchWord.length))
  if(searchWord===gameTitleStringify[i].slice(0,searchWord.length)){
    console.log(gameTitleStringify[i],"Aftercondition")
    arrayMatch.push(gameTitleStringify[i].slice(0,searchWord.length));
  }
}
}

  searchGame = searchValue => {
    if (searchValue.length > 0) {
       //arrayMatch =arrayMatch.push (gameTitleStringify.forEach(string => { if(searchValue===string){
       // return string.slice(0, searchValue.length)}
     // }))
     this.arrayMatchFiller(searchValue)
      console.log("arrayMatch",arrayMatch)
      arrayIndex = arrayIndex.push(arrayMatch.forEach((element, index) => {
        if (searchValue === element) {
          return index
          
        }
      }))
      
      arrayFiltered = this.state.gameArray.filter((game, index) => {
        let stringifyId = JSON.stringify(game.id)
        return stringifyId !== arrayIndex[index]
      })
    }
    this.setState({gameArray:arrayFiltered})
  }

  render() {
    return (
      <Fragment>
        {this.displayer()}
        <Router>
          <NavBar
            isOnHomeForNav={this.state.isOnHome}
            isOnHome={this.changeIsOnHomeState}
            searchGame={this.searchGame}
          ></NavBar>
          <Route
            path='/'
            exact
            render={props => (
              <Home gameArray={this.state.gameArray} imageGame={imageGame} isOnHome={this.changeIsOnHomeState}></Home>
            )}
          />
          <Route
            path='/Details'
            render={props => (
              <Details
                updateDescription={this.updateDescription}
                deletGame={this.deletGame}
                isOnHome={this.changeIsOnHomeState}
              ></Details>
            )}
          />
        </Router>
      </Fragment>
    )
  }
}
export default App
