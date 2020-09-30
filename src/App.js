import React from 'react';
import './App.css';
import EuropaLists from './components/EuropaLists.jsx';

function App() {
  return (
    <div className="App">
      <h1>Register Arsenal Players</h1>
      <p>Europa League and Champions League rules:</p>
      <ul>
        <li>4 slots for club-trained players (registered with the club for at least 3 years between the ages of 15 and 21)</li>
        <li>4 slots for either club-trained players or association-trained players (trained by a club in the same association)</li>
        <li>17 slots open for any eligible player</li>
        <li>Any number of club u21 players -- players who are u21 and have been with the club for at least 2 continuous years between 15 and 21</li>
      </ul>
      <div><EuropaLists /></div>
    </div>
  );
}

export default App;
