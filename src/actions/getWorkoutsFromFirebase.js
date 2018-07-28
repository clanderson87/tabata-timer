import firebase from 'firebase';
import 'firebase/firestore';

const lowKey = '010203oejf';
const highKey = 'zp7867ia1q';

//^^^ edit when adding exercises to workouts

const getWorkoutsFromFirebase = obj => {
  let results = [];

  const createKey = () => {
    return Math.random().toString(36).substr(2, 15);
  };

  let key = createKey();

  while (key > highKey && key < lowKey) {
    key = createKey();
  }

  const db = firebase.firestore();
  const settings = {
    timestampsInSnapshots: true
  };
  db.settings(settings);

  let workoutsRef = db.collection('workouts');

  const ascOrDsc = Math.random() >= 0.5 ? 'asc' : 'desc';
  const operator = Math.random() >= 0.5 ? '>=' : '<=';

  const { pullupBar, lowImpact, box, rounds } = obj;

  console.log(obj);
  if(!pullupBar){
    workoutsRef = workoutsRef.where('pullup', '==', pullupBar);
  }
  if(lowImpact){
    workoutsRef = workoutsRef.where('lowImpact', '==', lowImpact);
  }
  if(!box){
    workoutsRef = workoutsRef.where('box', '==', box);
  }

  workoutsRef.where('id', operator, key);
  workoutsRef.orderBy('id', ascOrDsc).limit((rounds/2) || 4).get()
    .then(snap => {
      snap.forEach(doc => results.push(doc.data()))
      return results;
    })
    .catch(err => err)
}

export default getWorkoutsFromFirebase;