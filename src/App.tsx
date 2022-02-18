import React from "react";
import "./App.css";
//import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./components/AppRouter";

function App() {

  const m = fetch('https://www.dnd5eapi.co/api/monsters/').then((res)=>{
    return(res.json());
  }).then((body)=>{
    console.log(body);
    
  })
  
  return (
<div className="App">
  <AppRouter/>
</div>
  
  );
}

export default App;
