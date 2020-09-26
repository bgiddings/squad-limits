import React from 'react';
import UnregisteredPlayer from './UnregisteredPlayer.js';
import RegisteredPlayer from './RegisteredPlayer.jsx';
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
    addPlayer("Eddie Nketiah", 21, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Emile Smith Rowe", 20, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Gabriel Magalhães", 22, FOREIGN);
    addPlayer("Gabriel Martinelli", 19, FOREIGN | RECENT_TRANSFER);
    addPlayer("Granit Xhaka", 27, FOREIGN);
    addPlayer("Hector Bellerin", 25, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Youssem Aouar", 22, FOREIGN);
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
    addPlayer("Thomas Partey", 27, FOREIGN);
    addPlayer("William Saliba", 19, FOREIGN | RECENT_TRANSFER);
    addPlayer("Willian", 32, FOREIGN);

    let unregistered = [];
    for (const name in players) {
      unregistered.push(players[name]);
    }


    this.state = {
      unregistered: unregistered,
      reg_foreign: [],
      reg_nation_trained: [],
      reg_club_trained: [],
      u21_club_trained: [],
    };
  }

  componentDidMount() {
    appendScript("sorttable.js");
  }

  registerPlayer(name) {
    // move player from unregistered list to registered list
    let idx = this.state.unregistered.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.unregistered[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_reg_foreign = [...this.state.reg_foreign];
      let local_reg_nation_trained = [...this.state.reg_nation_trained];
      let local_reg_club_trained = [...this.state.reg_club_trained];
      let local_u21_club_trained = [...this.state.u21_club_trained];

      if (player.status & CLUB_TRAINED) {
        if (player.age < 22) {
          local_unregistered.splice(idx, 1);
          local_u21_club_trained.push(player);
        }
        else {
          local_unregistered.splice(idx, 1);
          local_reg_club_trained.push(player);
        }
      }
      if ((player.status & CLUB_TRAINED) &&
               (local_reg_club_trained.length < 4)) {
      }
      else if ((player.status & (HOMEGROWN | CLUB_TRAINED)) &&
               (local_reg_nation_trained.length < 4)) {
        local_unregistered.splice(idx, 1);
        local_reg_nation_trained.push(player);
      }
      else if (local_reg_foreign.length < 17) {
        local_unregistered.splice(idx, 1);
        local_reg_foreign.push(player);
      }

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        reg_foreign: local_reg_foreign,
        reg_nation_trained: local_reg_nation_trained,
        reg_club_trained: local_reg_club_trained,
        u21_club_trained: local_u21_club_trained,
      });
    }
  }

  unregisterPlayer(name) {
    // move player from registered list to unregistered list
    let idx = this.state.reg_foreign.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.reg_foreign[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_reg_foreign = [...this.state.reg_foreign];

      local_reg_foreign.splice(idx, 1);
      local_unregistered.push(player)

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        reg_foreign: local_reg_foreign,
      });
    }

    idx = this.state.reg_nation_trained.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.reg_nation_trained[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_reg_nation_trained = [...this.state.reg_nation_trained];

      local_reg_nation_trained.splice(idx, 1);
      local_unregistered.push(player)

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        reg_nation_trained: local_reg_nation_trained,
      });
    }

    idx = this.state.reg_club_trained.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.reg_club_trained[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_reg_club_trained = [...this.state.reg_club_trained];

      local_reg_club_trained.splice(idx, 1);
      local_unregistered.push(player)

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        reg_club_trained: local_reg_club_trained,
      });
    }

    idx = this.state.u21_club_trained.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.u21_club_trained[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_u21_club_trained = [...this.state.u21_club_trained];

      local_u21_club_trained.splice(idx, 1);
      local_unregistered.push(player)

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        u21_club_trained: local_u21_club_trained,
      });
    }
  }

  sellPlayer(name) {
    // move a player from unregistered list to sold list
  }

  unsellPlayer(name) {
    // move a player from sold list to unregistered list
  }

  render() {
    // const unreg_list = this.state.unregistered.map(e => <li>{e[0]}</li>);
    const unreg_list = this.state.unregistered.map(
      e => <UnregisteredPlayer key={e.name} name={e.name} age={e.age} reg={this.registerPlayer.bind(this)} sell={this.sellPlayer.bind(this)} />
    );
    const reg_foreign = this.state.reg_foreign.map(
      e => <RegisteredPlayer key={e.name} name={e.name} age={e.age} unreg={this.unregisterPlayer.bind(this)} />
    );
    const reg_nation_trained = this.state.reg_nation_trained.map(
      e => <RegisteredPlayer key={e.name} name={e.name} age={e.age} unreg={this.unregisterPlayer.bind(this)} />
    );
    const reg_club_trained = this.state.reg_club_trained.map(
      e => <RegisteredPlayer key={e.name} name={e.name} age={e.age} unreg={this.unregisterPlayer.bind(this)} />
    );
    const u21_club_trained = this.state.u21_club_trained.map(
      e => <RegisteredPlayer key={e.name} name={e.name} age={e.age} unreg={this.unregisterPlayer.bind(this)} />
    );
    const float_left = {
      float: "left"
    };

    return (
      <div>
        <div style={float_left}>
          <table className="sortable">
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
        </div>
        <div style={float_left}>
          <table className="sortable">
            <caption>Registered foreign players ({reg_foreign.length}/17)</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reg_foreign}
            </tbody>
          </table>
          <table className="sortable">
            <caption>Registered nation-trained players ({reg_nation_trained.length}/4)</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reg_nation_trained}
            </tbody>
          </table>
          <table className="sortable">
            <caption>Registered club-trained players ({reg_club_trained.length}/4)</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reg_club_trained}
            </tbody>
          </table>
          <table className="sortable">
            <caption>U21 club-trained players</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {u21_club_trained}
            </tbody>
          </table>
        </div>
        <div style={float_left}>
          <table className="sortable">
            <caption>Sold / loaned players</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Unsell</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>joe</td>
                <td>01</td>
                <td>XX</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UnregisteredList;
