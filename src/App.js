import React, { Component } from 'react';
import Game from './Components/GameSetup/Game'
import openSocket from 'socket.io-client';
import './stylesheet.css'

class App extends Component {

  render(){
    const socket = openSocket('http://localhost:8080');
    socket.emit('goal', 'heeeey');
    socket.on('sup', (data) => {
    console.log(data);
  });
    return (
       <main className="column main-container" id="main">
          <Game />
      </main>
    );
  }
}

export default App;
