import React, { Component, Fragment } from "react";

class CD extends Component {
  render() {
    const { artist, album, year } = this.props.cd;
    if (!this.props.cd) return null;
    return (
      <Fragment>
        <h3>{artist}</h3>
        <h4>{album}</h4>
        <h5>{year}</h5>
        <button onClick={() => this.props.removeCD(this.props.index)}>
          remove CD
        </button>
      </Fragment>
    );
  }
}

export default CD;
