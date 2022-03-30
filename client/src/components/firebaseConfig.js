import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBfkieIIYISE7bZuYAYCUfh69Ec-NgaqC0",
  authDomain: "taladprom-b8753.firebaseapp.com",
  projectId: "taladprom-b8753",
  storageBucket: "taladprom-b8753.appspot.com",
  messagingSenderId: "588619559907",
  appId: "1:588619559907:web:1adf60f694219346fa66d6",
  measurementId: "G-ZGVSQ4HW9C"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
