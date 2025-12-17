import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');

  const createUser = async (email, password, displayName, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: displayName,
      photoURL: photoURL,
    });

    return userCredential;
  };

  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const response = await axios.get(
            `https://backend-local-chef-bazaar-marketpla.vercel.app/users/${currentUser.uid}`
          );
          setRole(response.data.role);
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole('');
        }
      } else {
        setRole('');
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    createUser,
    signinUser,
    signoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
