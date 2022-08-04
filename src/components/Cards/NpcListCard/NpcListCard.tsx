import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { NpcListCardProps } from '../../../interfaces';
import ListGropItem from '../../ListGroupItem';

const NpcListCard: FC<NpcListCardProps> = ({ npcArray, deleteHandler }) => {
    
  const npcList = npcArray.map((npc, index) => (
    <ListGropItem key={index} itemName={npc.name} deleteHandler={deleteHandler} selectHandler={()=>{}} id={npc.name} />
  ));
  return <ListGroup>{npcList}</ListGroup>;
};

export default NpcListCard;
