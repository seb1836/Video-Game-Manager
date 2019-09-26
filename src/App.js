import React, { Component, Fragment } from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Pages/Home'
import Details from './Pages/Details'
import NavBar from './Components/Navbar'
import GameList from './GamesData/games.json'
//import editJsonFile from 'edit-json-file'
import tekken from './images/tekken7.png'
import streetfighter from './images/streetfighter5.png'
import warcraft from './images/warcraft3.png'
import starcraft from './images/starcraft2.png'

let imageGame = [tekken, streetfighter,warcraft,starcraft]
let gameTitleStringify = GameList.map(game => {
  let stringifyTitle = JSON.stringify(game.title)
  return stringifyTitle.replace(/"/g, '')
})

//let file = editJsonFile('./GamesData/games.json')

let arrayFiltered = []
//let arrayIndex = []
//let arrayMatch = []
let originalGameArray = GameList

class App extends Component {
  state = { gameArray: GameList, isOnHome: true, isOneEntryBeenRemoved: false, searchString: '' }

  displayer = () => {
    console.log(gameTitleStringify, 'arraytitle------', typeof gameTitleStringify[0], 'type')
  }

  updateDescription = (currentGameId, newDescription) => {
    console.log(currentGameId, 'index----')
    this.setState({
      gameArray: this.state.gameArray.map((game, index) => {
        if (currentGameId === game.id) {
          game.description = newDescription
          return game
        }
        return game
      })
    })
  }

  changeIsOnHomeState = () => {
    this.setState({ isOnHome: !this.state.isOnHome }, () => console.log('called', this.state.isOnHome))
    //  if (this.state.isOneEntryBeenRemoved){
    //   this.setState({ gameArray: arrayFiltered })
    //}else{ this.setState({ gameArray: GameList })}
  }

  deletGame = currentGameId => {
    if (this.state.isOneEntryBeenRemoved === false) {
      this.setState(
        {
          gameArray: GameList.filter((game, index) => currentGameId !== game.id),
          isOneEntryBeenRemoved: true
        },
        () => {
          originalGameArray = this.state.gameArray
        }
      )
      imageGame = imageGame.filter((img, indexImg) => {
        let imgSrcJson = JSON.stringify(GameList[currentGameId].imageSrc)
        imgSrcJson = imgSrcJson.replace(/"/g, '')

        return imgSrcJson !== img
      })
    } else if (this.state.isOneEntryBeenRemoved) {
      this.setState(
        {
          gameArray: this.state.gameArray.filter((game, index) => currentGameId !== game.id),
          isOneEntryBeenRemoved: true
        },
        () => {
          originalGameArray = this.state.gameArray
        }
      )
      imageGame = imageGame.filter((img, indexImg) => {
        let imgSrcJson = JSON.stringify(GameList[currentGameId].imageSrc)
        imgSrcJson = imgSrcJson.replace(/"/g, '')

        return imgSrcJson !== img
      })
    }
  }
  //  arrayMatchFiller = searchWord => {
  //   for (let i = 0; i < gameTitleStringify.length; i++) {
  //     console.log(
  //       gameTitleStringify[i],
  //       'beforecondition',
  //        searchWord,
  //        gameTitleStringify[i].slice(0, searchWord.length)
  //      )
  //     if (searchWord === gameTitleStringify[i].slice(0, searchWord.length)) {
  //       console.log(gameTitleStringify[i], 'Aftercondition')
  //        arrayMatch.push(gameTitleStringify[i].slice(0, searchWord.length))
  //      }
  //   }
  //  }

  checkIfArrayIsEmpty = arrayTreated => {
    if (arrayTreated.length === 0 && this.state.isOneEntryBeenRemoved === false) {
      alert('pass')
      arrayTreated = originalGameArray
      this.setState({ gameArray: GameList })
    } else if (this.state.isOneEntryBeenRemoved && arrayTreated.length === 0) {
      this.setState({ gameArray: originalGameArray })
    }
  }

  searchGame = (e, searchValue) => {
    if (searchValue.length > 0) {
      // this.updateArrayFilterForSearch(searchValue)
      //arrayMatch =arrayMatch.push (gameTitleStringify.forEach(string => { if(searchValue===string){
      // return string.slice(0, searchValue.length)}
      // }))
      arrayFiltered = this.state.gameArray.filter(game => {
        let gameTitleStringify = JSON.stringify(game.title)
        gameTitleStringify = gameTitleStringify.replace(/"/g, '')
        console.log(gameTitleStringify, 'gameTitleStringify')
        const gameTitleToLowerCase = gameTitleStringify.toLowerCase()
        const searchTermToLowerCase = searchValue.toLowerCase()
        return gameTitleToLowerCase.includes(searchTermToLowerCase)
      })

      //imageGame = imageGame.filter(image => image.includes(searchTermToLowerCase)

      //)
    } else if (searchValue === '' && this.state.isOneEntryBeenRemoved) {
      arrayFiltered = originalGameArray.filter(game => {
        let gameTitleStringify = JSON.stringify(game.title)
        gameTitleStringify = gameTitleStringify.replace(/"/g, '')
        console.log(gameTitleStringify, 'gameTitleStringify')
        const gameTitleToLowerCase = gameTitleStringify.toLowerCase()
        const searchTermToLowerCase = searchValue.toLowerCase()
        return gameTitleToLowerCase.includes(searchTermToLowerCase)
      })
    } else {
      arrayFiltered = originalGameArray
    }

    console.log(arrayFiltered, 'aftertreat')
    // this.checkIfArrayIsEmpty(arrayFiltered)
    this.setState({ gameArray: arrayFiltered }, () => this.checkIfArrayIsEmpty(arrayFiltered))
  }

  onSearchChange = e => {
    this.setState({ searchString: e.target.value }, () => this.searchGame(e, this.state.searchString))
  }

  displaySearchBar = () => {
    console.log(window.location.pathname, 'path')
    if (window.location.pathname === '/' || window.location.pathname === '/home') {
      return <input placeholder='Search...' onChange={this.onSearchChange} />
    }
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
            displaySearchBar={this.displaySearchBar()}
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
