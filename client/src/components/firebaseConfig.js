import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGqVS9jgrcJiSPudb-U3WH3vXx7ylZyOk",
  authDomain: "ferina-436c2.firebaseapp.com",
  databaseURL: "https://ferina-436c2.firebaseio.com",
  projectId: "ferina-436c2",
  storageBucket: "ferina-436c2.appspot.com",
  messagingSenderId: "1053686992585",
  appId: "1:1053686992585:web:015210c342b7af4dc48718",
  measurementId: "G-CD4M01YL9M"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
