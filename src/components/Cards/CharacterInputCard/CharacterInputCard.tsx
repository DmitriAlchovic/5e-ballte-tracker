import React,{useState} from 'react';
import { Button, Card, Form, InputGroup,  Row, Col } from 'react-bootstrap';
import { PlayerCharacter, CharacterInputCardProps } from '../../../interfaces';
import './CharacterInputCard.css';

const _DUMMY_CHARACTER:PlayerCharacter = {
characterName:'',
playerName:'',
armorClass:0,
maxHitpoints:0,
currentHitpoints:0,
speed:0,
strength:0,
dexterity:0,
constitution:0,
intelligence:0,
wisdom:0,
charisma:0,
passivePreception:0,
darkvision:false,
languages:'',
discription:'',
characterType:"playerCharacter"
}

const CharacterInputCard: React.FC<CharacterInputCardProps> = ({addPartyMember}) => {
  const [characterCandidate, setCharacterCandidate] = useState<PlayerCharacter>(_DUMMY_CHARACTER);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event:any) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if(characterCandidate.playerName && characterCandidate.characterName){
    setCharacterCandidate(_DUMMY_CHARACTER);
    addPartyMember(characterCandidate);
    }
     event.preventDefault();
      event.stopPropagation();
  };            

  const handlerChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    
   if (event.target.type==='number' && !isNaN(parseInt(event.target.value))){
    const value = parseInt(event.target.value);
    setCharacterCandidate({...characterCandidate, [event.target.name]:value}) 
   } 
   if(event.target.type==='text' || event.target.type === 'checkbox') {
    setCharacterCandidate({...characterCandidate, [event.target.name]:event.target.value}) 
   }
  }
  return (
    <div>
      <div className="characterInputContainer">
        <Card>
        <Form noValidate validated={validated} onSubmit={handleSubmit} >
        <Form.Group controlId='characterName'  >
          <Form.Label >Character name</Form.Label>
          <Form.Control
            className='charInput'
            required
            type="text"
            name='characterName'
            value={characterCandidate.characterName}
            onChange = {handlerChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Please enter character name.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId='playerName'>
          <Form.Label>Player name</Form.Label>
          <Form.Control
            className='charInput'
            required
            type="text"
            name='playerName'
            value={characterCandidate.playerName}
            onChange={handlerChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
              Please enter player name.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='armorClass' >
          <Form.Label>Armor Class</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
            className='charInput'
              type="number"
              required
              name='armorClass'
              value={characterCandidate.armorClass}
              onChange={handlerChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter character armor class.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId='speed'>
          <Form.Label>Speed</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
            className='charInput'
              type="number"
              required
              name='speed'
              value={characterCandidate.speed}
              onChange={handlerChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter character speed.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      <Row className="mb-6">
        <Form.Group as={Col} md="2" controlId="validationCustom01">
          <Form.Label>STR</Form.Label>
          <Form.Control type="number" required name='strength' value={characterCandidate.strength} onChange={handlerChange}  />
          
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom02">
          <Form.Label>DEX</Form.Label>
          <Form.Control type="number" required name='dexterity' value={characterCandidate.dexterity} onChange={handlerChange} />
          
          </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom03">
          <Form.Label>CON</Form.Label>
          <Form.Control type="number" required name="constitution" value={characterCandidate.constitution} onChange={handlerChange} />
          
        </Form.Group>
        <Form.Group as={Col} md="2" controlId="validationCustom04">
          <Form.Label>INT</Form.Label>
          <Form.Control type="number" required name="intelegence" value={characterCandidate.intelligence} onChange={handlerChange} />
          
        </Form.Group>
<Form.Group as={Col} md="2" controlId="validationCustom05">
          <Form.Label>WIS</Form.Label>
          <Form.Control type="number" required  name="wisdom" value={characterCandidate.wisdom} onChange={handlerChange} />
          
        </Form.Group>
<Form.Group as={Col} md="2" controlId="validationCustom06">
          <Form.Label>CHA</Form.Label>
          <Form.Control type="number" required name="charisma" value={characterCandidate.charisma} onChange={handlerChange} />
          
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col} md="4" controlId='passivePerseption' >
          <Form.Label>Passive perseption</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
            className='charInput'
              type="number"
              required
              name='passivePerseption'
              value={characterCandidate.passivePreception}
              onChange={handlerChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter passive perseption.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      <Form.Group as={Col} md="4" controlId='darkvision'>
          <Form.Label>Darkvision</Form.Label>
        <Form.Check name='darkvision' value={`${characterCandidate.darkvision}`} onChange={handlerChange} 
        />
      </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button> 
        </Form>
        </Card>
      </div>
    </div>
  );
};

export default CharacterInputCard;
