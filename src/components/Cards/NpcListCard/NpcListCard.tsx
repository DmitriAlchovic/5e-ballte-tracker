import React, { FC } from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import { NpcListCardProps } from '../../../interfaces';
import ListGropItem from '../../ListGroupItem';

const NpcListCard: FC<NpcListCardProps> = ({
  npcArray,
  deleteHandler,
  hasSwitch,
  toggleFriendly,
}) => {
  const npcList = npcArray.map((npc, index) => (
    <div className='listCardSwitchContainer' key={index}>
      <ListGropItem
        key={index}
        itemName={npc.name}
        deleteHandler={deleteHandler}
        selectHandler={() => {}}
        id={npc.name}
      />
      {hasSwitch && (
        <Form>
          <Form.Check
            onClick={(e) => toggleFriendly(e)}
            type="switch"
            id={index.toString()}
            name="isFriendly"
            label="Friendly NPC?"
            checked={npc.isFriendly}
          />
        </Form>
      )}
    </div>
  ));
  return <ListGroup>{npcList}</ListGroup>;
};

export default NpcListCard;
