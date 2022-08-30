import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { PlayerCharacter, CharacterInputCardProps } from '../../../interfaces';
import './CharacterInputCard.css';

const _DUMMY_CHARACTER: PlayerCharacter = {
  characterName: '',
  playerName: '',
  armorClass: 0,
  maxHitpoints: 0,
  hitPoints: 0,
  speed: 0,
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
  passivePreception: 0,
  darkvision: false,
  languages: '',
  discription: '',
  characterType: 'playerCharacter',
  id:'',
  level:0
};

const CharacterInputCard: React.FC<CharacterInputCardProps> = ({
  addOrEditPartyMember,
  characterToEdit,
}) => {
  const [characterCandidate, setCharacterCandidate] = useState<PlayerCharacter>(
    characterToEdit ? characterToEdit : _DUMMY_CHARACTER
  );
  const [validated, setValidated] = useState<boolean|undefined>(false);

  useEffect(() => {
    if (characterToEdit) {
      setCharacterCandidate(characterToEdit);
    }
  }, [characterToEdit]);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
      console.log(event.currentTarget);
      
    setValidated(true);
    if (characterCandidate.playerName && characterCandidate.characterName) {
      setCharacterCandidate(_DUMMY_CHARACTER);
      addOrEditPartyMember(characterCandidate);
      setValidated(undefined);
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.type);
    
    if (
      event.target.type === 'number' &&
      !isNaN(parseInt(event.target.value))
    ) {
      const value = parseInt(event.target.value);
      setCharacterCandidate({
        ...characterCandidate,
        [event.target.name]: value,
      });
    }
    if (event.target.type === 'text' || event.target.type === 'checkbox'|| event.target.type ==='textarea') {
      setCharacterCandidate({
        ...characterCandidate,
        [event.target.name]: event.target.value,
      });
    }
  };
  return (
    <div>
      <div className="characterInputContainer">
        <Card className='characterInputCard'>
          <Card.Header>
            <h3>{characterToEdit ? 'Edit party member' : 'Add party member'}</h3>
          </Card.Header>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="characterName">
              <Form.Label>Character name</Form.Label>
              <Form.Control
                className="charInput"
                required
                type="text"
                name="characterName"
                value={characterCandidate.characterName}
                onChange={handlerChange}
              />
              <Form.Control.Feedback  >Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback  type="invalid">
                Please enter character name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="playerName">
              <Form.Label>Player name</Form.Label>
              <Form.Control
                className="charInput"
                required
                type="text"
                name="playerName"
                value={characterCandidate.playerName}
                onChange={handlerChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter player name.
              </Form.Control.Feedback>
            </Form.Group>
            <Row className='mb-4'>
              <Form.Group as={Col} controlId="level">
              <Form.Label>Level</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  className="charInput"
                  type="number"
                  required
                  name="level"
                  value={characterCandidate.level}
                  onChange={handlerChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter character level.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="armorClass">
              <Form.Label>Armor Class</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  className="charInput"
                  type="number"
                  required
                  name="armorClass"
                  value={characterCandidate.armorClass}
                  onChange={handlerChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter character armor class.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="speed">
              <Form.Label>Speed</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  className="charInput"
                  type="number"
                  required
                  name="speed"
                  value={characterCandidate.speed}
                  onChange={handlerChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter character speed.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} controlId="maxHitpoins">
              <Form.Label>Max hit poinst</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  className="charInput"
                  type="number"
                  required
                  name="maxHitpoints"
                  value={characterCandidate.maxHitpoints}
                  onChange={handlerChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter character speed.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>STR</Form.Label>
                <Form.Control
                  className='characteristicInput'
                  type="number"
                  required
                  name="strength"
                  value={characterCandidate.strength}
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>DEX</Form.Label>
                <Form.Control
                  className='characteristicInput'
                  type="number"
                  required
                  name="dexterity"
                  value={characterCandidate.dexterity}
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom03">
                <Form.Label>CON</Form.Label>
                <Form.Control
                  className='characteristicInput'
                  type="number"
                  required
                  name="constitution"
                  value={characterCandidate.constitution}
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom04">
                <Form.Label>INT</Form.Label>
                <Form.Control
                  className='characteristicInput'
                  type="number"
                  required
                  name="intelligence"
                  value={characterCandidate.intelligence}
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom05">
                <Form.Label>WIS</Form.Label>
                <Form.Control
                  className='characteristicInput'
                  type="number"
                  required
                  name="wisdom"
                  value={characterCandidate.wisdom}
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom06">
                <Form.Label>CHA</Form.Label>
                <Form.Control
                  className='characteristicInput'
                  type="number"
                  required
                  name="charisma"
                  value={characterCandidate.charisma}
                  onChange={handlerChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} md="4" controlId="passivePerseption">
                <Form.Label>Languages</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className="charInput"
                    type="number"
                    required
                    name="languages"
                    value={characterCandidate.languages}
                    onChange={handlerChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter passive perseption.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="passivePerseption">
                <Form.Label>Passive perseption</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    className="charInput"
                    type="number"
                    required
                    name="passivePreception"
                    value={characterCandidate.passivePreception}
                    onChange={handlerChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter passive perseption.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="darkvision">
                <Form.Label>Darkvision</Form.Label>
                <Form.Check
                  name="darkvision"
                  value={`${characterCandidate.darkvision}`}
                  onChange={handlerChange}
                />
              </Form.Group>
            </Row>
            <Form.Group  controlId="discription">
              <Form.Label>Discription</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  as="textarea"
                  className="charInput characterDiscription"
                  type="text"
                  name="discription"
                  value={characterCandidate.discription}
                  onChange={handlerChange}
                />
              </InputGroup>
            </Form.Group>
            <Button className='addEditBtn' type="submit">{characterToEdit ? characterToEdit.id? 'Edit':'Add' : 'Add'}</Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default CharacterInputCard;
