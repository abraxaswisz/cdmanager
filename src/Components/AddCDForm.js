import React, { Component, Fragment } from "react";

class AddCDForm extends Component {
  artistRef = React.createRef();
  albumRef = React.createRef();
  yearRef = React.createRef();

  createCD = e => {
    e.preventDefault();
    console.log(this.artistRef.current.value);
    const cd = {
      artist: this.artistRef.current.value,
      album: this.artistRef.current.value,
      year: this.yearRef.current.value
    };
    this.props.addCD(cd);
  };
  render() {
    return (
      <Fragment>
        <form onSubmit={this.createCD}>
          <label htmlFor="artist">Artist</label>
          <input ref={this.artistRef} id="artist" type="text" />
          <br />
          <label htmlFor="album">Album</label>
          <input ref={this.albumRef} id="album" type="text" />
          <br />
          <label htmlFor="year">Year</label>
          <input ref={this.yearRef} id="year" type="text" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default AddCDForm;
