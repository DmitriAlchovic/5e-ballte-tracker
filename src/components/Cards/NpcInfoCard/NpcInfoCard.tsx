import React, { FC, useEffect } from 'react';
import {
  NpcInfoCardProps,
  Proficiencies,
  Action,
  LegendaryAction,
  SpecialAbility,
} from '../../../interfaces';
import { Card, Table } from 'react-bootstrap';
import './NpcInfoCard.css'

const NpcInfoCard: FC<NpcInfoCardProps> = ({ selectedCharacter }) => {
  const getStatBonus = (stat: number): number => {
    const statBonus = Math.floor((stat - 10) / 2);
    return statBonus;
  };

  const {
    name,
    type,
    alignment,
    armorClass,
    hitPoints,
    hitDice,
    speed,
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
    proficiencies,
    damageImmunities,
    damageResistances,
    damageVulnerabilities,
    senses,
    languages,
    xp,
    challengeRaiting,
    legendaryActions,
    actions,
    specialAbilities,
  } = selectedCharacter;

  const displayProficiences = (profissience: Proficiencies[]) => {
    const saveThrows: string[] = [];
    const skills: string[] = [];

    const profissiencesArr = profissience.map(({ value, proficiency }) => {
      if (proficiency.name.includes('Saving Throw:')) {
        const saveThrow = proficiency.name.replace(/Saving\sThrow:/, '');
        saveThrows.push(`${saveThrow} ${value}`);
      } else if (proficiency.name.includes('Skill:')) {
        const skill = proficiency.name.replace(/Skill:\s/, '');
        skills.push(`${skill} ${value} `);
      }
      return ` ${proficiency.name} ${value} `;
    });
    return (
      <Card.Text>
        Save Throws:{saveThrows} Skills:{skills}
      </Card.Text>
    );
  };

  const displayActionsList = (
    actions: Array<Action | LegendaryAction | SpecialAbility>
  ) => {
    const actionsArr = actions.map(({ name, desc }, index) => {
      return (
        <Card.Text key={index}>
          {name}: {desc}
        </Card.Text>
      );
    });
    return actionsArr;
  };
  return (
    <div className="npcInfoContainer">
      <Card border="primary">
        <Card.Header>
          <h2>{name}</h2>
          {type},{alignment}
        </Card.Header>
        <Card.Body>
          <Card.Text>Armor Class {armorClass} </Card.Text>

          <Card.Text>
            Hit Points {hitPoints} ({hitDice})
            <input
              min={0}
              onChange={(e) => {}}
              className="hit-points-input"
              type="number"
            />
          </Card.Text>
          <Card.Text>
            Speed {speed?.walk}
            {speed?.fly ? `, fly ${speed.fly}` : null}
            {speed?.swim ? `, swim ${speed.swim}` : null}
          </Card.Text>

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
                <th>{strength && `${strength} (${getStatBonus(strength)})`}</th>
                <th>
                  {dexterity && `${dexterity} (${getStatBonus(dexterity)})`}
                </th>
                <th>
                  {constitution &&
                    `${constitution} (${getStatBonus(constitution)})`}
                </th>
                <th>
                  {intelligence &&
                    `${intelligence} (${getStatBonus(intelligence)})`}
                </th>
                <th>{wisdom && `${wisdom} (${getStatBonus(wisdom)})`}</th>
                <th>{charisma && `${charisma} (${getStatBonus(charisma)})`}</th>
              </tr>
            </tbody>
          </Table>

          {proficiencies && displayProficiences(proficiencies)}
          {damageImmunities?.length && (
            <Card.Text>Damage Immunities:{damageImmunities}</Card.Text>
          )}
          {damageResistances?.length && (
            <Card.Text>Damage Resistances:{damageResistances}</Card.Text>
          )}
          {damageVulnerabilities?.length && (
            <Card.Text>
              Damage Vulnerabilities:{damageVulnerabilities}
            </Card.Text>
          )}
          <Card.Text>
            Senses:
            {senses?.passivePerception &&
              `Passive Perception ${senses.passivePerception}`}
            {senses?.blindsight && `, Blindsight ${senses.blindsight}`}
            {senses?.darkvision && `, Darkvision ${senses.darkvision}`}
          </Card.Text>
          <Card.Text>Languages: {languages}</Card.Text>
          <Card.Text>
            Challenge: {challengeRaiting} ({xp}XP)
          </Card.Text>
        </Card.Body>
        <Card.Body>
          Special abilites:
          {specialAbilities && displayActionsList(specialAbilities)}
        </Card.Body>
        <Card.Header>Actions</Card.Header>
        {actions && displayActionsList(actions)}
        {legendaryActions && <Card.Header>Legendary Actions</Card.Header>}
        {legendaryActions && displayActionsList(legendaryActions)}
      </Card>
    </div>
  );
};

export default NpcInfoCard;
