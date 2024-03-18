import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBscWb-aio_4cm3swTscX6iInKy55whXOg",
  authDomain: "where-to-meet-9a8f2.firebaseapp.com",
  projectId: "where-to-meet-9a8f2",
  storageBucket: "where-to-meet-9a8f2.appspot.com",
  messagingSenderId: "820237429612",
  appId: "1:820237429612:web:23711f4db268c54976a149",
  measurementId: "G-41V5HXDW6V"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);