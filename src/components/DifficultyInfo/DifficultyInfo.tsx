import React, { FC, useEffect, useState } from 'react';
import { DifficultyInfoProps } from '../../interfaces';
import './DifficultyInfo.css';

const DifficultyInfo: FC<DifficultyInfoProps> = ({ npcList, currentParty }) => {
  const _DIFFICULTY_TABLE = [
    [25, 50, 75, 100],
    [50, 100, 150, 200],
    [75, 150, 225, 400],
    [125, 250, 375, 500],
    [250, 500, 750, 1100],
    [300, 600, 900, 1400],
    [350, 750, 1100, 1700],
    [450, 900, 1400, 2100],
    [550, 1100, 1600, 2400],
    [600, 1200, 1900, 2800],
    [800, 1600, 2400, 3600],
    [1000, 2000, 3000, 4500],
    [1100, 2200, 3400, 5100],
    [1250, 2500, 3800, 5700],
    [1400, 2800, 4300, 6400],
    [1600, 3200, 4800, 7200],
    [2000, 3900, 5900, 8800],
    [2100, 4200, 6300, 9500],
    [2400, 4900, 7300, 10900],
    [2800, 5700, 8500, 12700],
  ];

  const _DIFFICULTY_MULTIPLIER = new Map([
    [0, 0.5],
    [1, 1],
    [2, 1.5],
    [3, 2],
    [4, 2.5],
    [5, 3],
    [6, 4],
    [7, 5],
  ]);

  const [totalXp, setTotalXp] = useState(0);
  const [xpMult, setXpMult] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [partyStrength, setPartyStrength] = useState<number[]>([]);

  const findMultiplier = (npcCap: number, partySize: number) => {
    const partySizeMult = partySize < 3 ? 1 : partySize >= 6 ? -1 : 0;

    if (npcCap === 1) {
      return _DIFFICULTY_MULTIPLIER.get(1 + partySizeMult);
    } else if (npcCap === 2) {
      return _DIFFICULTY_MULTIPLIER.get(2 + partySizeMult);
    } else if (npcCap > 2 && npcCap < 7) {
      return _DIFFICULTY_MULTIPLIER.get(3 + partySizeMult);
    } else if (npcCap > 6 && npcCap < 11) {
      return _DIFFICULTY_MULTIPLIER.get(4 + partySizeMult);
    } else if (npcCap > 10 && npcCap < 15) {
      return _DIFFICULTY_MULTIPLIER.get(5 + partySizeMult);
    } else if (npcCap > 14) {
      return _DIFFICULTY_MULTIPLIER.get(6 + partySizeMult);
    }
    return -1;
  };

  const findDifficulty = (partyDifficulty: number[], xp: number) => {
    if (partyDifficulty[0] > xp) {
      return 'Very easy';
    } else if (partyDifficulty[1] > xp) {
      return 'Easy';
    } else if (partyDifficulty[2] > xp) {
      return 'Normal';
    } else if (partyDifficulty[3] > xp) {
      return 'Hard';
    } else if (partyDifficulty[3] <= xp) {
      return 'Deadly';
    }
    return 'undefined';
  };

  useEffect(() => {
      const nonFriendlyNpc = npcList.filter(({ isFriendly }) => !isFriendly);
      const friendlyNpc = npcList.filter(({ isFriendly }) => isFriendly);
      const friendlyNpcXp = friendlyNpc.reduce((prev, { xp }) => prev + xp, 0);
      const xp = nonFriendlyNpc.reduce((prev, { xp }) => prev + xp, 0);
      setTotalXp(xp);
      const multiplier = findMultiplier(
        nonFriendlyNpc.length,
        currentParty.length + friendlyNpc.length
      );
      const xpWtihMultiplier = xp * (multiplier ? multiplier : 1);
      setXpMult(xpWtihMultiplier);
      const difficultyArr = currentParty
        .map(({ level }) => _DIFFICULTY_TABLE[level-1])
        .reduce((prev, item) => {
          if (prev.length) {
            return item.map((value, idx) => value + prev[idx]);
          }
          return item;
        }, []);
      const difficultyArrWithNpc = difficultyArr.map(
        (value) => value + friendlyNpcXp
      );
      setPartyStrength(difficultyArrWithNpc);
      setDifficulty(findDifficulty(difficultyArrWithNpc, xpWtihMultiplier));
  }, [currentParty, npcList]);

  return (
    <div className="difficultyInfoContainer">
      <h4>Party strength:</h4>
      <div className="difficultyInfo">
        <div className="difficultyText">
          <p>Easy:</p>
          <p>Normal:</p>
          <p>Hard:</p>
          <p>Deadly:</p>
        </div>
        <div className="difficultyText">
          <p>{partyStrength[0]}</p>
          <p>{partyStrength[1]}</p>
          <p>{partyStrength[2]}</p>
          <p>{partyStrength[3]}</p>
        </div>
      </div>
      <h4>Encounter Info:</h4>
      <div className="difficultyInfo">
        <div className="difficultyText">
          <p>Total Xp:</p>
          <p>Adjusted Xp:</p>
          <p>Difficulty:</p>
        </div>
        <div className="difficultyText">
          <p>{totalXp}</p>
          <p>{xpMult}</p>
          <p>{difficulty}</p>
        </div>
      </div>
    </div>
  );
};

export default DifficultyInfo;
