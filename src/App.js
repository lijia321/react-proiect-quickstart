import React from 'react';
import './App.less';
import MImg from './img/main.png'
function App() {
  return (
    <div className="App">
        hahhha
        <div className='hello' style={{backgroundImage:`url(${MImg})`}}></div>
    <img src={MImg}></img>
    </div>
  );
}

export default App;
