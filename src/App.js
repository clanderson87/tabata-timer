import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseSecret from './secrets/firebaseSecret';
import TabataTimerComponent from './components/TabataTimerComponent';
import LoginComponent from './components/LoginComponent';
import GifComponent from './components/GifComponent';
import ControlsComponent from './components/ControlsComponent';
import getWorkoutsFromFirebase from './actions/getWorkoutsFromFirebase';

const restAsset = {
  gif: 'https://firebasestorage.googleapis.com/v0/b/tabata-timer-0df43.appspot.com/o/Webp.net-gifmaker.gif?alt=media&token=6ca19ca6-1c3c-4c6c-bac9-368934dfd8ee',
  still: 'https://firebasestorage.googleapis.com/v0/b/tabata-timer-0df43.appspot.com/o/pause.jpg?alt=media&token=20ecfb7e-48bf-4b7f-a823-e11779134019'
}

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
    currentRound++
    let next = currentRound + 1
    let nextRoundTitle = next === rounds ? 'Complete!' : workout[next].title;
    let {gif, still} = workout[currentRound];
    this.setState({ rest: !rest, gifData: { gif, still }, currentRound, nextRoundTitle });
  }

  getWorkoutsAndUpdate = async obj => {
    let workout = await getWorkoutsFromFirebase(obj);
    if(workout){
      workout = [...workout, ...workout]
      this.setState({ workout, gifData: { gif:  workout[0].gif, still: workout[0].still }, currentRound: 0, playing: true, nextRoundTitle: workout[1].title})
    }
  }

  renderControls = () => {
    return this.state.user ? 
      this.state.workout ? null : 
      <ControlsComponent 
        inputGroup = {[{label: 'Rounds', type: 'number', value: 'controlled', propertyName: 'rounds'}]}
        inputStyle = {{ border: 'none', borderBottom: '2px solid grey', fontSize: 15}}
        inputGroupStyle = {
          {
            color: 'grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }
        }
        buttonGroup = {[
          {text: 'Pullup-Bar Exercises', onClick: 'setState', propertyName: 'pullupBar', check: true },
          {text: 'Low Impact Exercises', onClick: 'setState', propertyName: 'lowImpact', check: true },
          {text: 'Plyo Box Exercises', onClick: 'setState', propertyName: 'box', check: true }
        ]}
        buttonGroupStyle = {{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '5%' }}
        buttonStyle = {{
          standard: styles.buttonStyle, 
          checked: { ...styles.buttonStyle, color: 'white', background: 'grey' }
        }}
        submitButton={{text:'Get Workout', onClick: (data) => this.getWorkoutsAndUpdate({...data})}}
        submitButtonStyle={{ ...styles.buttonStyle, padding: '2% 10%', fontSize: 20 }}
        componentStyle = {{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', padding: '5% 100%'}}/> : null;
        
  }

  renderWorkout = () => {
    return this.state.workout ? 
      <div style = {styles.appStyle} >
        <TabataTimerComponent 
          style = {styles.timerStyle}
          rounds = {this.state.rounds} 
          onWorkoutComplete = {() => this.setState({ currentRound: null, rest: false, playing: false, workout: null, gifData: null})}
          onRoundComplete = {() => this.loadNextRound()}
          onPause = {() => this.setState({playing: !this.state.playing})} 
          onRest = {() => this.setState({ rest: true })} />
        <b>Next: </b> {this.state.nextRoundTitle}
        <GifComponent
          data = {
            this.state.rest ? restAsset : this.state.gifData
          }
          playing = { this.state.playing } />
      </div> : null;
  }

  render() {
    return (
      <div className="App" style = {styles.appStyle}>
        <div style={styles.navBar}><div style={{fontSize: 20, margin: '0 5%'}}>Tabata</div></div>
        {this.renderLoginComponent()}
        {this.renderWorkout()}
        {this.renderControls()}
      </div>
    );
  }
}

const styles = {
  appStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column'
  },
  timerStyle: {
    position: 'fixed',
    bottom: 30,
    right: 0,
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  buttonStyle: {
    background: 'white', 
    color: 'black', 
    border: '2px solid grey', 
    borderRadius: '8px',
    margin: '0 5%'
  },
  navBar: {
    background: 'black',
    color: 'white',
    padding: '2%',
    width: '100%',
    margin: '0 10%'
  }
}

export default App;
