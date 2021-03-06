import React,{useState,ReactNode} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "../../pages/main-page/MainPage";
import FightPage from "../../pages/fight-page/FightPage";
import NavBar from "../nav/NavBar";
import BattleContext from "../../context/BattleContext";
import {Character} from "../../interfaces"



const AppRouter = () => {

const navigate = useNavigate();
const [charArray, setCharArray] = useState<Character[]>([]);

const initiativeSort = (chars:Character[]):Character[] =>{
  const sortArr = chars;
  for (let n=0; n<sortArr.length; n++){
    for(let i =0; i<sortArr.length-1-n;i++){
      if(sortArr[i].initiative>sortArr[i+1].initiative){
        const tmp = sortArr[i]
        sortArr[i]=sortArr[i+1]
        sortArr[i+1]=tmp 
      }
    }
  }
  return(sortArr)
}

const submitCharacters = (charsArr:Character[],children?: ReactNode)=> {
  console.log(charsArr);
  const sortArr = initiativeSort(charsArr);
  setCharArray(sortArr);
  navigate("/fight/")
}

  return (
    <div>
      <NavBar />
        <BattleContext.Provider value={charArray}>
      <Routes>
          <Route element={<MainPage submitCharacters={submitCharacters} />} path="/"></Route>
          <Route element={<FightPage/>} path="/fight/"></Route>
      </Routes>
       </BattleContext.Provider>
    </div>
  );
};

export default AppRouter;
