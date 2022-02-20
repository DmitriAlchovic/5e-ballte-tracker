import {createContext} from "react";


const BattleContext = createContext({
    charArray:[{name:null,initiative:null, health:null}]
})

export  default BattleContext;