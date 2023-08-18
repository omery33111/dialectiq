import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './features/base/HomePage';
import Login from './features/authentication/Login';
import Profile from './features/profile/Profile';
import ProfileUpdate from './features/profile/UpdateProfile';



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>

    <BrowserRouter>

    <Routes>

          <Route path = "/" element={<App />}>
          
          <Route path = "/" element={<HomePage />} />

          <Route path = "/authentication/login" element={<Login />} />

          <Route path = "/profile_user/profile" element={<Profile />} />

          <Route path = "/profile_user/profile_update" element={<ProfileUpdate />} />

          </Route></Routes>

    </BrowserRouter>
    
    </Provider>
  </React.StrictMode>
);