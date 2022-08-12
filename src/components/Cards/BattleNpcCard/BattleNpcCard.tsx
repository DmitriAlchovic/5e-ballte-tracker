import React from 'react';
import {
  Card,
  Table,
  Form,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import './BattleNpcCard.css';
import {
  BattleCardProps,
  LegendaryAction,
  SpecialAbility,
  Proficiencies,
  Spell,
} from '../../../interfaces';
import SpellInfoCard from '../SpellInfoCard';

const BattleNpcCard: React.FC<BattleCardProps> = ({
  npc,
  statusChange,
  fightCharStatus,
  roundCounter,
}) => {
  const { id } = npc;


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
  const splitStr = (str: string, word: string, midleItem: any) => {
    const wordIdx = str.search(word);

    if (wordIdx !== -1) {
      const firstHalf = str.slice(0, wordIdx - 1);
      const seconHalf = str.slice(wordIdx + word.length, str.length);
      return [firstHalf, midleItem, seconHalf];
    } else {
    }
  };
  const displayActionsList = (actions: any) => {
    const actionsArr = actions.map((action: any, index: number) => {
      const hasProperty = action.hasOwnProperty('spellcasting');
      if (hasProperty) {
        const spellsCards = action.spellcasting.spells.reduce(
          (prevArr: any, { url, name }: Spell) => {
            const infoCard = <SpellInfoCard spellUrl={url} />;
            
            if (prevArr.length) {
              const descWithModal = prevArr.reduce((prev:any,item: any, idx: number) => {
                if (typeof(item)==='string' && item.search(name.toLocaleLowerCase())!==-1 ) {
                const newArr = splitStr(item,name.toLocaleLowerCase(),infoCard);
                  if(newArr?.length){
                return[...prevArr.slice(0,idx),...newArr,...prevArr.slice(idx+1)]
                  }
                }
              },[]);
              return descWithModal;
            } else {
              return splitStr(action.desc, name.toLowerCase(), infoCard);
            }
          },
          []
        );
        
        return <div className='spellLinkBtn'>{spellsCards}{action.desc}</div>;
      }
      return (
        <div key={index}>
          <Card.Text>
            {action.name}: {action.desc}
          </Card.Text>
        </div>
      );
    });
    return actionsArr;
  };
  return (
    <div className="battleCard">
      <Card>
        <Card.Header>
          <h2>{npc.name}</h2>
          {npc.type},{npc.alignment}
        </Card.Header>
        <Card.Body>
          <Card.Text>Armor Class {npc.armorClass} </Card.Text>

          <Card.Text>
            Hit Points {npc.hitPoints} ({npc.hitDice})
            <input
              id={npc.id}
              min={0}
              onChange={(event) => statusChange(event)}
              className="hit-points-input"
              type="number"
              name="hitPoints"
              value={fightCharStatus[npc.id].hitPoints}
            />
          </Card.Text>
          <Card.Text>
            Speed {npc.speed?.walk}
            {npc.speed?.fly && `, fly ${npc.speed.fly}`}
            {npc.speed?.swim && `, swim ${npc.speed.swim}`}
          </Card.Text>
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
                <th>
                  {npc.strength &&
                    `${npc.strength} (${getStatBonus(npc.strength)})`}
                </th>
                <th>
                  {npc.dexterity &&
                    `${npc.dexterity} (${getStatBonus(npc.dexterity)})`}
                </th>
                <th>
                  {npc.constitution &&
                    `${npc.constitution} (${getStatBonus(npc.constitution)})`}
                </th>
                <th>
                  {npc.intelligence &&
                    `${npc.intelligence} (${getStatBonus(npc.intelligence)})`}
                </th>
                <th>
                  {npc.wisdom && `${npc.wisdom} (${getStatBonus(npc.wisdom)})`}
                </th>
                <th>
                  {npc.charisma &&
                    `${npc.charisma} (${getStatBonus(npc.charisma)})`}
                </th>
              </tr>
            </tbody>
          </Table>

          {npc.proficiencies?.length && displayProficiences(npc.proficiencies)}
          {npc.damageImmunities.length && (
            <Card.Text>Damage Immunities:{npc.damageImmunities}</Card.Text>
          )}
          {npc.damageResistances.length && (
            <Card.Text>Damage Resistances:{npc.damageResistances}</Card.Text>
          )}
          {npc.damageVulnerabilities.length && (
            <Card.Text>
              Damage Vulnerabilities:{npc.damageVulnerabilities}
            </Card.Text>
          )}
          <Card.Text>
            Senses:
            {npc.senses?.passivePerception &&
              `Passive Perception ${npc.senses.passivePerception}`}
            {npc.senses?.blindsight && `, Blindsight ${npc.senses.blindsight}`}
            {npc.senses?.darkvision && `, Darkvision ${npc.senses.darkvision}`}
          </Card.Text>
          <Card.Text>Languages: {npc.languages}</Card.Text>
          <Card.Text>
            Challenge: {npc.challengeRaiting} ({npc.xp}XP)
          </Card.Text>
        </Card.Body>
        <Card.Body>
          Special abilites:
          {npc.specialAbilities && displayActionsList(npc.specialAbilities)}
        </Card.Body>
        <Card.Header>Actions</Card.Header>
        {npc.actions && displayActionsList(npc.actions)}
        {npc.legendaryActions?.length && (
          <Card.Header>Legendary Actions</Card.Header>
        )}
        {npc.legendaryActions && displayActionsList(npc.legendaryActions)}
      </Card>
    </div>
  );
};

export default BattleNpcCard;
