import React, { useContext } from "react";
import SelectTab from "../../components/tabs/SelectTab";
import BattleContext from "../../context/BattleContext";
import { Navigate } from "react-router-dom";

const FightPage = () => {
  const Arr = useContext(BattleContext);
  
  if(!Arr[0]) {
    return <Navigate to="/"/>
  }

  return (
    <React.Fragment>
      <SelectTab></SelectTab>
    </React.Fragment>
  );
};

export default FightPage;
