import React, { FC, useState } from 'react';
import {
  Form,
  Button,
  Collapse,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';
import { ConditionsInfoProps } from '../../interfaces';
import doubleArrow from '../../assets/double-arrow-white.svg';
import './ConditionsInfo.css';

const ConditionsInfo: FC<ConditionsInfoProps> = ({
  id,
  fightCharStatus,
  statusChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        className='conditionsInfoBtn'
        variant="outline-info"
        onClick={() => setOpen(!open)}
        aria-controls="collapseForm"
        aria-expanded={open}
      >
        Change status<div><img alt='' src={doubleArrow}></img></div>
      </Button>
      <Collapse in={open}>
        <Form id='collapseForm'>
          <div className="switchContainer">
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="ConcentratedOnSpell"
              label="Concentrated"
              checked={fightCharStatus[id].ConcentratedOnSpell}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Blinded"
              label="Blinded"
              checked={fightCharStatus[id].Blinded}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Charmed"
              label="Charmed"
              checked={fightCharStatus[id].Charmed}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Deafened"
              label="Deafened"
              checked={fightCharStatus[id].Deafened}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Frightened"
              label="Frightened"
              checked={fightCharStatus[id].Frightened}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Grappled"
              label="Grappled"
              checked={fightCharStatus[id].Grappled}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Incapacitated"
              label="Incapacitated"
              checked={fightCharStatus[id].Incapacitated}
            />
          </div>
          <div className="switchContainer">
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Invisible"
              label="Invisible"
              checked={fightCharStatus[id].Invisible}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Paralyzed"
              label="Paralyzed"
              checked={fightCharStatus[id].Paralyzed}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Petrified"
              label="Petrified"
              checked={fightCharStatus[id].Petrified}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Poisoned"
              label="Poisoned"
              checked={fightCharStatus[id].Poisoned}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Prone"
              label="Prone"
              checked={fightCharStatus[id].Prone}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Restrained"
              label="Restrained"
              checked={fightCharStatus[id].Restrained}
            />
            <Form.Check
              onChange={(e) => statusChange(e)}
              type="switch"
              id={id}
              name="Stunned"
              label="Stunned"
              checked={fightCharStatus[id].Stunned}
            />
            <Form.Check
              onChange={(e) => {
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
      </Collapse>
    </div>
  );
};

export default ConditionsInfo;
