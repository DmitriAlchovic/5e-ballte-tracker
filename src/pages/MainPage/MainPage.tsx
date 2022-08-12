import React, {  useEffect, useState } from 'react';
import SelectTab from '../../components/Tabs/SelectTab';
import { useStorage } from '../../hooks/storage.hook';
import { Party } from '../../interfaces';
import ErrorToast from '../../components/ErrorToast';
import './MainPage.css';

const MainPage: React.FC<any> = ({ submitCharacters }) => {
  const partyList = useStorage('partyList');
  const [activeParties, setActiveParties] = useState<Party[]>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (partyList.item) {
      setActiveParties(partyList.item);
    }
  }, [partyList]);

  const addParty = (newParty: Party) => {
    if (activeParties?.length) {
      const partyExists = activeParties.filter(
        ({ partyName }) => partyName === newParty.partyName
      );

      if (!partyExists.length) {
        partyList.createStorage([...activeParties, newParty]);
      } else {
        const e = new Error('Party with that name alreadu exist');
        setError(e.message)
      }
    } else {
      partyList.createStorage([newParty]);
    }
  };
  const editParty = (editedParty:Party) =>{
    if(activeParties){
    const idx = activeParties.findIndex((party:Party) => party.partyName === editedParty.partyName);
      const newPartyList = [
        ...activeParties.slice(0, idx),
        editedParty,
        ...activeParties.slice(idx + 1)
      ];
      partyList.createStorage(newPartyList)
    }
  }

  const deleteParty = (idx:number) =>{
    if(activeParties){
      const newPartyList = [
        ...activeParties.slice(0, idx),
        ...activeParties.slice(idx + 1)
      ];
      partyList.createStorage(newPartyList)
    }
  }


  return (
    <div className="tabContainer">
      <h2>Select party</h2>
        <ErrorToast error={error} closeErrorHandler={()=>{setError(null)}} ></ErrorToast>
      <SelectTab
        activeParties={activeParties ? activeParties : []}
        addParty={addParty}
        deleteParty={deleteParty}
        submitCharacters={submitCharacters}
        editParty={editParty}
      />
    </div>
  );
};

export default MainPage;
