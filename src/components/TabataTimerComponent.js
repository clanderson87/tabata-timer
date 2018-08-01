import React from 'react';

/*
  Takes 5 props:
    rounds: number
      -Number of 30 second (20s Active, 10s rest) rounds for the workout
    onRoundComplete: function()
      -Function to fire at the completion of a round (should fire every 30 seconds)
    onWorkoutComplete: function()
      -Function to fire at completion of final round
    onPause: function(bool)
      -Function to fire on pause.
    onRest: function(bool)
      -function to fire on rest period
*/

class TabataTimerComponent extends React.Component {
  constructor(props){
    super();
    this.state = { seconds: 20, rest: false, paused: false, completedRounds: 0 };
  }

  componentDidMount() {
    this.startWorkout();
  }

  countDown = () => {
    let { paused, seconds, rest, completedRounds } = this.state;
    const { onWorkoutComplete, onRoundComplete, rounds, onRest } = this.props;
    if(paused){
      return;
    }
    seconds -= 1;
    if(seconds < 0){
      completedRounds += 0.5;
      completedRounds % 1 ? onRest() : onRoundComplete();
      if(completedRounds >= rounds){
        clearInterval(this.interval);
        return onWorkoutComplete();
      }
      seconds = rest ? 20 : 10;
      rest = !rest;
      this.setState({ rest, completedRounds });
    }
    this.setState({ seconds });
  }

  startWorkout = () => {
    this.interval = setInterval(this.countDown, 1000);
  }

  pauseOrUnpauseRound = () => {
    let { paused } = this.state;
    paused = !paused;
    this.setState({ paused });
    this.props.onPause(paused);
  }

  render(){
    return <div style = { styles.timerStyle }>
            {this.state.rest ? <span style={{opacity: 0}}>__</span> : <b style={this.state.seconds < 6 ? {color:'red'} : null}>{this.state.seconds}</b>}
            <button onClick = {this.pauseOrUnpauseRound} style = {styles.buttonStyle}>
              <i className ='material-icons'>{this.state.paused ? 'play_arrow' : 'pause'}</i>
            </button>
    </div>
  }
}

const styles = {
  timerStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  buttonStyle: {
    borderRadius: 8,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#000",
    fontSize: 15,
    background: "#fff",
    borderStyle: "solid",
    borderWidth: "0px"
  }
}

export default TabataTimerComponent;