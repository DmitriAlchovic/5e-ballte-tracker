import React, { useContext, useEffect, useState} from "react";
import { Button } from "react-bootstrap";
import Input from "../components/Input/Input";
import InputCard from "../components/TabCard/InputCard/InputCard";
import SearchBar from "../components/SearchBar";
import Service from "../services/api";
import {Character} from "../interfaces"
interface MainPageProps {
  submitCharacters:Function;
  children?:React.ReactNode;
}

const MainPage: React.FC<any> = ({submitCharacters}) => {
  const [numberOf, setNumberOf] = useState({ players: 0, enemies: 0 });
  const [charArray, setCharArray] = useState<Character[]>([]);
  const [char, setChar] = useState<Character>({ name: "", initiative: 0, hitPoints:0  });
  const [counter, setCounter] = useState(0);

  console.log(Service.getMonster("zombie"));

  const changeHandlerNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOf({
      ...numberOf,
      [event.target.name]: parseInt(event.target.value),
    });
     setCharArray([]);
     setChar({ name: "", initiative: 0, hitPoints:0  });
     setCounter(0);
  };

  const changeHandlerChar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChar((char) => {
      return { ...char, [event.target.name]: event.target.value };
    });
  };

  const pressNextHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    const delElem = counter < charArray.length ? 1 : 0;
    const newArray = charArray;
    newArray.splice(counter, delElem, char);
    setCharArray(newArray);
    setChar({ name: "", initiative: 0, hitPoints:0 });
    setCounter((counter) => counter + 1);
  };

  const pressPereviousHandler = () =>{
    setCounter(counter=> counter-1)
    setChar(charArray[counter]?charArray[counter]:{ name: "", initiative: 0, hitPoints:0  }) 
    
  }

  const pressDoneHandler = (event:React.MouseEvent<HTMLButtonElement>) => {
    const newArr = charArray;
    newArr.push(char);
    setCharArray(newArr)
    submitCharacters(charArray);
  }

  const buttonsDisplay = () => {
    return (
      <React.Fragment>
        {counter ? <Button onClick={pressPereviousHandler}>Previous</Button> : null}
        {counter + 1 === numberOf.players + numberOf.enemies ? (
          <Button  onClick={pressDoneHandler} >Done!</Button>
        ) : (
          <Button onClick={pressNextHandler}>Next</Button>
        )}
      </React.Fragment>
    );
  };

  const getMonsterInfo = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    
    const monster:Character = await Service.getMonster(event.target.value);
    if (monster){
      console.log(monster,"monster");
      
    await setChar(monster);
    }
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
              inputName="hitPoints"
              value={char.hitPoints}
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
            <SearchBar changeHandler={(e)=>{getMonsterInfo(e)}} value={char.name}/>
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
