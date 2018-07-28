import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseSecret from './secrets/firebaseSecret';
import TabataTimerComponent from './components/TabataTimerComponent';
import LoginComponent from './components/LoginComponent';
import GifComponent from './components/GifComponent';
import ControlsComponent from './components/ControlsComponent';
import getWorkoutsFromFirebase from './actions/getWorkoutsFromFirebase';

class App extends Component {
  constructor(props){
    super();
    this.state = {
      rounds: 8,
      gifData: {
        gif: 'https://firebasestorage.googleapis.com/v0/b/tabata-timer-0df43.appspot.com/o/2%20-%20x4Dsdd6.gif?alt=media&token=b97a79e8-c002-410b-bfed-2faf4658b48a',
        static: 'https: //i.imgur.com/Hwo8ADe.jpg'
      },
      playing: true,
      user: false
    }
    firebase.initializeApp(firebaseSecret);
  }

  renderLoginComponent = () => {
    return this.state.user ? null : <LoginComponent 
          onUserSet = {(user) => this.setState({ user })}
          onError = {(error) => this.setState({ error })} />
  }

  renderControls = () => {
    return this.state.user ? 
      this.state.workout ? null : 
      <ControlsComponent 
        inputGroup = {[{label: 'rounds', type: 'number', value: 'controlled', propertyName: 'rounds'}]}
        inputStyle = {{ border: 'none', borderBottom: '2px solid red' }}
        inputGroupStyle = {{color: 'red' }}
        buttonGroup = {[
          {text: 'Pullup-Bar', onClick: 'setState', propertyName: 'pullupBar' },
          {text: 'Low Impact', onClick: 'setState', propertyName: 'lowImpact' },
          {text: 'Box', onClick: 'setState', propertyName: 'box' }
      ]}
        submitButton={{text:'Get Workout', onClick: (data) => getWorkoutsFromFirebase({...data})}} /> : null;
  }

  renderWorkout = () => {
    return this.state.workout ? 
      <div>
        <TabataTimerComponent 
          rounds = {this.state.rounds} 
          onWorkoutComplete = {() => console.log('The workout is complete!')}
          onRoundComplete = {() => console.log('The round is complete!')} />
        <GifComponent 
          data = { this.state.gifData } 
          playing = { this.state.playing } />
      </div> : null;
  }

  render() {
    return (
      <div className="App">
        {this.renderLoginComponent()}
        {this.renderWorkout()}
        {this.renderControls()}
      </div>
    );
  }
}

export default App;
