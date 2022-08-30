import React, { useState, useEffect, useRef, FC } from 'react';
import Service from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Character, Monster, PlayerCharacter } from '../../interfaces';
import NpcInfoCard from '../../components/Cards/NpcInfoCard';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NpcListCard from '../../components/Cards/NpcListCard';
import './CreatePage.css';
import DifficultyInfo from '../../components/DifficultyInfo';

interface CreatePageProps {
  submitNpc: Function;
  currentParty:PlayerCharacter[];
}

const CreatePage: FC<CreatePageProps> = ({ submitNpc, currentParty }) => {
  const [npc, setNpc] = useState('');
  const [npcArrayCandidate, setNpcArray] = useState<any>([]);
  const [lists, setLists] = useState();
  const [selectedCharacter, setSelectedCharacter] = useState<any>();
  let monsters = useRef();

  useEffect(() => {
    const monstersList = async () => {
      const Arr = await Service.getMonstersList();
      monsters.current = Arr.map((monster: Monster) => {
        return (
          <option key={monster.index} value={monster.index}>
            {monster.name}
          </option>
        );
      });
      setLists(monsters.current);
    };
    monstersList();
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNpc(event.target.value);
  };

  useEffect(() => {
    if (npc) {
      const setActiveNpc = async () => {
        const findCharacter = await Service.getMonster(npc);
        setSelectedCharacter(findCharacter);
      };
      setActiveNpc();
    }
  }, [npc]);

  const addNpcHandler = () => {
    const hasNpc = npcArrayCandidate.find(
      ({ name }: Character) => name === selectedCharacter.name
    );
    if (hasNpc) {
      const duplicatesOfNpc = npcArrayCandidate.reduce(
        (counter: number, item: Character) => {
          if (item.name === `${selectedCharacter.name} ${counter}`) {
            return counter + 1;
          } else {
            return counter;
          }
        },
        1
      );
      const newNpc = {
        ...selectedCharacter,
        name: `${selectedCharacter.name} ${duplicatesOfNpc}`,
        isFriendly:false,
      };
      setNpcArray([...npcArrayCandidate, newNpc ]);
    } else {
      const newNpc = {...selectedCharacter, isFriendly:false}
      setNpcArray([...npcArrayCandidate, newNpc]);
    }
  };

  const deleteNpcHandler = (npcName: string) => {
    const idx = npcArrayCandidate.findIndex(
      (npc: Character) => npc.name === npcName
    );
    const newNpcArrayCandidate = [
      ...npcArrayCandidate.slice(0, idx),
      ...npcArrayCandidate.slice(idx + 1),
    ];
    console.log(newNpcArrayCandidate);
    
    setNpcArray(newNpcArrayCandidate);
  };

  const toggleFriendly = (event:any) => {
    const idx = parseInt(event.target.id);
    const changetChar = {...npcArrayCandidate[idx], [event.target.name]:event.target.checked}
    setNpcArray([...npcArrayCandidate.slice(0, idx),
        changetChar,
        ...npcArrayCandidate.slice(idx + 1)])
  }

  return (
    <div>
      <h2>Add some NPC</h2>
      <div className="createPageContainer">
      <DifficultyInfo currentParty={currentParty} npcList={npcArrayCandidate}  />
        <div className="searchAndCardContainer">
          <div className="searchAndBtnContainer">
            <SearchBar
              value=""
              changeHandler={changeHandler}
              lists={lists}
            ></SearchBar>
            <Link to="/initiative/">
              <Button
                onClick={() => {
                  submitNpc(npcArrayCandidate);
                }}
              >
                Done!
              </Button>
            </Link>
          </div>
          {selectedCharacter && (
            <NpcInfoCard selectedCharacter={selectedCharacter} />
          )}
          {selectedCharacter && (
            <Button
              className="addNpcBtn"
              onClick={() => {
                addNpcHandler();
              }}
            >
              Add selected npc
            </Button>
          )}
        </div>
        <div className="npcListContainer">
          {npcArrayCandidate[0] && (
            <div className='listCardSwitchContainer'>
              <NpcListCard
                deleteHandler={deleteNpcHandler}
                npcArray={npcArrayCandidate}
                hasSwitch={true}
                toggleFriendly={toggleFriendly}
              />
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
