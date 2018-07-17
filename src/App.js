import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TimerComponent from './components/TimerComponent';

class App extends Component {
  constructor(props){
    super();
    this.state = { rounds: 8 }
  }
  render() {
    return (
      <div className="App">
        <TimerComponent rounds = {this.state.rounds} onWorkoutComplete = {() => {console.log('The workout is complete!')}} />
      </div>
    );
  }
}

export default App;
