import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import Login from './components/Login/Login'
import Admin from './components/Admin/Admin';
import Student from './components/Student/Student'

function App() {
  return (
    <div className="App">

      <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
      <Route path="/student" component={Student}/>
    </Router>
        
    </div>
  );
}

export default App;
