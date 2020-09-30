import React from 'react';
import Player from './Player.jsx';


const PlayerTable = (props) => {

  let list;

  if ((props.reg) && (props.sell)) {
    list = props.list.map(
      e => <Player key={e.name}
      name={e.name}
      age={e.age}
      reg={props.reg}
      sell={props.sell} />
    );
  }
  else if (props.unreg) {
    list = props.list.map(
      e => <Player key={e.name}
                   name={e.name}
                   age={e.age}
                   unreg={props.unreg} />
    );
  }
  else if (props.unsell) {
    list = props.list.map(
      e => <Player key={e.name}
                   name={e.name}
                   age={e.age}
                   unsell={props.unsell} />
    );
  }

  const hidden = (props.list.length <= 0);
  const hidden_style = {display: "none"};

  return <>
    <table className="sortable" style={hidden ? hidden_style : {}}>
      <caption>{props.player_type} players: {list.length}{props.max && <span>/{props.max}</span>}</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </table>
    <hr style={hidden ? hidden_style : {}}/>
  </>
}

export default PlayerTable;
