import React, { Component } from 'react';
import Game from './Components/GameSetup/Game'
import openSocket from 'socket.io-client';
import './stylesheet.css'

class App extends Component {
  constructor(props){
    super(props)
    this.socket= openSocket('http://localhost:8080')
    this.state ={
      goalSensed: null
    }
  }
  
  componentDidMount(){
    this.socket.emit('goal', 'heeeey');
    this.socket.on("goal", team =>{
      console.log(team)
      this.setState({goalSensed: team})
    })
    this.socket.on('sup', (data) => {
      console.log(data);
    });
  }

  render(){
   
    return (
       <main className="column main-container" id="main">
          <Game goalSensed={this.state.goalSensed} socket={this.socket}/>
      </main>
    );
  }
}

export default App;
