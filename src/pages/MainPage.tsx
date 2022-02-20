import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Input from "../components/Input/Input";
import InputCard from "../components/TabCard/InputCard/InputCard";
import SearchBar from "../components/SearchBar";
import Service from "../services/api";
import {Character} from "../interfaces"

const MainPage: React.FC = () => {
  const [numberOf, setNumberOf] = useState({ players: 0, enemies: 0 });
  const [charArray, setCharArray] = useState([
    { name: "otto", initiative: "2", health: "5" },
    { name: "hans", initiative: "3", health: "12" },
  ]);
  const [char, setChar] = useState({ name: "", initiative: "", health: "" });
  const [moster, setMoster] = useState("");
  const [counter, setCounter] = useState(0);

  console.log(Service.getMonster("zombie"));

  const changeHandlerNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOf({
      ...numberOf,
      [event.target.name]: parseInt(event.target.value),
    });
      
  };

  const changeHandlerChar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChar((char) => {
      return { ...char, [event.target.name]: event.target.value };
    });
  };

  const pressNextHandler = () => {
    const delElem = counter < charArray.length ? 1 : 0;
    const newArray = charArray;
    newArray.splice(counter, delElem, char);
    setCharArray(newArray);
    console.log(newArray);

    setChar({ name: "", initiative: "", health: "" });
    setCounter((counter) => counter + 1);
  };

  const pressPereviousHandler = () =>{
    setCounter(counter=> counter-1)
    setChar(charArray[counter]) 
  }

  const buttonsDisplay = () => {
    return (
      <React.Fragment>
        {counter ? <Button onClick={pressPereviousHandler}>Previous</Button> : null}
        {counter + 1 === numberOf.players + numberOf.enemies ? (
          <Button>Done!</Button>
        ) : (
          <Button onClick={pressNextHandler}>Next</Button>
        )}
      </React.Fragment>
    );
  };

  const getMonsterInfo = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const monster:any = await Service.getMonster(event.target.value);
    console.log(monster);
    
    console.log(monster.xp);
    setChar({ ...char, name: monster.name, health: monster.hitPoints});
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
            <SearchBar changeHandler={getMonsterInfo} />
            <Input
              inputName="initiative"
              value={char.initiative}
              inputType="number"
              changeHandler={changeHandlerChar}
              id="Char"
            />
            <p>{char.name}</p>
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

      {cardDisplay()}
    </React.Fragment>
  );
};

export default MainPage;
