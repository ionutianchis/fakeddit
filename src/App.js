import React from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='container'>
      <Navbar />
      
      <BrowserRouter>
        <Switch>
          <Route exact path='/fakeddit/' />
        </Switch>
      
      </BrowserRouter>
      <Home />
    </div>
    );
}

export default App;
