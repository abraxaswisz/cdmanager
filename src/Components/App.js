import React, { Component } from "react";
import "../App.css";
import AddCDForm from "./AddCDForm";
import CDCollection from "./CDCollection";

class App extends Component {
  state = {
    cds: {}
  };
  addCD = cd => {
    const cds = { ...this.state.cds };
    cds[`cd${Date.now()}`] = cd;
    this.setState({
      cds
    });
  };
  updateCD = () => {};
  removeCD = () => {};
  render() {
    return (
      <React.Fragment>
        <AddCDForm
          addCD={this.addCD}
          updateCD={this.updateCD}
          removeCD={this.removeCD}
        />
        <CDCollection />
      </React.Fragment>
    );
  }
}

export default App;
