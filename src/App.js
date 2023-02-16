 //should start with functino keyword/ arrow functions
//componenent name should stat with a lglobal
//you should have componenet body(jsx) + component logic
//expert tha that commmpent

import React from "react";
import './App.css';
import Homepage from "./pages/homepage";
 
function App(){
  //return React.createElement('div', {className: 'customClass', id: '23'}, 'This is our first componenet')
  return <div className="App">
    <Homepage/>
  </div>
}
export default App;