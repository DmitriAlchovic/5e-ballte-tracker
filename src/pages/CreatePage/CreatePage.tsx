import React, { useState, useEffect, useRef, FC } from 'react';
import Service from '../../services/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Character, Monster } from '../../interfaces';
import NpcInfoCard from '../../components/Cards/NpcInfoCard';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NpcListCard from '../../components/Cards/NpcListCard';
import './CreatePage.css';

interface CreatePageProps {
  submitNpc: Function;
}

const CreatePage: FC<CreatePageProps> = ({ submitNpc }) => {
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
            return (counter + 1);
          } else {
            return counter;
          }
        },
        1
      );
      const newNpc = {
        ...selectedCharacter,
        name: `${selectedCharacter.name} ${duplicatesOfNpc}`,
      };
      setNpcArray([...npcArrayCandidate, newNpc]);
    } else {
      setNpcArray([...npcArrayCandidate, selectedCharacter]);
    }
  };

  return (
    <div className="createPageContainer">
      <SearchBar
        value=""
        changeHandler={changeHandler}
        lists={lists}
      ></SearchBar>
      <div className="cardsContainer">
        {selectedCharacter && (
          <NpcInfoCard selectedCharacter={selectedCharacter} />
        )}
        {npcArrayCandidate[0] && <NpcListCard npcArray={npcArrayCandidate} />}
      </div>
      <Button
        onClick={() => {
          addNpcHandler();
        }}
      >
        Add selected npc
      </Button>
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
  );
};

export default CreatePage;
