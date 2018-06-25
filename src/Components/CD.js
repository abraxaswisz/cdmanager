import React, { Component, Fragment } from "react";

class CD extends Component {
  state = {
    editable: false
  };

  makeEditable = () => {
    this.setState({
      editable: !this.state.editable
    });
  };
  editCD = e => {
    console.log(" tutej,", e.currentTarget.name);
    console.log(this.props.updateCD);
    const updatedCD = {
      ...this.props.cd,
      [e.currentTarget.name]: e.currentTarget.value
    };
    this.props.updateCD(this.props.index, updatedCD);
  };
  render() {
    const { artist, album, year } = this.props.cd;
    if (!this.props.cd) return null;
    return (
      <Fragment>
        {this.state.editable ? (
          <Fragment>
            <input
              ref={this.artistRef}
              name="artist"
              id="artist"
              type="text"
              defaultValue={artist}
              onChange={this.editCD}
            />
            <br />
            <input
              ref={this.albumRef}
              name="album"
              id="album"
              type="text"
              defaultValue={album}
              onChange={this.editCD}
            />
            <br />
            <input
              ref={this.yearRef}
              name="year"
              id="year"
              type="number"
              step="1"
              defaultValue={year}
              onChange={this.editCD}
            />
            <br />
            <button onClick={this.makeEditable}>Save</button>
          </Fragment>
        ) : (
          <Fragment>
            <h3>{artist}</h3>
            <h4>{album}</h4>
            <h5>{year}</h5>
            <button onClick={() => this.props.removeCD(this.props.index)}>
              remove CD
            </button>
            <button onClick={this.makeEditable}>Edit CD</button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default CD;
