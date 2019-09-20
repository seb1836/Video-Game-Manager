import React, { Fragment, Component } from 'react'
import '../App.css'

import { withRouter } from 'react-router-dom'
class Details extends Component {
  state = {
    isButtonEditClick: false,
    description: this.props.location.state.description,
    isDescriptionSaved: false
  }

  displayer = () => {
    console.log(this.props.location.state, 'func')
  }

  handleButtonSaveClick = () => {
    this.setState(
      { isDescriptionSaved: !this.state.isDescriptionSaved },
      () => console.log(this.state.description),
      this.props.updateDescription(this.props.location.state.id, this.state.description)
    )
    if (this.state.isDescriptionSaved) {
      alert('save')
    }
  }

  handleButtonEditClick = () => {
    this.setState({ isButtonEditClick: !this.state.isButtonEditClick })
  }
  onDescriptionChange = e => {
    this.setState({ description: e.target.value })
  }

  renderDescritption = () => {
    if (this.state.isButtonEditClick) {
      return (
        <Fragment>
          <input value={this.state.description} onChange={this.onDescriptionChange} />
          <button onClick={this.handleButtonSaveClick}>save</button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <input value={this.state.description} readOnly />
          <button onClick={this.handleButtonEditClick}>edit</button>
        </Fragment>
      )
    }
  }

  handleButtondeletClick = () => {
    alert('game is delet')
    this.props.deletGame(this.props.location.state.id)
  }
  render() {
    return (
      <Fragment>
        <img className='detailsImg' src={this.props.location.state.image} alt='Game'></img>
        <p>{this.props.location.state.title}</p>
        <button onClick={this.handleButtondeletClick}>deletGame</button>
        {this.renderDescritption()}
        {this.displayer()}
      </Fragment>
    )
  }
}
export default withRouter(Details)
