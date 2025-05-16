import Constants from "expo-constants";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: Constants.manifest2.extra.apiKey,
  authDomain: Constants.manifest2.extra.authDomain,
  projectId: Constants.manifest2.extra.projectId,
  storageBucket: Constants.manifest2.extra.storageBucket,
  messagingSenderId: Constants.manifest2.extra.messagingSenderId,
  appId: Constants.manifest2.extra.appId,
  measurementId: Constants.manifest2.extra.measurementId,

};

initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default datbase=getFirestore();