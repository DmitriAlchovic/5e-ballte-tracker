import React, { useState, FC } from 'react';
import { BattleTabProps } from '../../../interfaces';
import BattleCard from '../../Cards/BattleNpcCard/BattleNpcCard';
import { Button } from 'react-bootstrap';
import './BattleTab.css';
import BattleCharacterCard from '../../Cards/BattleCharacterCard';

const BattleTab: FC<BattleTabProps> = ({ fightArray, fightCharStatus, statusChangeHandler }) => {
  const [toggleState, setToggleState] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  const blockTabs = fightArray.map((char, index) => {
    if (char.characterType === 'playerCharacter') {
      return (
        <button
          key={index}
          className={
            toggleState === index
              ? currentTurn === index
                ? 'battleTabs activeTurnTab activeTabs'
                : 'battleTabs activeTabs '
              : currentTurn === index
              ? 'battleTabs activeTurnTab'
              : 'battleTabs'
          }
          onClick={() => toggleTab(index)}
        >
          {char.characterName}<p>{`(${char.playerName})`}</p>
        </button>
      );
    } else if (char.characterType === 'npc') {
      return (
        <button
        key={index}
          className={
            toggleState === index
              ? currentTurn === index
                ? 'battleTabs activeTurnTab activeTabs'
                : 'battleTabs activeTabs '
              : currentTurn === index
              ? 'battleTabs activeTurnTab'
              : 'battleTabs'
          }
          onClick={() => toggleTab(index)}
        >
          {char.name}
        </button>
      );
    }
    return null;
  });

  const nextTurn = () => {
    const nextTurn =
      currentTurn + 1 === fightArray.length ? 0 : currentTurn + 1;
    setCurrentTurn(nextTurn);
    setToggleState(nextTurn);
  };

  

  const contentTabs = fightArray.map((char, index) => {
    if (char.characterType === 'playerCharacter') {
      return (
        <div
          key={index}
          className={
            toggleState === index ? 'content  activeContent' : 'content'
          }
        >
          {fightCharStatus&&<BattleCharacterCard playerCharacter={char} fightCharStatus={fightCharStatus} />}
        </div>
      );
    } else if (char.characterType === 'npc') {
      return (
        <div
          key={index}
          className={
            toggleState === index ? 'content  activeContent' : 'content'
          }
        >
          {fightCharStatus&&<BattleCard npc={char} statusChange={statusChangeHandler} fightCharStatus={fightCharStatus} />}
        </div>
      );
    }
    return null;
  });
  return (
    <div className="battleTabContainer">
      <div className="blocTabs">{blockTabs}</div>

      <div className="contentTabs">{contentTabs}</div>
      <Button
        onClick={() => {
          nextTurn();
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default BattleTab;
