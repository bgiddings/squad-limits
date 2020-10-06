// Main panel

import React from 'react';
import PlayerTable from './PlayerTable.jsx';
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
    addPlayer("Joe Willock", 21, HOMEGROWN | CLUB_TRAINED);
    addPlayer("Kieran Tierney", 23, FOREIGN);
    addPlayer("Matt Macey", 26, HOMEGROWN | CLUB_TRAINED);
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
      sold: [],
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
    let idx = this.state.unregistered.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.unregistered[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_sold = [...this.state.sold];

      local_unregistered.splice(idx, 1);
      local_sold.push(player);

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        sold: local_sold,
      });
    }
  }

  unsellPlayer(name) {
    // move a player from sold list to unregistered list
    let idx = this.state.sold.findIndex(e => e.name === name);
    if (idx !== -1) {
      let player = this.state.sold[idx];
      let local_unregistered = [...this.state.unregistered];
      let local_sold = [...this.state.sold];

      local_sold.splice(idx, 1);
      local_unregistered.push(player);

      this.setState({
        ...this.state,
        unregistered: local_unregistered,
        sold: local_sold,
      });
    }
  }

  listAll() {
    const unreg = this.state.unregistered.map(e => "* " + e.name).sort().join("\n");
    const foreign = this.state.reg_foreign.sort().map(e => "* " + e.name).sort().join("\n");
    const nation = this.state.reg_nation_trained.sort().map(e => "* " + e.name).sort().join("\n");
    const club = this.state.reg_club_trained.sort().map(e => "* " + e.name).sort().join("\n");
    const u21 = this.state.u21_club_trained.sort().map(e => "* " + e.name).sort().join("\n");
    const sold = this.state.sold.sort().map(e => "* " + e.name).sort().join("\n");

    let retval = "";

    if (unreg.length > 0) {
      retval += "Unregistered:\n\n" + unreg + "\n\n";
    }

    if (foreign.length > 0) {
      retval += "Registered Foreign Players:\n\n" + foreign + "\n\n";
    }

    if (nation.length > 0) {
      retval += "Registered Nation-Trained Players:\n\n" + nation + "\n\n";
    }

    if (club.length > 0) {
      retval += "Registered Club-Trained Players:\n\n" + club + "\n\n";
    }

    if (u21.length > 0) {
      retval += "U21 not-recently-joined Players (no registration needed):\n\n" + u21 + "\n\n";
    }

    if (sold.length > 0) {
      retval += "Sold / Loaned Players:\n\n" + sold + "\n\n";
    }

    return retval;
  }

  render() {
    const float_left = {
      float: "left",
    };

    const clear_left = {
      float: "left",
      clear: "left",
    };

    const text_list = this.listAll();

    return (
      <div>
        <div style={float_left}>
          <PlayerTable player_type="Unregistered"
                       list={this.state.unregistered}
                       reg={this.registerPlayer.bind(this)}
                       sell={this.sellPlayer.bind(this)} />
        </div>
        <div style={float_left}>
          <PlayerTable player_type="Registered foreign"
                       list={this.state.reg_foreign}
                       unreg={this.unregisterPlayer.bind(this)}
                       max="17" />
          <PlayerTable player_type="Registered nation-trained"
                       list={this.state.reg_nation_trained}
                       unreg={this.unregisterPlayer.bind(this)}
                       max="4" />
          <PlayerTable player_type="Registered club-trained"
                       list={this.state.reg_club_trained}
                       unreg={this.unregisterPlayer.bind(this)}
                       max="4" />
          <PlayerTable player_type="U21 club-trained"
                       list={this.state.u21_club_trained}
                       unreg={this.unregisterPlayer.bind(this)}
                       max="&infin;" />
        </div>
        <div style={float_left}>
          <PlayerTable player_type="Sold / Loaned"
                       list={this.state.sold}
                       unsell={this.unsellPlayer.bind(this)} />
        </div>
        <div style={clear_left}>
          <textarea rows="20" cols="35"
                    value={text_list}
                    readOnly></textarea>
        </div>
      </div>
    );
  }
}

export default UnregisteredList;
