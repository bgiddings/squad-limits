import React from 'react';
import './App.css';
import UnregisteredList from './components/UnregisteredList.js';

function App() {
  return (
    <div className="App">
      <h1>Register Arsenal Players</h1>
      <div><UnregisteredList /></div>
    </div>
  );
}

export default App;
