import React from "react";
import { Card, Table } from "react-bootstrap";
import "./BattleNpcCard.css";
import {
  BattleCardProps,
  Action,
  LegendaryAction,
  SpecialAbility,
  Proficiencies,
} from "../../../interfaces";


const BattleNpcCard: React.FC<BattleCardProps> = ({
  npc,
  hitpointsChange,
}) => {
  const getStatBonus = (stat: number): number => {
    const statBonus = Math.floor((stat - 10) / 2);
    return statBonus;
  };

  const displayProficiences = (profissience: Proficiencies[]) => {
    const saveThrows: string[] = [];
    const skills: string[] = [];

    /* const profissiencesArr = profissience.map(({ value, proficiency }) => {
      if (proficiency.name.includes("Saving Throw:")) {
        const saveThrow = proficiency.name.replace(/Saving\sThrow:/, "");
        saveThrows.push(`${saveThrow} ${value}`);
      } else if (proficiency.name.includes("Skill:")) {
        const skill = proficiency.name.replace(/Skill:\s/, "");
        skills.push(`${skill} ${value} `);
      }
      return ` ${proficiency.name} ${value} `;
    }); */
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
    <div className="battleCard">
      <Card  >
        <Card.Header>
          <h2>{npc.name}</h2>
          {npc.type},{npc.alignment}
        </Card.Header>
        <Card.Body>
          <Card.Text>Armor Class {npc.armorClass} </Card.Text>

          <Card.Text>
            Hit Points {npc.hitPoints} ({npc.hitDice})
            <input
              min={0}
              onChange={(event) => hitpointsChange()}
              className="hit-points-input"
              type="number"
            />
          </Card.Text>
          <Card.Text>
            Speed {npc.speed?.walk}
            {npc.speed?.fly && `, fly ${npc.speed.fly}`}
            {npc.speed?.swim && `, swim ${npc.speed.swim}`}
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
                  {npc.strength
                    && `${npc.strength} (${getStatBonus(npc.strength)})`
                    }
                </th>
                <th>
                  {npc.dexterity
                    && `${npc.dexterity} (${getStatBonus(npc.dexterity)})`
                    }
                </th>
                <th>
                  {npc.constitution
                    && `${npc.constitution} (${getStatBonus(
                        npc.constitution
                      )})`
                    }
                </th>
                <th>
                  {npc.intelligence
                    && `${npc.intelligence} (${getStatBonus(
                        npc.intelligence
                      )})`
                    }
                </th>
                <th>
                  {npc.wisdom
                    && `${npc.wisdom} (${getStatBonus(npc.wisdom)})`
                    }
                </th>
                <th>
                  {npc.charisma
                    && `${npc.charisma} (${getStatBonus(npc.charisma)})`
                    }
                </th>
              </tr>
            </tbody>
          </Table>

          {npc.proficiencies  && displayProficiences(npc.proficiencies)}
          {npc.damageImmunities?.length && (
            <Card.Text>Damage Immunities:{npc.damageImmunities}</Card.Text>
          ) }
          {npc.damageResistances?.length && (
            <Card.Text>Damage Resistances:{npc.damageResistances}</Card.Text>
          ) }
          {npc.damageVulnerabilities?.length && (
            <Card.Text>
              Damage Vulnerabilities:{npc.damageVulnerabilities}
            </Card.Text>
          ) }
          <Card.Text>
            Senses:
            {npc.senses?.passivePerception
              &&`Passive Perception ${npc.senses.passivePerception}`
              }
            {npc.senses?.blindsight
              && `, Blindsight ${npc.senses.blindsight}`
              }
            {npc.senses?.darkvision
              && `, Darkvision ${npc.senses.darkvision}`
              }
          </Card.Text>
          <Card.Text>Languages: {npc.languages}</Card.Text>
          <Card.Text>
            Challenge: {npc.challengeRaiting} ({npc.xp}XP)
          </Card.Text>
        </Card.Body>
        <Card.Body>
          Special abilites:
          {npc.specialAbilities
            && displayActionsList(npc.specialAbilities)
            }
        </Card.Body>
        <Card.Header>Actions</Card.Header>
        {npc.actions && displayActionsList(npc.actions) }
        {npc.legendaryActions && (
          <Card.Header>Legendary Actions</Card.Header>
        ) }
        {npc.legendaryActions
          && displayActionsList(npc.legendaryActions)
          }
      </Card>
    </div>
  );
};

export default BattleNpcCard;
