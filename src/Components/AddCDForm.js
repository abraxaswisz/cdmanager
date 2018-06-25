import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class AddCDForm extends Component {
  artistRef = React.createRef();
  albumRef = React.createRef();
  yearRef = React.createRef();
  static propTypes = {
    addCD: PropTypes.func
  };

  createCD = e => {
    e.preventDefault();
    const cd = {
      artist: this.artistRef.current.value,
      album: this.albumRef.current.value,
      year: Number(this.yearRef.current.value)
    };
    this.props.addCD(cd);
    e.currentTarget.reset();
  };
  render() {
    return (
      <Fragment>
        <form onSubmit={this.createCD}>
          <label htmlFor="artist">Artist</label>
          <input ref={this.artistRef} required id="artist" type="text" />
          <br />
          <label htmlFor="album">Album</label>
          <input ref={this.albumRef} required id="album" type="text" />
          <br />
          <label htmlFor="year">Year</label>
          <input ref={this.yearRef} id="year" type="number" step="1" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default AddCDForm;
