import React, { ReactElement, useEffect, useState, ReactNode } from "react";
import { Tabs, Tab } from "react-bootstrap";
import InputCard from "./InputCard/InputCard";
import { CreateFightProps } from "../../interfaces";
import "./SelectTab.css";

interface CardsNumber {
  numberOf: { players: number; enemies: number };
}
const SelectTab: React.FC<CardsNumber> = ({ children, numberOf }) => {
  const { players, enemies } = numberOf;
  const [array, setArray] = useState<ReactElement[]>([]);
  const enemy = true;

  useEffect(() => {

    const tabsArr = [];
    for (let i = 1; i <= players; i++) {
      tabsArr.push(
        <Tab eventKey={i} title={`Player ${i}`} key={i}>
          {React.Children.map<ReactNode, ReactNode>(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { id: `Player${i}` });
            } else return null;
          })}
        </Tab>
      );
    }
    for (let i = players + 1; i <= players + enemies; i++) {
      tabsArr.push(
        <Tab eventKey={i} title={`Enemie ${i - players}`} key={i}>
          {React.Children.map<ReactNode, ReactNode>(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { enemy, id:`Enemy${i}` });
            } else return null;
          })}
        </Tab>
      );
    }
    setArray(tabsArr);
    console.log(array, "array");
  }, [players, enemies]);

  return (
    <div className="Tabs">
      <Tabs className="mb-3">{array}</Tabs>
    </div>
  );
};

export default SelectTab;
