import React, { Fragment,Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
class Navbar extends Component {
  state= {
    searchString:""
  }

  onSearchChange = e => {
   this.setState({searchString:e.target.value},() => this.props.searchGame(e,this.state.searchString))
 
   
  }
displaySearchBar = () => {
  console.log(this.props)
     if (this.props.pathname === "/" || this.props.pathname === "/home"){
     return <input placeholder= "Search..." onChange={this.onSearchChange}/>
   }
  }

render(){
  return (
    <Fragment>
      <nav>
        <Link to={{pathname:'/'}}>
          <h1 onClick={this.props.isOnHome} >Home</h1>
        </Link>
        {this.props.displaySearchBar}
      </nav>
    </Fragment>
  )
}
}
export default Navbar
