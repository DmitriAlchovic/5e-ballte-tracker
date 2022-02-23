import React, { useContext, useState } from "react";
import { Card, Table } from "react-bootstrap";
import BattleContext from "../../context/battle-context";
import {
  Character,
  Action,
  LegendaryAction,
  SpecialAbility,
  Proficiencies,
} from "../../interfaces";

interface BattleCardProps {
  charIndex: number;
}
const BattleCard: React.FC<BattleCardProps> = ({ charIndex }) => {
  const charArray = useContext(BattleContext);
  const [char, setChar] = useState<Character>(charArray[charIndex]);

  const getStatBonus = (stat: number): number => {
    const statBonus = Math.floor((stat - 10) / 2);
    return statBonus;
  };

  const displayProficiences = (profissience: Proficiencies[]) => {
    const saveThrows: string[] = [];
    const skills: string[] = [];
    const profissiencesArr = profissience.map(({ value, proficiency }) => {
      if (proficiency.name.includes("Saving Throw:")) {
        const saveThrow = proficiency.name.replace(/Saving\sThrow:/, "");
        saveThrows.push(`${saveThrow} ${value}`);
      } else if (proficiency.name.includes("Skill:")) {
        const skill = proficiency.name.replace(/Skill:\s/, "");
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
    <div className="battle-card">
    <Card border="primary">
      <Card.Header>
        <h2>{char.name}</h2>
        {char.type},{char.alignment}
      </Card.Header>
      <Card.Body>
        <Card.Text>Armor Class {char.armorClass} </Card.Text>

        <Card.Text>
          Hit Points {char.hitPoints} ({char.hitDice})
        </Card.Text>

        <Card.Text>
          Speed {char.speed?.walk}
          {char.speed?.fly ? `, fly ${char.speed.fly}` : null}
          {char.speed?.swim ? `, swim ${char.speed.swim}` : null}
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
              <th>
                {char.strength
                  ? `${char.strength} (${getStatBonus(char.strength)})`
                  : null}
              </th>
              <th>
                {char.dexterity
                  ? `${char.dexterity} (${getStatBonus(char.dexterity)})`
                  : null}
              </th>
              <th>
                {char.constitution
                  ? `${char.constitution} (${getStatBonus(char.constitution)})`
                  : null}
              </th>
              <th>
                {char.intelligence
                  ? `${char.intelligence} (${getStatBonus(char.intelligence)})`
                  : null}
              </th>
              <th>
                {char.wisdom
                  ? `${char.wisdom} (${getStatBonus(char.wisdom)})`
                  : null}
              </th>
              <th>
                {char.charisma
                  ? `${char.charisma} (${getStatBonus(char.charisma)})`
                  : null}
              </th>
            </tr>
          </tbody>
        </Table>

        {char.proficiencies ? displayProficiences(char.proficiencies) : null}
        {char.damageImmunities?.length?<Card.Text>Damage Immunities:{char.damageImmunities}</Card.Text>:null}
        {char.damageResistances?.length?<Card.Text>Damage Resistances:{char.damageResistances}</Card.Text>:null}
        {char.damageVulnerabilities?.length?<Card.Text>Damage Vulnerabilities:{char.damageVulnerabilities}</Card.Text>:null}
        <Card.Text>
          Senses:{" "}
          {char.senses?.passivePerception
            ? `Passive Perception ${char.senses.passivePerception}`
            : null}
          {char.senses?.blindsight
            ? `, Blindsight ${char.senses.blindsight}`
            : null}
          {char.senses?.darkvision
            ? `, Darkvision ${char.senses.darkvision}`
            : null}
        </Card.Text>
        <Card.Text>Languages: {char.languages}</Card.Text>
        <Card.Text>
          Challenge: {char.challengeRaiting} ({char.xp}XP){" "}
        </Card.Text>
      </Card.Body>
      <Card.Body>
        Special abilites:
        {char.specialAbilities
          ? displayActionsList(char.specialAbilities)
          : null}
      </Card.Body>
      <Card.Header>Actions</Card.Header>
      {char.actions ? displayActionsList(char.actions) : null}
      {char.legendaryActions ? (
        <Card.Header>Legendary Actions</Card.Header>
      ) : null}
      {char.legendaryActions ? displayActionsList(char.legendaryActions) : null}
    </Card>
    </div>
  );
};

export default BattleCard;
