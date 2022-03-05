import React, { useContext } from "react";
import SelectTab from "../../components/tabs/SelectTab";
import BattleContext from "../../context/BattleContext";

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
