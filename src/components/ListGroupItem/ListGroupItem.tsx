import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

export interface ListGropItemProps {
  id?: string;
  selectHandler: Function;
  itemName:string;
  deleteHandler:Function;
  href?:string;
}

const ListGropItem: React.FC<ListGropItemProps> = ({
  id,
  selectHandler,
  itemName,
  deleteHandler,
  href
}) => {
  return (
    <div className="listGroupBtnContainer" key={id}>
      <ListGroup.Item className="listGroupItemContainer" action href={href}>
        <div
          className="listGroupItem"
          onClick={() => { selectHandler(id)
          }}
        >
          {itemName}
        </div>
      </ListGroup.Item>
      <Button onClick={()=>{deleteHandler(id)}} className="listGroupBtn">Delete</Button>
    </div>
  );
};

export default ListGropItem;
