const fs = require('fs');
const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp(
  //firebae secret
)

let workouts = JSON.parse(fs.readFileSync('./workouts.json'))

const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);


workouts.forEach(workout => {
  db.collection('workouts').doc(workout.id).set(workout);
})
