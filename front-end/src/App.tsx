import { Outlet } from 'react-router-dom';
import MyNavbar from './features/navigators/MyNavbar';
import MyFooter from './features/navigators/MyFooter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { logoutAsync, selectIsLogged } from './features/authentication/authenticationSlice';
import { getMyIDAsync, selectUserID, setMyID } from './features/profile/profileSlice';
import { useEffect } from 'react';



function App() {
  const dispatch = useAppDispatch();

  const storedIsLogged = JSON.parse(localStorage.getItem('token') as string);
  const userID = useAppSelector(selectUserID);
  const isLogged = useAppSelector(selectIsLogged);


  const storedMyID = JSON.parse(localStorage.getItem('myID') as string);


useEffect(() => {
  if (userID) {
  dispatch(setMyID(userID));
  }

}, [dispatch, userID]);


useEffect(() => {
  if (!storedMyID && storedIsLogged) {
    dispatch(getMyIDAsync());
  }
}, [dispatch, storedIsLogged]);


useEffect(() => {
  if (storedMyID === "") {
      dispatch(logoutAsync());
    }
}, [dispatch, storedMyID, storedIsLogged]);


  
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
        theme="dark"/>

      <MyNavbar />

      <Outlet />

      <MyFooter />
      
    </div>
  );
}

export default App;
