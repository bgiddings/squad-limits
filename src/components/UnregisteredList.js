import React from 'react';
import UnregisteredPlayer from './UnregisteredPlayer.js';

const FOREIGN = 0;
const HOMEGROWN = 1;
const CLUB_TRAINED = 1 << 1;
const RECENT_TRANSFER = 1 << 2;

class UnregisteredList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unregistered: [
        ["Ainsley Maitland-Niles", 23, HOMEGROWN | CLUB_TRAINED],
        ["Alexandre Lacazette", 29, FOREIGN],
        ["Bernd Leno", 28, FOREIGN],
        ["Bukayo Saka", 19, HOMEGROWN | CLUB_TRAINED],
        ["Calum Chambers", 25, HOMEGROWN],
        ["Cedric Soares", 29, FOREIGN],
        ["Dani Ceballos", 24, FOREIGN],
        ["David Luiz", 33, FOREIGN],
        ["Eddie Nketiah", 21, FOREIGN],
        ["Emile Smith Rowe", 20, HOMEGROWN | CLUB_TRAINED],
        ["Gabriel Magalhães", 22, FOREIGN],
        ["Gabriel Martinelli", 19, FOREIGN | RECENT_TRANSFER],
        ["Granit Xhaka", 27, FOREIGN],
        ["Hector Bellerin", 25, HOMEGROWN | CLUB_TRAINED],
        ["Joe Willock", 21, HOMEGROWN | CLUB_TRAINED],
        ["Kieran Tierney", 23, FOREIGN],
        ["Lucas Torreira", 24, FOREIGN],
        ["Matt Macey", 26, HOMEGROWN | CLUB_TRAINED],
        ["Matteo Guendouzi", 21, FOREIGN],
        ["Mesut Ozil", 31, FOREIGN],
        ["Mohamed Elneny", 28, FOREIGN],
        ["Nicolas Pépé", 25, FOREIGN],
        ["Pablo Mari", 27, FOREIGN],
        ["Pierre-Emerick Aubameyang", 31, FOREIGN],
        ["Reiss Nelson", 20, HOMEGROWN | CLUB_TRAINED],
        ["Rob Holding", 25, HOMEGROWN],
        ["Rúnar Alex Rúnarsson", 25, FOREIGN],
        ["Sead Kolasinac", 27, FOREIGN],
        ["Shkodran Mustafi", 28, FOREIGN],
        ["Sokratis Papastathopoulos", 32, FOREIGN],
        ["William Saliba", 19, FOREIGN | RECENT_TRANSFER],
        ["Willian", 32, FOREIGN],
      ]
    };
  }

  render() {
    // const unreg_list = this.state.unregistered.map(e => <li>{e[0]}</li>);
    const unreg_list = this.state.unregistered.map(e => <UnregisteredPlayer name={e[0]} />);
    return (
        <div>
        length is: {this.state.unregistered.length}
        <ul>{unreg_list}</ul>
      </div>
    );
  }
}

export default UnregisteredList;
