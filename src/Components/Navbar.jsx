import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
class Navbar extends Component {
  state = {
    searchString: '',
    onHome: true
  }

  onSearchChange = e => {
    this.setState({ searchString: e.target.value }, () => this.props.searchGame(e, this.state.searchString))
  }

  componentDidMount() {
    window.addEventListener('popstate', console.log('BAAACK'))
  }
  displaySearchBar = () => {
    console.log(
      window.location.href,
      window.location.origin,
      window.location.href === window.location.origin + '/',
      'compare'
    )
    if (this.props.isOnHome) {
      console.log('pass')
      return <input placeholder='Search...' onChange={this.onSearchChange} />
    }
  }

  render() {
    return (
      <Fragment>
        {console.log(window.location.pathname, 'search')}
        <nav>
          <Link to={{ pathname: '/' }}>
            <h1 onClick={this.props.isOnHomeChangeState}>Home</h1>
          </Link>
          {this.displaySearchBar()}
          <h1 className="title">Video-Game-Manager</h1>
        </nav>
      </Fragment>
    )
  }
}
export default Navbar
