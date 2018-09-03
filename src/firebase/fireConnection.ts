import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyDrDeyntZcwmM7Iz-hqJJzqqhTcgi3fKUE",
  authDomain: "human-backend-d91c1.firebaseapp.com",
  databaseURL: "https://human-backend-d91c1.firebaseio.com",
  projectId: "human-backend-d91c1",
  storageBucket: "human-backend-d91c1.appspot.com",
  messagingSenderId: "78736459473"
};

firebase.initializeApp(config);

export default firebase