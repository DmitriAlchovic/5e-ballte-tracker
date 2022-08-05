import React, { FC } from 'react';
import { Card, Table, Form } from 'react-bootstrap';
import { BattleCharacterCardProps } from '../../../interfaces';
import './BattleCharacterCard.css';

const BattleCharacterCard: FC<BattleCharacterCardProps> = ({
  playerCharacter,
  fightCharStatus,
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

          <Card.Text>Max Hitoints {maxHitpoints}</Card.Text>
          <Card.Text>Speed {speed}</Card.Text>
          <Form className="statusRadioContainer">
            <div className="switchContainer">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Concentrated"
                checked={fightCharStatus[id].ConcentratedOnSpell}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Blinded"
                checked={fightCharStatus[id].Blinded}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Charmed"
                checked={fightCharStatus[id].Charmed}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Deafend"
                checked={fightCharStatus[id].Deafened}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Exhausted"
                checked={fightCharStatus[id].Exhaustion}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Frightened"
                checked={fightCharStatus[id].Frightened}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Grappled"
                checked={fightCharStatus[id].Grappled}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Incapacitated"
                checked={fightCharStatus[id].Incapacitated}
              />
            </div>
            <div className="switchContainer">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Invisible"
                checked={fightCharStatus[id].Invisible}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Paralyzed"
                checked={fightCharStatus[id].Paralyzed}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Petrified"
                checked={fightCharStatus[id].Petrified}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Poisoned"
                checked={fightCharStatus[id].Poisoned}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Prone"
                checked={fightCharStatus[id].Prone}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Restrained"
                checked={fightCharStatus[id].Restrained}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Stunned"
                checked={fightCharStatus[id].Stunned}
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Unconscious"
                checked={fightCharStatus[id].Unconscious}
              />
            </div>
          </Form>
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
          <Card.Text>{discription}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BattleCharacterCard;
