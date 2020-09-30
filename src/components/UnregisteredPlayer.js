import React from 'react';

class UnregisteredPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSell = this.handleSell.bind(this);
  }

  handleRegister(e) {
    this.props.reg(this.props.name);
  }

  handleSell(e) {
    this.props.sell(this.props.name);
  }


  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.age}</td>
        <td><button onClick={this.handleRegister}>Register</button></td>
        <td><button onClick={this.handleSell}>Sell / Loan</button></td>
      </tr>
    );
  }
}

export default UnregisteredPlayer;
