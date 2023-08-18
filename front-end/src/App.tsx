import { Outlet } from 'react-router-dom';
import MyNavbar from './features/navigators/MyNavbar';
import MyFooter from './features/navigators/MyFooter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



function App() {


  
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
