import React, { FC } from 'react';
import { Card, Table, Form, DropdownButton,Dropdown } from 'react-bootstrap';
import { BattleCharacterCardProps } from '../../../interfaces';
import ConditionsInfo from '../../ConditionsInfo';
import './BattleCharacterCard.css';

const BattleCharacterCard: FC<BattleCharacterCardProps> = ({
  playerCharacter,
  fightCharStatus,
  statusChange
}) => {
  const {
    characterName,
    playerName,
    armorClass,
    speed,
    maxHitpoints,
    strength,
    dexterity,
    constitution,
    intelligence,
    charisma,
    wisdom,
    discription,
    languages,
    passivePreception,
    id,
  } = playerCharacter;

  const getStatBonus = (stat: number): number => {
    const statBonus = Math.floor((stat - 10) / 2);
    return statBonus;
  };
  
  return (
    <div>
      <Card border="primary">
        <Card.Header>
          <h2>{characterName}</h2>
          <h4>{playerName}</h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>Armor Class {armorClass} </Card.Text>

          <Card.Text>Max Hit Points {maxHitpoints}
          <input
              id={id}
              min={0}
              onChange={(event) => statusChange(event)}
              className="hit-points-input"
              type="number"
              name="hitPoints"
              value={fightCharStatus[id].hitPoints}
            /></Card.Text>
          <Card.Text>Speed {speed}</Card.Text>
           <ConditionsInfo id={id} fightCharStatus={fightCharStatus} statusChange={statusChange} /> 
          <Table>
            <thead>
              <tr>
                <th>STR</th>
                <th>DEX</th>
                <th>CON</th>
                <th>INT</th>
                <th>WIS</th>
                <th>CHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{`${strength} (${getStatBonus(strength)})`}</th>
                <th>{`${dexterity} (${getStatBonus(dexterity)})`}</th>
                <th>{`${constitution} (${getStatBonus(constitution)})`}</th>
                <th>{`${intelligence} (${getStatBonus(intelligence)})`}</th>
                <th>{`${wisdom} (${getStatBonus(wisdom)})`}</th>
                <th>{`${charisma} (${getStatBonus(charisma)})`}</th>
              </tr>
            </tbody>
          </Table>

          <Card.Text>
            Senses:
            {passivePreception}
          </Card.Text>
          <Card.Text>Languages: {languages}</Card.Text>
          <Card.Text>Discription: {discription}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BattleCharacterCard;
