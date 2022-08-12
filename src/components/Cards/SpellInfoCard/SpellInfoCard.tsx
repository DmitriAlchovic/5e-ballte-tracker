import React, { FC, useEffect, useState } from 'react';
import { SpellInfoCardProps } from '../../../interfaces';
import { Button, Modal } from 'react-bootstrap';
import Service from '../../../services/api';

const SpellInfoCard: FC<SpellInfoCardProps> = ({ spellUrl }) => {
  const [spell, setSpell] = useState<any>();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const findSpell = async () => {
      const reqSpell = await Service.getItem(spellUrl);
      setSpell(reqSpell.spell);
    };
    findSpell();
  }, [spellUrl]);

  const classesList = (classes: any) => {
    const classesListArr = classes.map(({ name }: any) => name);

    return classesListArr.toString();
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <span>
      {spell && (
        <span>
          <Button className='showModalBtn' variant="link" onClick={handleShow}>
            {spell.name}
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{spell.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Classes: {classesList(spell.classes)}</p>
              <p>School: {spell.school.name}</p>
              <p>Level: {spell.level}</p>
              <p>Casting time: {spell.casting_time}</p>
              <p>Attack type: {spell.attack_type}</p>
              <p>Range: {spell.range}</p>
              <p>Components: {spell.components.toString()}</p>
              <p>Duration: {spell.duration}</p>
              <p>{spell.desc}</p>
            </Modal.Body>
            {spell.higher_level&&<Modal.Footer>
              <p>On higher level:</p>
              <p>{spell.higher_level}</p>
            </Modal.Footer>}
          </Modal>
        </span>
      )}
    </span>
  );
};

export default SpellInfoCard;
