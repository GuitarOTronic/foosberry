import React, { Component } from 'react';
import Game from './Components/GameSetup/Game'
import './stylesheet.css'

class App extends Component {

  render(){
    return (
       <main className="column main-container" id="main">
          <Game />
      </main>
    );
  }
}

export default App;
