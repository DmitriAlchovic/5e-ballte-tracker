import React, { FC, useEffect, useState } from 'react';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
import './InitiativePage.css';

export interface InitiativePageProps {
  characterArray: any;
  npcArray: any;
  submitInitiative: Function;
}

const InitiativePage: FC<InitiativePageProps> = ({
  characterArray,
  npcArray,
  submitInitiative,
}) => {
  const [initiativeList, setInitiativeList] = useState<any>();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const npcDefaultInitiative = npcArray.reduce(
      (prevNpc: any, nextNpc: any) => {
        return { ...prevNpc, [nextNpc.id]: '' };
      },
      {}
    );
    const characterDefaultInitiative = characterArray.reduce(
      (prevChar: any, nextChar: any) => {
        return { ...prevChar, [nextChar.id]: '' };
      },
      {}
    );

    setInitiativeList({
      ...npcDefaultInitiative,
      ...characterDefaultInitiative,
    });
  }, [npcArray, characterArray]);

  const allItemsEntered = (object: any) => {
    for (const item in object) {
      if (object[item] === '') {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    if (initiativeList) {
      const hasData = allItemsEntered(initiativeList);
      setValidated(hasData);
    }
  }, [initiativeList]);

  const changeInitiativeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setInitiativeList({ ...initiativeList, [event.target.name]: value });
    }
  };

  let characterNameList = null;
  if (initiativeList) {
    characterNameList = characterArray.map((char: any) => (
      <InputGroup className="mb-3" key={char.id}>
        <InputGroup.Text id="inputGroup-sizing-default">
          {char.characterName}
        </InputGroup.Text>
        <Form.Control
          required
          onChange={changeInitiativeHandler}
          name={char.id}
          value={initiativeList[char.id]}
          type="number"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <Form.Control.Feedback type="invalid">
          Please enter initiative
        </Form.Control.Feedback>
      </InputGroup>
    ));
  }

  let npcNameList = null;
  if (initiativeList) {
    npcNameList = npcArray.map((npc: any) => (
      <InputGroup className="mb-3" key={npc.id}>
        <InputGroup.Text id="inputGroup-sizing-default">
          {npc.name}
        </InputGroup.Text>
        <Form.Control
          className='initiativeInput'
          required
          onChange={changeInitiativeHandler}
          name={npc.id}
          value={initiativeList[npc.id]}
          type="number"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <Form.Control.Feedback type="invalid">
          Please enter initiative
        </Form.Control.Feedback>
      </InputGroup>
    ));
  }
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    event.stopPropagation();
    submitInitiative(initiativeList);
  };

  return (
    <div className="initiativePageContainer">
      <h1>Roll initiative!</h1>
      <div className="inputCardsContainer">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Card>
            <Card.Header>Party</Card.Header>
            <Card.Body>{characterNameList}</Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Header>Npc</Card.Header>
              {npcNameList}
            </Card.Body>
            <Card.Footer>
              {validated ? (
                <Button
                  className="submitInitiativeBtn"
                  variant="success"
                  type="submit"
                >
                  Done!
                </Button>
              ) : (
                <Button
                  className="submitInitiativeBtn"
                  variant="secondary"
                  disabled
                >
                  Done!
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default InitiativePage;
