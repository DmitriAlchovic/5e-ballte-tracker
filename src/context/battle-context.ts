import {createContext} from "react";
import {Character} from "../interfaces";


const noop = ()=>{}

const BattleContext = createContext<Character[]>([]);

export  default BattleContext;