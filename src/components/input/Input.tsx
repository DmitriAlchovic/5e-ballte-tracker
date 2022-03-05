import React, { ChangeEventHandler } from "react";
import { Form } from "react-bootstrap";
import { CreateFightProps } from "../../interfaces";
import "./Input.css";

const Input: React.FC<CreateFightProps> = ({
  changeHandler,
  inputType,
  value,
  inputName,
  id
}) => {
  return (
    <div className="NumberOf">
    <Form.Group  >
      <Form.Label >{inputName}</Form.Label>
      <Form.Control
        name={inputName}
        value={value}
        required ={true}
        type={inputType}
        placeholder={inputName}
        onChange={changeHandler}
        id={id}
      />
      
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
</div>
  );
};

export default Input;
