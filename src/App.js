import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TabataTimerComponent from './components/TabataTimerComponent';

class App extends Component {
  constructor(props){
    super();
    this.state = { rounds: 8 }
  }

  render() {
    return (
      <div className="App">
        <TabataTimerComponent 
          rounds = {this.state.rounds} 
          onWorkoutComplete = {() => {console.log('The workout is complete!')}}
          onRoundComplete = {() => console.log('The round is complete!')} />
      </div>
    );
  }
}

export default App;
