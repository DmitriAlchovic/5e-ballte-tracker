import React, { useEffect, useState, FC } from 'react';
import { Button } from 'react-bootstrap';
import BattleTab from '../../components/Tabs/BattleTab';
import { Character, FightPageProps, PlayerCharacter } from '../../interfaces';
import { Link } from 'react-router-dom';

const FightPage: FC<FightPageProps> = ({
  npcArray,
  partyArray,
  initiativeList,
}) => {
  const [fightArray, setFightArray] = useState<Array<any>>();
  const [fightCharStatus, setFightCharStatus] = useState<any>();

  const getStatBonus = (stat: number): number => {
    const statBonus = Math.floor((stat - 10) / 2);
    return statBonus;
  };

  useEffect(() => {
    console.log(initiativeList);
     
    if (initiativeList) {
      const partyArrayInitiative = partyArray.map((player) => {
        return {
          ...player,
          initiative:
            initiativeList[player.id] +
            getStatBonus(player.dexterity),
        };
      });
      const npcArrayInitiative = npcArray.map((npc) => {
        return {
          ...npc,
          initiative: initiativeList[npc.id] + getStatBonus(npc.dexterity),
        };
      });
      
      const fightArraySorted = [
        ...partyArrayInitiative,
        ...npcArrayInitiative,
      ].sort((prevChar, nextChar) => {
        if (nextChar.initiative === prevChar.initiative) {
          return (
            getStatBonus(nextChar.dexterity) - getStatBonus(prevChar.dexterity)
          );
        }
        return nextChar.initiative - prevChar.initiative;
      });
      console.log(fightArraySorted);
      setFightArray(fightArraySorted);
    }
  }, [npcArray, partyArray, initiativeList]);

  useEffect(() => {
    if (fightArray) {
      const fightCharStatusCandidate = fightArray.reduce(
        (prevStatus, character: Character | PlayerCharacter) => {
          if (character.id) {
            return {
              ...prevStatus,
              [character.id]: {
                hitPoints: character.hitPoints,
                Blinded: false,
                Charmed: false,
                Deafened: false,
                Frightened: false,
                Grappled: false,
                Incapacitated: false,
                Invisible: false,
                Paralyzed: false,
                Petrified: false,
                Poisoned: false,
                Prone: false,
                Restrained: false,
                Stunned: false,
                Unconscious: false,
                Exhaustion: false,
                ConcentratedOnSpell:false
              },
            };
          }
          else{
            return{...prevStatus};
          }
        },
        {}
      );
      setFightCharStatus(fightCharStatusCandidate);
    }
  }, [fightArray]);
  
  const statusChangeHandler = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const value = parseInt(event.target.value);
    if(!isNaN(value)){
    const {[event.target.id]:charStatus} = fightCharStatus;
    const newStatus = {...charStatus, [event.target.name]:value}
    
    setFightCharStatus({...fightCharStatus, [event.target.id]:newStatus})
    }
    
  }
  return (
    <div>
      <h2>Round:</h2>
      <Link to={'/'} ><Button onClick={()=>{}} >End Fight</Button></Link>
      {fightArray && <BattleTab fightArray={fightArray} fightCharStatus={fightCharStatus} statusChangeHandler={statusChangeHandler} />}
    </div>
  );
};

export default FightPage;
