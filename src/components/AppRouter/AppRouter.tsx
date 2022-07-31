import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import FightPage from '../../pages/FightPage/FightPage';
import NavBar from '../Nav/NavBar';
import {
  InitiativeList,
  Party,
  PlayerCharacter,
} from '../../interfaces';
import CreatePage from '../../pages/CreatePage';
import './AppRouter.css';
import InitiativePage from '../../pages/InitiativePage';

const AppRouter = () => {
  const navigate = useNavigate();
  const [charArray, setCharArray] = useState<PlayerCharacter[]>([]);
  const [npcArray, setNpcArray] = useState([]);
  const [initiativeList, setInitiativeList] = useState<InitiativeList>();

  const submitParty = (party: Party) => {
    setCharArray(party.partyMembers);
    navigate('/create/');
  };

  const submitNpc = (npcArrayToApply: any) => {
    setNpcArray(npcArrayToApply);
  };

  const submitInitiative = (initiativeListCandidate: InitiativeList) => {
    setInitiativeList({ ...initiativeListCandidate });
    navigate('/fight/');
  };

  return (
    <div className="mainContainer">
      <NavBar />
      <Routes>
        <Route
          element={<MainPage submitCharacters={submitParty} />}
          path="/"
        ></Route>
        <Route
          element={<CreatePage submitNpc={submitNpc} />}
          path="/create/"
        ></Route>
        <Route
          element={
            <InitiativePage
              npcArray={npcArray}
              characterArray={charArray}
              submitInitiative={submitInitiative}
            />
          }
          path="/initiative/"
        ></Route>
        <Route
          element={
            <FightPage
              npcArray={npcArray}
              partyArray={charArray}
              initiativeList={initiativeList}
            />
          }
          path="/fight/"
        ></Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
