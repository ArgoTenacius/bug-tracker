import React, { useState } from 'react';
import RouteSwitch from "./RouteSwitch";
import './App.css';
import { Load } from './components';

const App = () => {
  const [user, setUser] = useState({});
  const [onLoad, setOnLoad] = useState(true);

  return (
    <main>
      { onLoad ? <Load setOnLoad={setOnLoad} setUser={setUser}/> : <RouteSwitch user={user} setUser={setUser}/> }
    </main>
  )
}

export default App;