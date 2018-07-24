import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseSecret from './secrets/firebaseSecret';
import TabataTimerComponent from './components/TabataTimerComponent';
import LoginComponent from './components/LoginComponent';
import GifComponent from './components/GifComponent';
import ControlsComponent from './components/ControlsComponent';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      rounds: 8,
      data: {
        gif: 'https://firebasestorage.googleapis.com/v0/b/tabata-timer-0df43.appspot.com/o/2%20-%20x4Dsdd6.gif?alt=media&token=b97a79e8-c002-410b-bfed-2faf4658b48a',
        static: 'https: //i.imgur.com/Hwo8ADe.jpg'
      },
      playing: true
    }
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
        <GifComponent 
          data = { this.state.data } 
          playing = { this.state.playing } />
        <ControlsComponent 
          inputGroup = {[{label: 'Label', type: 'number', value: 'controlled', propertyName: 'number'}]}
          inputStyle = {{ border: 'none', borderBottom: '2px solid red' }}
          inputGroupStyle = {{color: 'red' }}
          buttonGroup = {[{text: 'THIS IS BUTTON', onClick: 'setState', propertyName: 'property' }]} />
      </div>
    );
  }
}

export default App;
