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
        still: 'https: //i.imgur.com/Hwo8ADe.jpg'
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

  loadNextRound = () => {
    let { currentRound, workout, rest, rounds }  = this.state;
    if(currentRound === (rounds/2) - 1){
      currentRound = 0;
    } else {
      currentRound++;
    }
    let { gif, still } = workout[currentRound];
    this.setState({ rest: !rest, gifData: { gif, still }, currentRound });
  }

  getWorkoutsAndUpdate = async obj => {
    let workout = await getWorkoutsFromFirebase(obj);
    if(workout){
      this.setState({ workout, gifData: { gif:  workout[0].gif, still: workout[0].still }, currentRound: 0})
    }
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
        submitButton={{text:'Get Workout', onClick: (data) => this.getWorkoutsAndUpdate({...data})}} /> : null;
  }

  renderWorkout = () => {
    return this.state.workout ? 
      <div>
        <TabataTimerComponent 
          rounds = {this.state.rounds} 
          onWorkoutComplete = {() => this.setState({ currentRound: null, rest: false, playing: false, workout: null, gifData: null})}
          onRoundComplete = {() => this.loadNextRound()}
          onPause = {() => this.setState({playing: !this.state.playing})} 
          onRest = {() => this.setState({ rest: true })}/>
        <GifComponent 
          data = {
            this.state.rest ? { gif: 'https://firebasestorage.googleapis.com/v0/b/tabata-timer-0df43.appspot.com/o/Webp.net-gifmaker.gif?alt=media&token=6ca19ca6-1c3c-4c6c-bac9-368934dfd8ee'} : this.state.gifData
          }
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
