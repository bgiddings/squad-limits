import React from 'react';

class RegisteredPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleUnregister = this.handleUnregister.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.handleUnsell = this.handleUnsell.bind(this);
  }

  handleRegister(e) {
    if (this.props.reg) {
      this.props.reg(this.props.name);
    }
  }

  handleUnregister(e) {
    if (this.props.unreg) {
      this.props.unreg(this.props.name);
    }
  }

  handleSell(e) {
    if (this.props.sell) {
      this.props.sell(this.props.name);
    }
  }

  handleUnsell(e) {
    if (this.props.unsell) {
      this.props.unsell(this.props.name);
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.age}</td>
        {this.props.reg && <td><button onClick={this.handleRegister}>Register</button></td>}
        {this.props.unreg && <td><button onClick={this.handleUnregister}>Unregister</button></td>}
        {this.props.sell && <td><button onClick={this.handleSell}>Sell / Loan</button></td>}
        {this.props.unsell && <td><button onClick={this.handleUnsell}>Cancel sale / loan</button></td>}
      </tr>
    );
  }
}

export default RegisteredPlayer;
