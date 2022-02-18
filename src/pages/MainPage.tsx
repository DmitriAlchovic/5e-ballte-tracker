import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Input from "../components/Input/Input";
import InputCard from "../components/TabCard/InputCard/InputCard";
import SearchBar from "../components/SearchBar";
import Service from "../services/api";

const MainPage: React.FC = () => {
  const [numberOf, setNumberOf] = useState({ players: 0, enemies: 0 });
  const [charArray, setCharArray] = useState([
    { name: "otto", initiative: "2", health: "5" },
    { name: "hans", initiative: "3", health: "12" },
  ]);
  const [char, setChar] = useState({ name: "", initiative: "", health: "" });
  const [counter, setCounter] = useState(0);

  console.log(Service.getMonster("zombie"));

  const changeHandlerNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOf({
      ...numberOf,
      [event.target.name]: parseInt(event.target.value),
    });
    console.log(numberOf);
  };

  const changeHandlerChar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChar((char) => {
      return { ...char, [event.target.name]: event.target.value };
    });
    console.log(char, event.target.name, event.target.value);
  };

  const pressHandler = () => {};
  const pressNextHandler = () => {
    const newArray = [...charArray, char];
    setCharArray(newArray);
    setChar({ name: "", initiative: "", health: "" });
    setCounter((counter) => counter + 1);
    console.log(charArray);
  };

  const buttonsDisplay = () => {
    return (
      <React.Fragment>
        {counter ? <Button>Previous</Button> : null}
        {counter + 1 === numberOf.players + numberOf.enemies ? (
          <Button>Done!</Button>
        ) : (
          <Button onClick={pressNextHandler}>Next</Button>
        )}
      </React.Fragment>
    );
  };

  const cardDisplay = () => {
    if (numberOf.players && counter < numberOf.players) {
      return (
        <React.Fragment>
          <InputCard enemy={false} id="0">
            <Input
              inputName="name"
              value={char.name}
              inputType="text"
              changeHandler={changeHandlerChar}
              id="Char"
            />
            <Input
              inputName="initiative"
              value={char.initiative}
              inputType="number"
              changeHandler={changeHandlerChar}
              id="Char"
            />
            <Input
              inputName="health"
              value={char.health}
              inputType="number"
              changeHandler={changeHandlerChar}
              id="Char"
            />
            {buttonsDisplay()}
          </InputCard>
        </React.Fragment>
      );
    } else if (numberOf.enemies)
      return (
        <React.Fragment>
          <InputCard enemy={true} id="0">
            {buttonsDisplay()}
          </InputCard>
        </React.Fragment>
      );
  };

  return (
    <React.Fragment>
      <Input
        inputName="players"
        value={numberOf.players}
        inputType="number"
        changeHandler={changeHandlerNumber}
        id="players"
      />
      <Input
        inputName="enemies"
        value={numberOf.enemies}
        inputType="number"
        changeHandler={changeHandlerNumber}
        id=""
      />
      <SearchBar></SearchBar>
      {cardDisplay()}
    </React.Fragment>
  );
};

export default MainPage;
