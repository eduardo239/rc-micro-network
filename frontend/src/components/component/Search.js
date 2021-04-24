import React from 'react';

import { useDispatch } from 'react-redux';

import { ReactComponent as SearchIcon } from '../../assets/ico/white/carbon_search.svg';
import { get_search } from '../../store/post';

import styles from '../css/Search.module.css';

const Search = () => {
  const [term, setTerm] = React.useState('');

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    if (term) dispatch(get_search(term));
    else alert('Empty content.');
  };
  return (
    <form onSubmit={searchHandler} className={styles.Search}>
      <input
        type='text'
        value={term}
        placeholder='New Post here ..'
        onChange={({ target }) => setTerm(target.value)}
      />
      <button type='submit' className='App-link'>
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
