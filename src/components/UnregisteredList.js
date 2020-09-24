import React from 'react';
import UnregisteredPlayer from './UnregisteredPlayer.js';
import {appendScript} from '../utils/appendscript.js';

const FOREIGN = 0;
const HOMEGROWN = 1;
const CLUB_TRAINED = 1 << 1;
const RECENT_TRANSFER = 1 << 2;

class UnregisteredList extends React.Component {
  constructor(props) {
    super(props);

    let players = {};
    const addPlayer = (name, age, status) => {
      players[name] = {name: name, age: age, status: status};
    };

    addPlayer("Ainsley Maitland-Niles", 23, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Alexandre Lacazette", 29, FOREIGN);
    addPlayer("Bernd Leno", 28, FOREIGN);
    addPlayer("Bukayo Saka", 19, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Calum Chambers", 25, HOMEGROWN);
    addPlayer("Cedric Soares", 29, FOREIGN);
    addPlayer("Dani Ceballos", 24, FOREIGN);
    addPlayer("David Luiz", 33, FOREIGN);
    addPlayer("Eddie Nketiah", 21, FOREIGN);
    addPlayer("Emile Smith Rowe", 20, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Gabriel Magalhães", 22, FOREIGN);
    addPlayer("Gabriel Martinelli", 19, FOREIGN | RECENT_TRANSFER);
    addPlayer("Granit Xhaka", 27, FOREIGN);
    addPlayer("Hector Bellerin", 25, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Joe Willock", 21, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Kieran Tierney", 23, FOREIGN);
    addPlayer("Lucas Torreira", 24, FOREIGN);
    addPlayer("Matt Macey", 26, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Matteo Guendouzi", 21, FOREIGN);
    addPlayer("Mesut Ozil", 31, FOREIGN);
    addPlayer("Mohamed Elneny", 28, FOREIGN);
    addPlayer("Nicolas Pépé", 25, FOREIGN);
    addPlayer("Pablo Mari", 27, FOREIGN);
    addPlayer("Pierre-Emerick Aubameyang", 31, FOREIGN);
    addPlayer("Reiss Nelson", 20, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Rob Holding", 25, HOMEGROWN);
    addPlayer("Rúnar Alex Rúnarsson", 25, FOREIGN);
    addPlayer("Sead Kolasinac", 27, FOREIGN);
    addPlayer("Shkodran Mustafi", 28, FOREIGN);
    addPlayer("Sokratis Papastathopoulos", 32, FOREIGN);
    addPlayer("William Saliba", 19, FOREIGN | RECENT_TRANSFER);
    addPlayer("Willian", 32, FOREIGN);

    let unregistered = [];
    for (const name in players) {
      unregistered.push(players[name]);
    }

    this.state = {
      unregistered: unregistered,
      // unregistered: [
      //   ["Ainsley Maitland-Niles", 23, HOMEGROWN | CLUB_TRAINED],
      //   ["Alexandre Lacazette", 29, FOREIGN],
      //   ["Bernd Leno", 28, FOREIGN],
      //   ["Bukayo Saka", 19, HOMEGROWN | CLUB_TRAINED],
      //   ["Calum Chambers", 25, HOMEGROWN],
      //   ["Cedric Soares", 29, FOREIGN],
      //   ["Dani Ceballos", 24, FOREIGN],
      //   ["David Luiz", 33, FOREIGN],
      //   ["Eddie Nketiah", 21, FOREIGN],
      //   ["Emile Smith Rowe", 20, HOMEGROWN | CLUB_TRAINED],
      //   ["Gabriel Magalhães", 22, FOREIGN],
      //   ["Gabriel Martinelli", 19, FOREIGN | RECENT_TRANSFER],
      //   ["Granit Xhaka", 27, FOREIGN],
      //   ["Hector Bellerin", 25, HOMEGROWN | CLUB_TRAINED],
      //   ["Joe Willock", 21, HOMEGROWN | CLUB_TRAINED],
      //   ["Kieran Tierney", 23, FOREIGN],
      //   ["Lucas Torreira", 24, FOREIGN],
      //   ["Matt Macey", 26, HOMEGROWN | CLUB_TRAINED],
      //   ["Matteo Guendouzi", 21, FOREIGN],
      //   ["Mesut Ozil", 31, FOREIGN],
      //   ["Mohamed Elneny", 28, FOREIGN],
      //   ["Nicolas Pépé", 25, FOREIGN],
      //   ["Pablo Mari", 27, FOREIGN],
      //   ["Pierre-Emerick Aubameyang", 31, FOREIGN],
      //   ["Reiss Nelson", 20, HOMEGROWN | CLUB_TRAINED],
      //   ["Rob Holding", 25, HOMEGROWN],
      //   ["Rúnar Alex Rúnarsson", 25, FOREIGN],
      //   ["Sead Kolasinac", 27, FOREIGN],
      //   ["Shkodran Mustafi", 28, FOREIGN],
      //   ["Sokratis Papastathopoulos", 32, FOREIGN],
      //   ["William Saliba", 19, FOREIGN | RECENT_TRANSFER],
      //   ["Willian", 32, FOREIGN],
      //]
    };
  }

  componentDidMount() {
    appendScript("sorttable.js");
  }

  registerPlayer(name) {
    // move player from unregistered list to registered list
    // player = players[name];
  }

  unregisterPlayer(name) {
    // move player from registered list to unregistered list
  }

  sellPlayer(name) {
    // move a player from unregistered list to sold list
  }

  unsellPlayer(name) {
    // move a player from sold list to unregistered list
  }

  render() {
    // const unreg_list = this.state.unregistered.map(e => <li>{e[0]}</li>);
    const unreg_list = this.state.unregistered.map(e => <UnregisteredPlayer name={e.name} age={e.age} reg={this.registerPlayer} sell={this.sellPlayer} />);
    return (
      <table class="sortable">
        <caption>Unregistered players</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Register</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          {unreg_list}
        </tbody>
      </table>
    );
  }
}

export default UnregisteredList;
