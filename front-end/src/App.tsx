import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import MyNavbar from './features/navigators/MyNavbar';
import MyFooter from './features/navigators/MyFooter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { logoutAsync, selectIsLogged } from './features/authentication/authenticationSlice';
import { getMyIDAsync, selectUserID, setMyID } from './features/profile/profileSlice';

function App() {
  const dispatch = useAppDispatch();
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const storedmyID = JSON.parse(localStorage.getItem('myID') as string);
  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);
  const userID = useAppSelector(selectUserID);
  const isLogged = useAppSelector(selectIsLogged);

  useEffect(() => {
    if (userID === -1 && !initialFetchDone) {
      dispatch(getMyIDAsync())
        .then(() => {
          setInitialFetchDone(true);
        });
    }

  
  }, [dispatch, userID, initialFetchDone]);

  useEffect(() => {
    if (initialFetchDone) {
      dispatch(setMyID(userID));
    }
  }, [dispatch, userID, initialFetchDone]);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <MyNavbar />

      <Outlet />

      <MyFooter />
    </div>
  );
}

export default App;
