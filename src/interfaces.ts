

export interface CreateFightProps {
    inputName:string;
    value:number|string;
    inputType:string;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    id:string;

  }