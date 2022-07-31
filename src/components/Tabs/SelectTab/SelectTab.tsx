import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Button, Form } from 'react-bootstrap';
import './SelectTab.css';
import CharacterInputCard from '../../Cards/CharacterInputCard';
import { SelectTabProps, Party, PlayerCharacter } from '../../../interfaces';
import CharacterInfoCard from '../../Cards/CharacterInfoCard/CharacterInfoCard';

const _DUMMY_PARTY: Party = { partyName: '', partyMembers: [] };
const SelectTab: React.FC<SelectTabProps> = ({
  activeParties,
  addParty,
  submitCharacters,
}) => {
  const [currentParty, setCurrentParty] = useState<Party>(
    activeParties.length ? activeParties[0] : _DUMMY_PARTY
  );

  const addPartyMember = (candidate: PlayerCharacter) => {
    const newParty = [...currentParty.partyMembers, candidate];
    setCurrentParty({ ...currentParty, partyMembers: newParty });
  };
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentParty({ partyName: event.target.value, partyMembers: [] });
  };
  const namesList = activeParties.map(({ partyName }, idx) => (
    <div className="itemContainer" key={partyName}>
      <ListGroup.Item
        onClick={() => {
          setCurrentParty(activeParties[idx]);
        }}
        action
        href={`#${partyName}`}
      >
        {partyName}
      </ListGroup.Item>
    </div>
  ));

  const tabContent = activeParties.map(({ partyName, partyMembers }) => {
    const members = partyMembers.map(({ characterName }) => (
      <ListGroup.Item key={characterName}>{characterName}</ListGroup.Item>
    ));
    return (
      <div key={partyName}>
      <Tab.Pane  eventKey={`#${partyName}`}>
        <ListGroup>
          {members}
        </ListGroup>
      </Tab.Pane>
       <Button
          onClick={() => {
            submitCharacters(currentParty);
          }}
        >
          Create Fight for this party
        </Button>
      </div>
    );
  });

  return (
    <div className="selectTabContainer">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row className="infoContainer">
          <Col className="selectContainer">
            <ListGroup>
              {namesList}
              <ListGroup.Item
                onClick={() => {
                  setCurrentParty(_DUMMY_PARTY);
                }}
                action
                href="#add"
              >
                {'<Add party>'}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <Tab.Content>
              {tabContent}
              <Tab.Pane eventKey="#add">
                <Form.Group controlId="characterName">
                  <Form.Label>Party name</Form.Label>
                  <Form.Control
                    className="partyNameInput"
                    required
                    type="text"
                    name="characterName"
                    value={currentParty.partyName}
                    onChange={handlerChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter character name.
                  </Form.Control.Feedback>
                </Form.Group>
                {currentParty.partyName ? (
                  <CharacterInputCard addPartyMember={addPartyMember} />
                ) : null}
                {currentParty.partyName ? (
                  <Button
                    onClick={() => {
                      addParty(currentParty);
                    }}
                  >
                    Add party
                  </Button>
                ) : null}
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col>
            Characters info
            <CharacterInfoCard partyMembers={currentParty.partyMembers} />
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default SelectTab;
