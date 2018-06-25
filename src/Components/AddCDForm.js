import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getDiscogsAlbum } from "../discogs.js";

class AddCDForm extends Component {
  state = {
    searchresults: []
  };
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
  generateList = () => {
    let getAlbum = getDiscogsAlbum(this.artistRef.current.value);
    const { searchresults } = this.state;
    console.log(getAlbum);
    if (getAlbum) {
      this.setState(prevState => ({
        searchresults: [...prevState.searchresults, ...getAlbum]
      }));
    }
  };
  render() {
    return (
      <Fragment>
        <form onSubmit={this.createCD}>
          <label htmlFor="artist">Artist</label>
          <input
            ref={this.artistRef}
            onChange={this.generateList}
            required
            id="artist"
            type="text"
          />
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
