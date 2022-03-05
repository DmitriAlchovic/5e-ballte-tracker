import React, { useEffect, useState } from "react";
import Service from "../../services/api";
import { Form } from "react-bootstrap";
import "./SearchBar.css";
import {Monster} from "../../interfaces";
import { SearchProps } from "../../interfaces";

const SearchBar: React.FC<SearchProps> = ({ changeHandler, value }) => {
  const [list, setList] = useState<string>();
  const [lists, setLists] = useState();
  let monsters = null;
  useEffect(() => {
    const monstersList = async () => {
      const Arr = await Service.getMonstersList();
      setList(JSON.stringify(Arr));
      monsters = Arr.map((monster: Monster) => {
        return (
          <option key={monster.index} value={monster.index}>
            {monster.name}
          </option>
        );
      });
      setLists(monsters);
    };
    monstersList();
  }, []);
  
  

  return (
    <Form.Select
      value={value}
      className="searchBar"
      aria-label="Default select example"
      onChange={changeHandler}
    >
      <option>{value}</option>
      {lists}
    </Form.Select>
  );
};

export default SearchBar;
