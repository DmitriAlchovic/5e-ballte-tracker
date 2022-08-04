import React, { useState } from 'react';
import {
  ListGroup,
  Tab,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import './SelectTab.css';
import CharacterInputCard from '../../Cards/CharacterInputCard';
import { SelectTabProps, Party, PlayerCharacter } from '../../../interfaces';
import CharacterInfoCard from '../../Cards/CharacterInfoCard/CharacterInfoCard';
import { nanoid } from 'nanoid';
import ListGropItem from '../../ListGroupItem';

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
  id:''
};
const _DUMMY_PARTY: Party = { partyName: '', partyMembers: [] };
const SelectTab: React.FC<SelectTabProps> = ({
  activeParties,
  addParty,
  submitCharacters,
  editParty,
  deleteParty,
}) => {
  const [currentParty, setCurrentParty] = useState<Party>(
    activeParties.length ? activeParties[0] : _DUMMY_PARTY
  );
  const [partyMemberToEdit, setPartyMemberToEdit] = useState<PlayerCharacter>();
  const [addPartyMode, setAddPartyMode] = useState<boolean>(false);

  const addPartyMember = (candidate: PlayerCharacter) => {
    const candidateWithId = { ...candidate, id: nanoid() };
    const newParty = [...currentParty.partyMembers, candidateWithId];
    setCurrentParty({ ...currentParty, partyMembers: newParty });
    if (addPartyMode === false) {
      editParty({ ...currentParty, partyMembers: newParty });
    }
  };

  const editPartyMember = (candidate: PlayerCharacter) => {
    if (candidate.id) {
      const idx = currentParty.partyMembers.findIndex(
        (member: PlayerCharacter) => member.id === candidate.id
      );
      const newParty = [
        ...currentParty.partyMembers.slice(0, idx),
        candidate,
        ...currentParty.partyMembers.slice(idx + 1),
      ];
      const { partyName } = currentParty;
      setCurrentParty({ partyName, partyMembers: newParty });
      setPartyMemberToEdit(undefined);
      editParty({ partyName, partyMembers: newParty });
    } else {
      addPartyMember(candidate);
    }
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentParty({ partyName: event.target.value, partyMembers: [] });
  };

  const namesList = activeParties.map(({ partyName }, idx) => (
    <div className="itemContainer" key={partyName}>
      <ListGropItem
        selectHandler={() => {
          setCurrentParty(activeParties[idx]);
          setPartyMemberToEdit(undefined);
        }}
        itemName={partyName}
        deleteHandler={() => deleteParty(idx)}
        href={`#${partyName}`}
      ></ListGropItem>
    </div>
  ));

  const partyMemberEditorHandler = (id: string) => {
    const idx = currentParty.partyMembers.findIndex(
      (member) => member.id === id
    );
    setPartyMemberToEdit(currentParty.partyMembers[idx]);
  };

  const partyMemberDeleteHandler = (id: string) => {
    const idx = currentParty.partyMembers.findIndex(
      (member) => member.id === id
    );
    const newParty = [
      ...currentParty.partyMembers.slice(0, idx),
      ...currentParty.partyMembers.slice(idx + 1),
    ];
    const { partyName } = currentParty;
    setCurrentParty({ partyName, partyMembers: newParty });
    setPartyMemberToEdit(undefined);
    editParty({ partyName, partyMembers: newParty });
  };

  const tabContent = activeParties.map(({ partyName, partyMembers }) => {
    const members = partyMembers.map(({ characterName, id }, idx) => (
      <ListGropItem
        key={idx}
        itemName={characterName}
        selectHandler={partyMemberEditorHandler}
        id={id}
        deleteHandler={partyMemberDeleteHandler}
      />
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
        <div>
          <Tab.Pane eventKey={`#${partyName}`}>
            <ListGroup>{members}</ListGroup>
            <ListGroup>
              <ListGroup.Item
                action
                onClick={() => {
                  setPartyMemberToEdit(_DUMMY_CHARACTER);
                }}
              >
                {'<Add party member>'}
              </ListGroup.Item>
            </ListGroup>
          </Tab.Pane>
        </div>
        <Button
          className="createfightBtn"
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
                {addPartyMode && (
                  <InputGroup hasValidation>
                    <Form.Group controlId="partyName">
                      <Form.Label>Party name</Form.Label>
                      <div className="addPartyContainer">
                        <div>
                          <Form.Control
                            isInvalid={currentParty.partyName ? false : true}
                            className="partyNameInput"
                            required
                            type="text"
                            name="partyName"
                            value={currentParty.partyName}
                            onChange={handlerChange}
                          />

                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">
                            Please enter party name.
                          </Form.Control.Feedback>
                        </div>
                        <Button
                          href={`#${currentParty.partyName}`}
                          onClick={() => {
                            if (currentParty.partyName) {
                              addParty(currentParty);
                              setAddPartyMode(false);
                            }
                          }}
                        >
                          Add party
                        </Button>
                      </div>
                    </Form.Group>
                  </InputGroup>
                )}
                {addPartyMode && (
                  <CharacterInputCard addOrEditPartyMember={addPartyMember} />
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
