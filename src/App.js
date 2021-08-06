import React, {useEffect} from 'react';
import './App.css';
import Chat from './Chat';
import { login, selectUser, logout } from './features/counter/userSlice';
import {useDispatch, useSelector} from "react-redux"
import Sidebar from "./Sidebar";
import Login from './Login';
import { auth } from './Firebase';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch (
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName
          })
        )
      }
      else {
        dispatch(logout());
      }
    })
  }, [dispatch])
  console.log(user);
  return (
    <div className="app">
      {
        user ? (
          <>
            <Sidebar></Sidebar>
            <Chat></Chat>
          </>
        ) : (
          <Login></Login>
        )
      }
    </div>
  );
}

export default App;
