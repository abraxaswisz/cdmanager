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
  updateCD = (cd, updatedCd) => {
    const cds = { ...this.state.cds };
    cds[cd] = updatedCd;
    this.setState({
      cds
    });
  };
  removeCD = cd => {
    const cds = { ...this.state.cds };
    delete cds[cd];
    this.setState({
      cds
    });
  };

  render() {
    return (
      <React.Fragment>
        <div id="wrapper">
          <AddCDForm addCD={this.addCD} />
          <CDCollection
            cds={this.state.cds}
            removeCD={this.removeCD}
            updateCD={this.updateCD}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
