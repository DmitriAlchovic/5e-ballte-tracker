import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Party } from '../../interfaces';

interface ListGropItemProps {
  link: string;
  partyList: Party[];
}

const ListGropItem: React.FC<ListGropItemProps> = ({ link, partyList }) => {
  const list = partyList.map((party) => (
    <ListGroup.Item key={party.partyName} action href={party.partyName}>
      {party.partyName}
    </ListGroup.Item>
  ));

  return <div>{list}</div>;
};

export default ListGropItem;
