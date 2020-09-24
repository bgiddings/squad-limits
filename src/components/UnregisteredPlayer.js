import React from 'react';

class UnregisteredPlayer extends React.Component {
  render() {
    return (
      <li>{this.props.name}</li>
    );
  }
}

export default UnregisteredPlayer;
