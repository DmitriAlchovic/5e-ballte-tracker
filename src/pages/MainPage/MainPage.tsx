import React, {  useEffect, useState } from 'react';
import SelectTab from '../../components/Tabs/SelectTab';
import { useStorage } from '../../hooks/storage.hook';
import { Party } from '../../interfaces';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorToast from '../../components/ErrorToast';
import './MainPage.css';

const MainPage: React.FC<any> = ({ submitCharacters }) => {
  const partyList = useStorage('partyList');
  const [activeParties, setActiveParties] = useState<Party[]>();

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
        throw new Error('error');
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
      console.log(newPartyList,activeParties,partyList.item);
    }
  }


  return (
    <div className="tabContainer">
      <h2>Select party</h2>
      <ErrorBoundary FallbackComponent={ErrorToast}>
        <ErrorToast></ErrorToast>
      </ErrorBoundary>
      <SelectTab
        activeParties={activeParties ? activeParties : []}
        addParty={addParty}
        submitCharacters={submitCharacters}
        editParty={editParty}
      />
    </div>
  );
};

export default MainPage;
