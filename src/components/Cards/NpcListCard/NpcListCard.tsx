import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NpcListCardProps } from '../../../interfaces';

const NpcListCard: FC<NpcListCardProps> = ({ npcArray }) => {
    
  const npcList = npcArray.map((npc, index) => (
    <ListGroup.Item key={index}>{npc.name}</ListGroup.Item>
  ));
  return <ListGroup>{npcList}</ListGroup>;
};

export default NpcListCard;
