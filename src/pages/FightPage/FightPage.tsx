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
  const [roundCounter, setRoundCounter] = useState<number>(1);

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
            initiativeList[player.id] + getStatBonus(player.dexterity),
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
                Exhaustion: '',
                ConcentratedOnSpell: false,
              },
            };
          } else {
            return { ...prevStatus };
          }
        },
        {}
      );
      setFightCharStatus(fightCharStatusCandidate);
    }
  }, [fightArray]);

  const statusChangeHandler = (event: React.ChangeEvent<any>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      const { [event.target.id]: charStatus } = fightCharStatus;
      const newStatus = { ...charStatus, [event.target.name]: value };

      setFightCharStatus({ ...fightCharStatus, [event.target.id]: newStatus });
    } else if (event.target.type === 'checkbox') {
      const { [event.target.id]: charStatus } = fightCharStatus;
      const newStatus = {
        ...charStatus,
        [event.target.name]: event.target.checked,
      };
      setFightCharStatus({ ...fightCharStatus, [event.target.id]: newStatus });
    }
    else if (event.target.name==='Exhaustion'){
      const { [event.target.id]: charStatus } = fightCharStatus;
      const text = event.target.text === 'none'?"":event.target.text;
      const newStatus = {
        ...charStatus,
        Exhaustion: text,
      };
      setFightCharStatus({ ...fightCharStatus, [event.target.id]: newStatus });
    }
  };
  const changeRound = () => {
    setRoundCounter((roundCounter) => ++roundCounter);
  };
  return (
    <div>
      <h2>Round:{roundCounter}</h2>
      <Link to={'/'}>
        <Button onClick={() => {}}>End Fight</Button>
      </Link>
      {fightArray && (
        <BattleTab
          fightArray={fightArray}
          fightCharStatus={fightCharStatus}
          statusChangeHandler={statusChangeHandler}
          changeRound={changeRound}
          roundCounter={roundCounter}
        />
      )}
    </div>
  );
};

export default FightPage;
