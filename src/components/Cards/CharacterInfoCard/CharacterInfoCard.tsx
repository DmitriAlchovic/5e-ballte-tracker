import React from 'react';
import { CharacterInfoCardProps } from '../../../interfaces';
import { Card, Table } from 'react-bootstrap';
import './CharacterInfoCard.css'

const CharacterInfoCard: React.FC<CharacterInfoCardProps> = ({
  partyMembers
}) => {


    const getStatBonus = (stat: number): number => {
      const statBonus = Math.floor((stat - 10) / 2);
      return statBonus;
    };
  const characterCards = partyMembers.map((playerCharacter,index) => {
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
    } = playerCharacter;

    
    return (

      <div key={index}>
        <Card border="primary">
          <Card.Header>
            <h2>{characterName}</h2>
            <h4>{playerName}</h4>
          </Card.Header>
          <Card.Body>
            <Card.Text>Armor Class {armorClass} </Card.Text>

            <Card.Text>Max Hitoints {maxHitpoints}</Card.Text>
            <Card.Text>Speed {speed}</Card.Text>

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
                    {
                      `${strength} (${getStatBonus(strength)})`}
                  </th>
                  <th>
                    {
                      `${dexterity} (${getStatBonus(dexterity)})`
                      }
                  </th>
                  <th>
                    {
                     `${constitution} (${getStatBonus(
                          constitution
                        )})`
                      }
                  </th>
                  <th>
                    {
                     `${intelligence} (${getStatBonus(
                          intelligence
                        )})`
                      }
                  </th>
                  <th>
                      {
                      `${wisdom} (${getStatBonus(wisdom)})`
                      }
                  </th>
                  <th>
                    {
                     `${charisma} (${getStatBonus(charisma)})`
                      }
                  </th>
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
  });

  return <div className='characterInfoContainer'>{characterCards}</div>;
};

export default CharacterInfoCard;
