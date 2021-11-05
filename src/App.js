import React,{use} from 'react'
import './App.css';
import { HashRouter, Route } from 'react-router-dom'
import Home from './components/home/Home';
import User from './components/user/User';
// import Demo from './components/headImgSelect/HeadImgSelect'
import Demo from './components/demo/Demo'

function App() {

  return (
    <HashRouter>
      <Route exact path='/' component={Home} />
      <Route exact path='/user/:id' component={User} />
      <Route exact path='/demo' component={Demo} />
    </HashRouter>
  )
}

export default App;
