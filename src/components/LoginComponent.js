import React from 'react';
import firebase from 'firebase';

/*
Takes 2 Props:
  onUserSet: function(user)
    -Function to fire when a user has successfully logged in
  onError: function(error)
    -Function to fire when an error has been thrown
*/

const userNotFoundCode = 'auth/user-not-found'
//^^^ update if firebase updates error codes

class LoginComponent extends React.Component {
  constructor(props){
    super()
    this.state = { email: '', password: '', emailPassword: null};
  }

  componentDidMount(){
    this.checkForUser()
  }

  checkForUser = () => {
    console.log('Checking For User!')
  }

  loginWithProvider = service => {
    const provider =
      service === "google" ?
      new firebase.auth.GoogleAuthProvider() :
      new firebase.auth.FacebookAuthProvider();
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        let { user } = await firebase.auth().signInWithPopup(provider);
        let { displayName = null, email = null, photoURL = null, uid } = user;
        this.props.onUserSet({ displayName, email, photoURL, uid })
      })
    } catch (e) {
      this.props.onError(e);
    }
  };

  loginWithEmailAndPassword = (email, password) => {
    const { onUserSet, onError } = this.props;
    const setUser = user => {
      onUserSet({ uid: user.uid })
    }
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(async () => {
        try {
          let {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
          setUser(user);
        } catch(e){
          if(e.code === userNotFoundCode){
            try {
              let { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
              setUser(user);
            } catch (er) {
              onError(er)
            }
          } else {
            onError(e)
          }
        }
      })
  }

  renderEmailAndPasswordInputs = () => {
    return (
      <div>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={event => this.setState({ email: event.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={event => this.setState({ password: event.target.value })}
        />
        <button onClick={() => this.loginWithEmailAndPassword(this.state.email, this.state.password)}>Submit</button>
        <button onClick={() => this.setState({ emailPassword: null })}>Cancel</button>
    </div>)
  }


  render() {
    if(!this.state.emailPassword){
      return <div>
        <button onClick = {() => this.loginWithProvider('google')}>Login with Google</button>
        <button onClick = {() => this.loginWithProvider('facebook')}>Login with Facebook</button>
        <button onClick = {() => this.setState({emailPassword: true})}>Login with Email</button>
      </div>
    } else {
      return this.renderEmailAndPasswordInputs()
    }
  }
}

export default LoginComponent;