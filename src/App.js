import React,{use} from 'react'
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import Home from './components/home/Home';
import User from './components/user/User';

function App() {

  return (
    <HashRouter>
      <Route exact path='/' component={Home} />
      <Route exact path='/:id' component={User} />
    </HashRouter>
  )
}

export default App;
