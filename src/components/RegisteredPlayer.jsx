import React from 'react';

class RegisteredPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUnregister = this.handleUnregister.bind(this);
  }

  handleUnregister(e) {
    this.props.unreg(this.props.name);
  }

  render() {
    return (
      <tr>
      <td>{this.props.name}</td>
      <td>{this.props.age}</td>
      <td><button onClick={this.handleUnregister}>Unregister</button></td>
      </tr>
    );
  }
}

export default RegisteredPlayer;
