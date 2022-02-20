import React, { useEffect , useState} from "react";
import { parseJsonText } from "typescript";
import Service from "../services/api";
import {Form} from "react-bootstrap";
import "./SearchBar.css"
interface Moster {
    index:string;
    name:string;
}

interface SearchProps{
    changeHandler:React.ChangeEventHandler<HTMLSelectElement>;
}
const SearchBar:React.FC<SearchProps> =({changeHandler})=>{
    const [list, setList] = useState<string>();
    const [lists,setLists] = useState();
   let monsters = null; 
useEffect (()=>{
const monstersList = async () =>{
        const Arr = await Service.getMonstersList();
       setList(JSON.stringify(Arr))
       monsters = Arr.map((monster:Moster)=>{
           return(<option key={monster.index} value={monster.index}>{monster.name}</option>)
    
       })
       setLists(monsters)
    }
    monstersList()
   
   
    
},[])
/* const changeHandler = (event:React.ChangeEvent<HTMLSelectElement>) =>{
    console.log(event.target.value);
    
} */
    
    return (<Form.Select className="searchBar" aria-label="Default select example" onChange={changeHandler}>
    <option>Select monster</option>
   {lists} 
  </Form.Select>)
}


export default SearchBar;