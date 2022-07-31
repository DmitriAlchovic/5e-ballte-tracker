import React from 'react';
import { Form } from 'react-bootstrap';
import './SearchBar.css';
import { SearchProps } from '../../interfaces';

const SearchBar: React.FC<SearchProps> = ({ changeHandler, value, lists }) => {
  return (
    <Form.Select
      className="searchBar"
      aria-label="Default select example"
      onChange={(e) => {
        changeHandler(e);
      }}
    >
      <option>{value}</option>
      {lists}
    </Form.Select>
  );
};

export default SearchBar;
