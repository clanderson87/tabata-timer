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
    let i = 0;
    let interval = setInterval(() => {
      let { currentUser } = firebase.auth();
      if (currentUser) {
        this.props.onUserSet(currentUser);
        clearInterval(interval);
      };
      if (i > 4) {
        clearInterval(interval);
      }
    }, 1250);
  }

  loginWithProvider = async service => {
    const { onUserSet, onError } = this.props;
    const provider =
      service === "google" ?
      new firebase.auth.GoogleAuthProvider() :
      new firebase.auth.FacebookAuthProvider();
    
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      try {
        let { user } = await firebase.auth().signInWithPopup(provider);
        let { displayName = null, email = null, photoURL = null, uid } = user;
        onUserSet({ displayName, email, photoURL, uid })
      } catch (e) {
        onError(e);
      }
    }

  loginWithEmailAndPassword = async (email, password) => {
    const { onUserSet, onError } = this.props;
    const setUser = user => {
      onUserSet({ uid: user.uid })
    }
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)  
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
      return <div style = {{margin: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <button onClick = {() => this.loginWithProvider('google')} className = "loginBtn loginBtn--google">Login with Google</button>
        <button onClick = {() => this.loginWithProvider('facebook')} className = "loginBtn loginBtn--facebook">Login with Facebook</button>
        <button onClick = {() => this.setState({emailPassword: true})} style = {styles.buttonStyle}>Login with Email</button>
      </div>
    } else {
      return this.renderEmailAndPasswordInputs()
    }
  }
}

const styles = {
  buttonStyle: {
    background: 'white',
    color: 'black',
    border: '2px solid grey',
    borderRadius: '8px',
    fontSize: 22,
    marginTop: '1%'
  }
}

export default LoginComponent;