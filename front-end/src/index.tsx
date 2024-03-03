import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import Adminmenu from './features/administrator/Adminmenu';
import AmericanPanel from './features/administrator/AmericanPanel';
import AmericanPost from './features/administrator/AmericanPost';
import AmericanSubjectPanel from './features/administrator/AmericanSubjectPanel';
import AmericanSubjectPost from './features/administrator/AmericanSubjectPost';
import AmericanSubjectUpdate from './features/administrator/AmericanSubjectUpdate';
import AmericanUpdate from './features/administrator/AmericanUpdate';
import BlogPost from './features/administrator/BlogPost';
import BlogUpdate from './features/administrator/BlogUpdate';
import CommunityPanel from './features/administrator/CommunityPanel';
import SentencePanel from './features/administrator/SentencePanel';
import SentencePost from './features/administrator/SentencePost';
import SentenceSubjectPanel from './features/administrator/SentenceSubjectPanel';
import SentenceSubjectPost from './features/administrator/SentenceSubjectPost';
import SentenceSubjectUpdate from './features/administrator/SentenceSubjectUpdate';
import SentenceUpdate from './features/administrator/SentenceUpdate';
import VoicePanel from './features/administrator/VoicePanel';
import VoicePost from './features/administrator/VoicePost';
import VoiceSubjectPanel from './features/administrator/VoiceSubjectPanel';
import VoiceSubjectPost from './features/administrator/VoiceSubjectPost';
import VoiceSubjectUpdate from './features/administrator/VoiceSubjectUpdate';
import VoiceUpdate from './features/administrator/VoiceUpdate';
import AmericanFinish from './features/american/AmericanFinish';
import AmericanQuiz from './features/american/AmericanQuiz';
import AmericanSubjects from './features/american/AmericanSubjects';
import Login from './features/authentication/Login';
import HomePage from './features/base/HomePage';
import Quizes from './features/base/Quizes';
import Blog from './features/blog/Blog';
import BlogPage from './features/blog/BlogPage';
import BlogComments from './features/comment/BlogComments';
import Forum from './features/forum/Forum';
import UserProfile from './features/profile/UserProfile';
import SentenceFinish from './features/sentence/SentenceFinish';
import SentenceQuiz from './features/sentence/SentenceQuiz';
import SentenceSubjects from './features/sentence/SentenceSubjects';
import VoiceSubjects from './features/voice/VoiceSubjects';
import './index.css';
import VoiceQuiz from './features/voice/VoiceQuiz';
import VoiceFinish from './features/voice/VoiceFinish';
import ErrorPage from './features/base/ErrorPage';
import CallbackPanel from './features/administrator/CallbackPanel';
import Registration from './features/administrator/Registration';
import BlogPanel from './features/administrator/Blogpanel';



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

          <Route path = "/profile/user_profile">
              <Route index element = {<UserProfile />} />
              <Route path = ":id" element = {<UserProfile />} />
          </Route>

          <Route path = "/adminmenu" element={<Adminmenu />} />
          <Route path = "/administrator/callback/registration" element={<Registration />} />
          <Route path = "/administrator/callback" element={<CallbackPanel />} />
          <Route path = "/administrator/blog" element={<BlogPanel />} />
          <Route path = "/administrator/post_blog" element={<BlogPost />} />
          <Route path = "/administrator/american_quiz" element={<AmericanPanel />} />
          <Route path = "/administrator/sentence_quiz" element={<SentencePanel />} />
          <Route path = "/administrator/voice_quiz" element={<VoicePanel />} />
          <Route path = "/administrator/post_american" element={<AmericanPost />} />
          <Route path = "/administrator/post_sentence" element={<SentencePost />} />
          <Route path = "/administrator/post_voice" element={<VoicePost />} />
          <Route path = "/administrator/american_subject" element={<AmericanSubjectPanel />} />
          <Route path = "/administrator/sentence_subject" element={<SentenceSubjectPanel />} />
          <Route path = "/administrator/voice_subject" element={<VoiceSubjectPanel />} />
          <Route path = "/administrator/post_american_subject" element={<AmericanSubjectPost />} />
          <Route path = "/administrator/post_sentence_subject" element={<SentenceSubjectPost />} />
          <Route path = "/administrator/post_voice_subject" element={<VoiceSubjectPost />} />
          <Route path = "/administrator/community" element={<CommunityPanel />} />
          

          <Route path = "/administrator/update_blog">
              <Route index element = {<BlogUpdate />} />
              <Route path = ":id" element = {<BlogUpdate />} />
          </Route>

          <Route path = "/administrator/update_american">
              <Route index element = {<AmericanUpdate />} />
              <Route path = ":id" element = {<AmericanUpdate />} />
          </Route>

          <Route path = "/administrator/update_sentence">
              <Route index element = {<SentenceUpdate />} />
              <Route path = ":id" element = {<SentenceUpdate />} />
          </Route>

          <Route path = "/administrator/update_voice">
              <Route index element = {<VoiceUpdate />} />
              <Route path = ":id" element = {<VoiceUpdate />} />
          </Route>

          <Route path = "/administrator/update_american_subject">
              <Route index element = {<AmericanSubjectUpdate />} />
              <Route path = ":id" element = {<AmericanSubjectUpdate />} />
          </Route>

          <Route path = "/administrator/update_sentence_subject">
              <Route index element = {<SentenceSubjectUpdate />} />
              <Route path = ":id" element = {<SentenceSubjectUpdate />} />
          </Route>

          <Route path = "/administrator/update_voice_subject">
              <Route index element = {<VoiceSubjectUpdate />} />
              <Route path = ":id" element = {<VoiceSubjectUpdate />} />
          </Route>

          <Route path = "/forum" element={<Forum />} />

          <Route path = "/paged_blogs" element={<Blog />} />

          <Route path = "/quizes" element={<Quizes />} />
          <Route path = "/quizes/american_quiz/subjects" element={<AmericanSubjects />} />

          <Route path = "/quizes/sentence_quiz/subjects" element={<SentenceSubjects />} />
          
          <Route path = "/quizes/voice_quiz/subjects" element={<VoiceSubjects />} />

          <Route path = "/quizes/american_quiz/american_finish" element={<AmericanFinish />} />

          <Route path = "/quizes/sentence_quiz/sentence_finish" element={<SentenceFinish />} />
          
          <Route path = "/quizes/voice_quiz/voice_finish" element={<VoiceFinish />} />
            
          <Route path = "/quizes/american_quiz/american_test">
              <Route index element = {<AmericanQuiz />} />
              <Route path = ":id" element = {<AmericanQuiz />} />
          </Route>
            
          <Route path = "/quizes/sentence_quiz/sentence_test">
              <Route index element = {<SentenceQuiz />} />
              <Route path = ":id" element = {<SentenceQuiz />} />
          </Route>
            
          <Route path = "/quizes/voice_quiz/voice_test">
              <Route index element = {<VoiceQuiz />} />
              <Route path = ":id" element = {<VoiceQuiz />} />
          </Route>

          <Route path = "/blog/get_comments">
              <Route index element = {<BlogComments />} />
              <Route path = ":id" element = {<BlogComments />} />
            </Route>

          <Route path = "/blog/blog_page">
              <Route index element = {<BlogPage />} />
              <Route path = ":id" element = {<BlogPage />} />
            </Route>

          </Route>

          <Route path="/*" element={<ErrorPage />} />

          </Routes>

    </BrowserRouter>
    
    </Provider>
  </React.StrictMode>
);