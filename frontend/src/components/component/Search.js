import React from 'react';

import { useDispatch } from 'react-redux';
import { get_search, reset_search } from '../../store/post';

import { Input } from 'semantic-ui-react';

const Search2 = () => {
  const [term, setTerm] = React.useState('');

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault();
    if (term) dispatch(get_search(term));
    else dispatch(reset_search());
  };
  return (
    <form onSubmit={searchHandler} style={{ margin: '0.5rem 0' }}>
      <Input
        fluid
        icon='search'
        placeholder='Search...'
        onChange={({ target }) => setTerm(target.value)}
        value={term}
      />
    </form>
  );
};

export default Search2;
