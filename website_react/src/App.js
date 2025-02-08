import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notification from './components/notification/Notification';
import Login from './components/Login';
import Signup from './components/Signup';
import Edit from './components/Edit';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/notification" element={<Notification />} />\
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edit" element={<Edit />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
