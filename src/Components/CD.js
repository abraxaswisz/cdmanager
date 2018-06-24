import React, { Component, Fragment } from "react";
import EditCDForm from "./EditCDForm";

class CD extends Component {
  state = {
    editable: false
  };
  makeEditable = cd => {
    this.setState({
      editable: !this.state.editable
    });
  };
  render() {
    const { artist, album, year } = this.props.cd;
    if (!this.props.cd) return null;
    if (this.state.editable) return <EditCDForm />;
    return (
      <Fragment>
        <h3>{artist}</h3>
        <h4>{album}</h4>
        <h5>{year}</h5>
        <button onClick={() => this.props.removeCD(this.props.index)}>
          remove CD
        </button>
        <button onClick={this.makeEditable}>Edit CD</button>
      </Fragment>
    );
  }
}

export default CD;
