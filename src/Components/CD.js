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
    e.preventDefault();
    console.log(this.props.updateCD);
  };
  render() {
    const { artist, album, year } = this.props.cd;
    if (!this.props.cd) return null;
    return (
      <Fragment>
        {this.state.editable ? (
          <form onSubmit={this.editCD}>
            <input
              ref={this.artistRef}
              id="artist"
              type="text"
              defaultValue={artist}
            />
            <br />
            <input
              ref={this.albumRef}
              id="album"
              type="text"
              defaultValue={album}
            />
            <br />
            <input
              ref={this.yearRef}
              id="year"
              type="text"
              defaultValue={year}
            />
            <br />
            <button type="submit">Save</button>
          </form>
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
