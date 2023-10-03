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
import UpdateProfile from './features/profile/UpdateProfile';
import Adminmenu from './features/administrator/Adminmenu';
import Blog from './features/blog/Blog';
import BlogPost from './features/administrator/BlogPost';
import BlogUpdate from './features/administrator/BlogUpdate';
import BlogComments from './features/comment/BlogComments';
import BlogPage from './features/blog/BlogPage';
import UserProfile from './features/profile/UserProfile';
import BlogPanel from './features/administrator/BlogPanel';
import AmericanPanel from './features/administrator/AmericanPanel';
import AmericanPost from './features/administrator/AmericanPost';
import AmericanUpdate from './features/administrator/AmericanUpdate';
import Quizes from './features/base/Quizes';
import AmericanSubjectPost from './features/administrator/AmericanSubjectPost';
import AmericanSubjectUpdate from './features/administrator/AmericanSubjectUpdate';
import AmericanSubjectPanel from './features/administrator/AmericanSubjectPanel';
import AmericanSubjects from './features/american/AmericanSubjects';
import AmericanQuiz from './features/american/AmericanQuiz';
import AmericanFinish from './features/american/AmericanFinish';



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

          <Route path = "/profile/profile_update" element={<UpdateProfile />} />

          <Route path = "/profile/user_profile">
              <Route index element = {<UserProfile />} />
              <Route path = ":id" element = {<UserProfile />} />
          </Route>

          <Route path = "/adminmenu" element={<Adminmenu />} />
          <Route path = "/administrator/blog" element={<BlogPanel />} />
          <Route path = "/administrator/post_blog" element={<BlogPost />} />
          <Route path = "/administrator/american_quiz" element={<AmericanPanel />} />
          <Route path = "/administrator/post_american" element={<AmericanPost />} />
          <Route path = "/administrator/american_subject" element={<AmericanSubjectPanel />} />
          <Route path = "/administrator/post_american_subject" element={<AmericanSubjectPost />} />
          

          <Route path = "/administrator/update_blog">
              <Route index element = {<BlogUpdate />} />
              <Route path = ":id" element = {<BlogUpdate />} />
          </Route>

          <Route path = "/administrator/update_american">
              <Route index element = {<AmericanUpdate />} />
              <Route path = ":id" element = {<AmericanUpdate />} />
          </Route>

          <Route path = "/administrator/update_american_subject">
              <Route index element = {<AmericanSubjectUpdate />} />
              <Route path = ":id" element = {<AmericanSubjectUpdate />} />
          </Route>

          <Route path = "/blog" element={<Blog />} />

          <Route path = "/quizes" element={<Quizes />} />
          <Route path = "/quizes/american_quiz/subjects" element={<AmericanSubjects />} />

          <Route path = "/quizes/american_quiz/american_finish" element={<AmericanFinish />} />
            
          <Route path = "/quizes/american_quiz/american_test">
              <Route index element = {<AmericanQuiz />} />
              <Route path = ":id" element = {<AmericanQuiz />} />
          </Route>

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