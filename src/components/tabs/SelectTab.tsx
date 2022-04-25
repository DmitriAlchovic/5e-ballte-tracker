import React, { ReactElement, useEffect, useState, useContext } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import "./SelectTab.css";
import BattleContext from "../../context/BattleContext";
import { Character } from "../../interfaces";
import BattleCard from "../cards/battle-card/BattleCard";

const SelectTab: React.FC = () => {
  const charArray = useContext<Character[]>(BattleContext);
  const [array, setArray] = useState<ReactElement[]>([]);
  const [currentChar, setCurrentChar] = useState<number>(0);
  const [tabFocus, setTabFocus] = useState<number>(0);
  const [hitPointsArr, setHitPointArr] = useState<number[]>([]);

  const hitpointsChange = (event: React.ChangeEvent<HTMLInputElement>,index:number) => {
    setHitPointArr({ ...hitPointsArr, [index]: parseInt(event.target.value) });
    console.log(hitPointsArr);
  };

  useEffect(() => {
    const newArr = charArray.map(({ hitPoints }) => {
      return hitPoints;
    });
    setHitPointArr(newArr);
    
  }, []);

  useEffect(() => {
    const enemy = charArray.map(({ name }: Character, index) => {
      return (
        <Tab   eventKey={index} title={name} key={index}>
          <BattleCard
            charIndex={index}
            hitPointsArr={hitPointsArr}
            hitpointsChange={hitpointsChange}
          ></BattleCard>
        </Tab>
      );
    });

    setArray(enemy);
  }, [hitPointsArr]);

  const changeFocus = (key: string | null) => {
    if (key) {
      setTabFocus(parseInt(key));
    }
  };

  const pressHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentChar === charArray.length - 1) {
      setCurrentChar(0);
    } else setCurrentChar((currentChar) => currentChar + 1);
    setTabFocus(currentChar);
  };

  return (
    <div className="Tabs">
      <Button onClick={pressHandler}>Done!</Button>
      <Tabs 
        onSelect={changeFocus}
        activeKey={tabFocus}
        variant="pills"
        defaultActiveKey={charArray[0].name ? charArray[0].name : ""}
        id="noanim-tab-example"
        className="mb-3"
      >
        {array}
      </Tabs>
    </div>
  );
};

export default SelectTab;
