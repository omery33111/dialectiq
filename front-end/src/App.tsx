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
  const [lastClickTimes, setLastClickTimes] = useState<number[]>([]);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    // Retrieve lastClickTimes from local storage if available
    const storedClickTimes = JSON.parse(localStorage.getItem('lastClickTimes') || '[]');
    setLastClickTimes(storedClickTimes);

    const handleMouseClick = () => {
      const currentTime = Date.now();
      setLastClickTimes(prevTimes => {
        const updatedTimes = [currentTime, ...(prevTimes.length >= 2 ? prevTimes.slice(0, 1) : prevTimes)];
        localStorage.setItem('lastClickTimes', JSON.stringify(updatedTimes));
        return updatedTimes;
      });

      if (lastClickTimes.length === 2) {
        const timeGap = currentTime - lastClickTimes[1];
        if (timeGap > 120 * 60 * 1000) { // 120 minutes in milliseconds
          onLogout();
        }
      }
    };

    document.addEventListener('click', handleMouseClick);

    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, [lastClickTimes]);

  const onLogout = () => {
    dispatch(logoutAsync());
    localStorage.clear(); // Clear all local storage data upon logout
    window.location.href = "/";
  };

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
