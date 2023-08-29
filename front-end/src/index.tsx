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
import UpdateProfile from './features/profile/UpdateProfile';
import Adminmenu from './features/administrator/Adminmenu';
import Blogpanel from './features/administrator/Blogpanel';
import Blog from './features/blog/Blog';
import BlogPost from './features/administrator/BlogPost';
import BlogUpdate from './features/administrator/BlogUpdate';
import BlogComments from './features/comment/BlogComments';
import BlogPage from './features/blog/BlogPage';
import UserProfile from './features/profile/UserProfile';



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

          <Route path = "/profile/profile" element={<Profile />} />

          <Route path = "/profile/profile_update" element={<UpdateProfile />} />

          <Route path = "/profile/user_profile">
              <Route index element = {<UserProfile />} />
              <Route path = ":id" element = {<UserProfile />} />
          </Route>

          <Route path = "/adminmenu" element={<Adminmenu />} />
          <Route path = "/administrator/blog" element={<Blogpanel />} />
          <Route path = "/administrator/post_blog" element={<BlogPost />} />

          <Route path = "/administrator/update_blog">
              <Route index element = {<BlogUpdate />} />
              <Route path = ":id" element = {<BlogUpdate />} />
          </Route>

          <Route path = "/blog" element={<Blog />} />

          <Route path = "/blog/get_comments">
              <Route index element = {<BlogComments />} />
              <Route path = ":id" element = {<BlogComments />} />
            </Route>

          <Route path = "/blog/blog_page">
              <Route index element = {<BlogPage />} />
              <Route path = ":id" element = {<BlogPage />} />
            </Route>


          </Route></Routes>

    </BrowserRouter>
    
    </Provider>
  </React.StrictMode>
);