import React, { Component } from 'react';
import { Search } from '../styled';
import { ReactComponent as ButtonIcon } from 'icons/search.svg';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      alert('Enter image name');
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <Search>
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <ButtonIcon />
          </button>
          <input
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleChange}
            type="text"
            placeholder="Search images and photos"
            className="input"
            autoComplete="off"
            autoFocus
          />
        </form>
      </Search>
    );
  }
}