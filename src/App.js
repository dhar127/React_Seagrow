import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './WelcomePage';
import Login from './Login';
import Signup from './Signup'; 
import Home from './Home';
import Home1 from './Home1';
import Profile from './Profile';
import Learning from './Learning';
import ToDo from './ToDo';
import Job from './Job';
import Community from './Community';
import Chat from './Chat';
import Payment from './Payment';
import News from './components/News';
import ContentSharingHome from './components/contentSharing/ContentSharingHome';
import MyContents from './components/contentSharing/MyContents';
import App from './Map';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/tech-news" element={<News />} />
        <Route path="/content-sharing" element={<ContentSharingHome />} />
        <Route path="/my-contents" element={<MyContents />} />
        <Route path="/learning-center" element={<Learning/>}/>
        <Route path="/job-board" element={<Job/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/community" element={<Community/>}/>
        <Route path="/bike-sharing" element={<Home1/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/map" element={<App/>}/>
      </Routes>
    </Router>
  );
}

export default App;