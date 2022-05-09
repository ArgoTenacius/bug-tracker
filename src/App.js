import React, { useState } from 'react';
import RouteSwitch from "./RouteSwitch";
import './App.css';
import { Load, Navbar } from './components';

const App = () => {
  const [user, setUser] = useState({});
  const [onLoad, setOnLoad] = useState(true);

  return (
    <main className='app'>
      { onLoad ? <Load setOnLoad={setOnLoad} setUser={setUser}/> : 
      <>
        <Navbar />
        <RouteSwitch user={user} setUser={setUser}/> 
      </>
      }
    </main>
  )
}

export default App;