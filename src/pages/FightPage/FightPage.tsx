import React, { useEffect, useState, FC } from 'react';
import BattleTab from '../../components/Tabs/BattleTab';
import { FightPageProps } from '../../interfaces';

const FightPage: FC<FightPageProps> = ({
  npcArray,
  partyArray,
  initiativeList,
}) => {
  const [fightArray, setFightArray] = useState<Array<any>>();

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

  return (
    <div>
      {fightArray && <BattleTab fightArray={fightArray} />}
    </div>
  );
};

export default FightPage;
