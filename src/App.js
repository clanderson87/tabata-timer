import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseSecret from './secrets/firebaseSecret';
import TabataTimerComponent from './components/TabataTimerComponent';
import LoginComponent from './components/LoginComponent';
import GifComponent from './components/GifComponent';

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
          onRoundComplete = {() => console.log('The round is complete!')} />
        < GifComponent data = 'https://firebasestorage.googleapis.com/v0/b/tabata-timer-0df43.appspot.com/o/2%20-%20x4Dsdd6.gif?alt=media&token=b97a79e8-c002-410b-bfed-2faf4658b48a' />
      </div>
    );
  }
}

export default App;
