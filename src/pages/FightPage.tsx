import React, { useContext } from "react";
import SelectTab from "../components/TabCard/SelectTab";
import BattleContext from "../context/battle-context";

const FightPage = () => {
  const Arr = useContext(BattleContext);

  console.log(Arr, "From context");

  return (
    <React.Fragment>
      <SelectTab></SelectTab>
    </React.Fragment>
  );
};

export default FightPage;
