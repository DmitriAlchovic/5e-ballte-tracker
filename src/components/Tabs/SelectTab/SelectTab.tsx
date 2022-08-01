import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Button, Form } from 'react-bootstrap';
import './SelectTab.css';
import CharacterInputCard from '../../Cards/CharacterInputCard';
import { SelectTabProps, Party, PlayerCharacter } from '../../../interfaces';
import CharacterInfoCard from '../../Cards/CharacterInfoCard/CharacterInfoCard';
import { nanoid } from 'nanoid';

const _DUMMY_PARTY: Party = { partyName: '', partyMembers: [] };
const SelectTab: React.FC<SelectTabProps> = ({
  activeParties,
  addParty,
  submitCharacters,
  editParty
}) => {
  const [currentParty, setCurrentParty] = useState<Party>(
    activeParties.length ? activeParties[0] : _DUMMY_PARTY
  );
  const [partyMemberToEdit, setPartyMemberToEdit] = useState<PlayerCharacter>();
  const [addPartyMode, setAddPartyMode] = useState<boolean>(false); 

  const addPartyMember = (candidate: PlayerCharacter) => {
    const candidateWithId = {...candidate,id:nanoid()};
    const newParty = [...currentParty.partyMembers, candidateWithId];
    setCurrentParty({ ...currentParty, partyMembers: newParty });
  };

  const editPartyMember = (candidate: PlayerCharacter) => {
    const idx = currentParty.partyMembers.findIndex((member:PlayerCharacter) => member.id === candidate.id);
      const newParty = [
        ...currentParty.partyMembers.slice(0, idx),
        candidate,
        ...currentParty.partyMembers.slice(idx + 1)
      ];
      const {partyName} = currentParty;
      setCurrentParty({partyName,partyMembers:newParty});
      setPartyMemberToEdit(undefined);
      editParty({partyName,partyMembers:newParty})
      
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentParty({ partyName: event.target.value, partyMembers: [] });
  };
  const namesList = activeParties.map(({ partyName }, idx) => (
    <div className="itemContainer" key={partyName}>
      <ListGroup.Item
        onClick={() => {
          setCurrentParty(activeParties[idx]);
          setPartyMemberToEdit(undefined);
        }}
        action
        href={`#${partyName}`}
      >
        {partyName}
      </ListGroup.Item>
    </div>
  ));

  const tabContent = activeParties.map(({ partyName, partyMembers }) => {
    const members = partyMembers.map(({ characterName }, idx) => (
      <ListGroup.Item
        onClick={() => {
          setPartyMemberToEdit(currentParty.partyMembers[idx]);
        }}
        action
        key={characterName}
      >
        {characterName}
      </ListGroup.Item>
    ));
    return (
      <div
        className={
          currentParty.partyName === partyName
            ? 'partyMembersContainer'
            : 'partyMembersDisplay'
        }
        key={partyName}
      >
        <Tab.Pane eventKey={`#${partyName}`}>
          <ListGroup>{members}</ListGroup>
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
                  setPartyMemberToEdit(undefined);
                  setAddPartyMode(true);
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
                {addPartyMode&&<Form.Group controlId="characterName">
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
                </Form.Group>}
                {addPartyMode && (
                  <CharacterInputCard addOrEditPartyMember={addPartyMember} />
                )}
                {addPartyMode && (
                  <Button
                    onClick={() => {
                      addParty(currentParty);
                      setAddPartyMode(false);
                    }}
                  >
                    Add party
                  </Button>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col>
            {!partyMemberToEdit && (
              <CharacterInfoCard partyMembers={currentParty.partyMembers} />
            )}
            {partyMemberToEdit && (
              <CharacterInputCard
                addOrEditPartyMember={editPartyMember}
                characterToEdit={partyMemberToEdit}
              />
            )}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default SelectTab;
