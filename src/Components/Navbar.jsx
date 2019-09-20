import React, { Fragment,Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
class Navbar extends Component {
  state= {
    searchString:""
  }

  onSearchChange = e => {
   this.setState({searchString:e.target.value},() => this.props.searchGame(this.state.searchString))
 
   
  }
displaySearchBar = () => {
     if (this.props.isOnHomeForNav){
     return <input placeholder= "Search..." onChange={this.onSearchChange}/>
   }
  }

render(){
  return (
    <Fragment>
      <nav>
        <Link to='/'>
          <h1 onClick={this.props.isOnHome} >Home</h1>
        </Link>
        {this.displaySearchBar()}
      </nav>
    </Fragment>
  )
}
}
export default Navbar
