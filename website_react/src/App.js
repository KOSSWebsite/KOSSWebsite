import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notification from './components/notification/Notification';
import Login from './components/Login';
import Signup from './components/Signup';
import Member from './components/Member';
import Edit from './components/Edit';
import Detail from './components/Detail'
import Header from './components/header';
import Main from './components/Main';
import './App.css';


const App = () => {
  return (
      <div>
          <Router>
              <Header/>
              <Routes>
                  <Route path={'/'} element={<Main/>}></Route>
                  <Route path="/notification" element={<Notification/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/edit" element={<Edit/>}></Route>
                  <Route path={'/detail'} element={<Detail/>}></Route>
                  <Route path="/member" element={<Member />}></Route>
              </Routes>
          </Router>
      </div>
  );
};

export default App;
