import React from 'react';

class UnregisteredPlayer extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.age}</td>
        <td><button>Register</button></td>
        <td><button>Sell</button></td>
      </tr>
    );
  }
}

export default UnregisteredPlayer;
