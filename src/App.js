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
          <Route exact path='/fakeddit/' component={Home}/>
          <Route exact path='/fakeddit/Best' component={Home}/>
          <Route exact path='/fakeddit/New' component={Home}/>
        </Switch>
      
      </BrowserRouter>
      <Home />
    </div>
    );
}

export default App;
