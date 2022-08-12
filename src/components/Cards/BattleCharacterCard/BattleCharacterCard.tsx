import React, { FC } from 'react';
import { Card, Table, Form, DropdownButton,Dropdown } from 'react-bootstrap';
import { BattleCharacterCardProps } from '../../../interfaces';
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
            <Form>
            <div className="switchContainer">
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="ConcentratedOnSpell"
                label="Concentrated"
                checked={fightCharStatus[id].ConcentratedOnSpell}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Blinded"
                label="Blinded"
                checked={fightCharStatus[id].Blinded}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Charmed"
                label="Charmed"
                checked={fightCharStatus[id].Charmed}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Deafened"
                label="Deafened"
                checked={fightCharStatus[id].Deafened}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Frightened"
                label="Frightened"
                checked={fightCharStatus[id].Frightened}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Grappled"
                label="Grappled"
                checked={fightCharStatus[id].Grappled}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Incapacitated"
                label="Incapacitated"
                checked={fightCharStatus[id].Incapacitated}
              />
            </div>
            <div className="switchContainer">
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Invisible"
                label="Invisible"
                checked={fightCharStatus[id].Invisible}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Paralyzed"
                label="Paralyzed"
                checked={fightCharStatus[id].Paralyzed}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Petrified"
                label="Petrified"
                checked={fightCharStatus[id].Petrified}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Poisoned"
                label="Poisoned"
                checked={fightCharStatus[id].Poisoned}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Prone"
                label="Prone"
                checked={fightCharStatus[id].Prone}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Restrained"
                label="Restrained"
                checked={fightCharStatus[id].Restrained}
              />
              <Form.Check
                onClick={(e) => statusChange(e)}
                type="switch"
                id={id}
                name="Stunned"
                label="Stunned"
                checked={fightCharStatus[id].Stunned}
              />
              <Form.Check
                onClick={(e) => {
                  statusChange(e);
                }}
                type="switch"
                id={id}
                name="Unconscious"
                label={'Unconscious'}
                checked={fightCharStatus[id].Unconscious}
              />
              <DropdownButton
                id="dropdown-basic-button"
                title={`Exhaustion: ${fightCharStatus[id].Exhaustion}`}
              >
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  {'none'}
                </Dropdown.Item>
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  Lvl: 1
                </Dropdown.Item>
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  Lvl: 2
                </Dropdown.Item>
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  Lvl: 3
                </Dropdown.Item>
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  Lvl: 4
                </Dropdown.Item>
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  Lvl: 5
                </Dropdown.Item>
                <Dropdown.Item
                  name="Exhaustion"
                  id={id}
                  onClick={(e) => {
                    statusChange(e);
                  }}
                >
                  Lvl: 6
                </Dropdown.Item>
              </DropdownButton>
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
          <Card.Text>Discription: {discription}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BattleCharacterCard;
