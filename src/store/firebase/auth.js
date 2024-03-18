import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  setPersistence,
  signOut
} from 'firebase/auth';

import { app } from './firebase';

export const auth = getAuth(app);

//const provider = new GoogleAuthProvider();

export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const { stsTokenManager, uid } = user;
    return { stsTokenManager, uid };
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

export async function login(email, password) {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential.user);
    return userCredential.user;
  } catch(error) {
    return error;
  }
}

export async function logout(){
  try {
    await signOut(auth);
  } catch(error) {
    throw new Error(error.message);
  }
}