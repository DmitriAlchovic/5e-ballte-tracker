import React, {
  ReactElement,
  useEffect,
  useState,
  useContext,
} from "react";
import { Tabs, Tab, Button} from "react-bootstrap";
import "./SelectTab.css";
import BattleContext from "../../context/battle-context";
import { Character } from "../../interfaces";
import BattleCard from "./BattleCard";

const SelectTab: React.FC = () => {
  const charArray = useContext<Character[]>(BattleContext);
  const [array, setArray] = useState<ReactElement[]>([]);
  const [currentChar,setCurrentChar] = useState<number>(0);
  const [tabFocus,setTabFocus] = useState<number>(0);

  useEffect(() => {
    const enemy = charArray.map(({ name }: Character, index) => {
      return (
        <Tab eventKey={index} title={name} key={index} >
          <BattleCard charIndex={index}></BattleCard>
        </Tab>
      );
    });

    setArray(enemy);
  }, []);
  
  const changeFocus = (key:string|null) => {
    if(key){setTabFocus(parseInt(key));}
  }

  const pressSomeHandler =(event:React.MouseEvent<HTMLButtonElement>)=>{
    
     if (currentChar === charArray.length-1){
       setCurrentChar(0)
    }
    else setCurrentChar(currentChar=>currentChar+1);
    
      setTabFocus(currentChar);
  }

  return (
    <div className="Tabs">
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
      <Button onClick={pressSomeHandler}>Done!</Button>
    </div>
  );
};

export default SelectTab;
