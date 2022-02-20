import React, { useState, ReactNode } from "react";
import { Card, Form } from "react-bootstrap";
import "./InputCard.css";
interface InputCardProps {
  enemy: boolean;
  id: string;
}

const InputCard: React.FC<InputCardProps> = ({ children, enemy, id }) => {

  return (
    <div className="inputCard">
      <Card border="primary">
        <Card.Header><h2>Roll initiative!</h2></Card.Header>
        <Card.Body>
          <Card.Title>{enemy ? "Create enemy" : "Create player"}</Card.Title>
          {React.Children.map<ReactNode, ReactNode>(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { id: id });
            } else return null;
          })}
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InputCard;
