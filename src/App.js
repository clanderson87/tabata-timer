import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseSecret from './secrets/firebaseSecret';
import TabataTimerComponent from './components/TabataTimerComponent';
import LoginComponent from './components/LoginComponent';

class App extends Component {
  constructor(props){
    super();
    this.state = { rounds: 8 }
    firebase.initializeApp(firebaseSecret);
  }

  render() {
    return (
      <div className="App">
        <LoginComponent 
          onUserSet = {(user) => console.log('user:', user)}
          onError = {(error) => console.log(error)} />
        <TabataTimerComponent 
          rounds = {this.state.rounds} 
          onWorkoutComplete = {() => {console.log('The workout is complete!')}}
          onRoundComplete = {() => console.log('The round is complete!')}
          onPause = {(paused) => console.log('Paused:', paused)}
          onRest = {() => console.log('resting')}/>
      </div>
    );
  }
}

export default App;
