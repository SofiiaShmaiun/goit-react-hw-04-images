import React, { useState } from 'react';
import { Search } from '../styled';
import { ReactComponent as ButtonIcon } from 'icons/search.svg';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      alert('Enter image name');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <Search>
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <ButtonIcon />
        </button>
        <input
          name="imageName"
          value={query}
          onChange={handleChange}
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


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};