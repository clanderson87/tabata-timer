import React from 'react';

class TimerComponent extends React.Component {
  constructor(props){
    super();
    this.state = { seconds: 20, rest: false, flips: 0, completedRounds: 0 };
  }

  componentDidMount() {
    this.startWorkout();
  }

  countDown = () => {
    let { paused, seconds, rest, completedRounds } = this.state;
    if(paused){
      return;
    }
    seconds -= 1;
    if(seconds < 0){
      completedRounds += 0.5;
      if(completedRounds >= this.props.rounds){
        clearInterval(this.interval);
        return this.props.onWorkoutComplete();
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
    this.setState({ paused: !this.state.paused });
  }

  render(){
    return <div>
            {this.state.seconds}
            <button onClick = {this.pauseOrUnpauseRound}>
              <i className ='material-icons'>{this.state.paused ? 'play_arrow' : 'pause'}</i>
            </button>
    </div>
  }
}

export default TimerComponent;