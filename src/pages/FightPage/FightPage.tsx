import React, { useEffect, useState, FC } from 'react';
import { Button } from 'react-bootstrap';
import BattleTab from '../../components/Tabs/BattleTab';
import { Character, FightCharStatus, FightPageProps, PlayerCharacter } from '../../interfaces';

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
    if (initiativeList) {
      const partyArrayInitiative = partyArray.map((player) => {
        return {
          ...player,
          initiative:
            initiativeList[player.characterName] +
            getStatBonus(player.dexterity),
        };
      });
      const npcArrayInitiative = npcArray.map((npc) => {
        return {
          ...npc,
          initiative: initiativeList[npc.name] + getStatBonus(npc.dexterity),
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
      <Button>End Fight</Button>
      {fightArray && <BattleTab fightArray={fightArray} fightCharStatus={fightCharStatus} statusChangeHandler={statusChangeHandler} />}
    </div>
  );
};

export default FightPage;
