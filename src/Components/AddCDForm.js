import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ArtistSearchResult from "./ArtistSearchResult";

class AddCDForm extends Component {
  state = {
    searchArtistresult: [],
    artistReleases: [],
    searchAlbumresult: []
  };
  artistRef = React.createRef();
  albumRef = React.createRef();
  yearRef = React.createRef();
  searchArtistRef = React.createRef();
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
    this.setState({
      searchArtistresult: [],
      artistReleases: [],
      searchAlbumresult: []
    });
  };

  getDiscogsArtist = query => {
    const key = "CkcQiUDczVzwnWytrlqy";
    const secret = "mtTuMzcQhlmSqLvTwSwXvjWoenTiRgiM";
    const discogsSearch = `https://api.discogs.com/database/search?q=${query}&type=artist&key=${key}&secret=${secret}&per_page=10`;

    const artistArray = [];

    fetch(discogsSearch)
      .then(response => response.json())
      .then(json => artistArray.push(...json.results))
      .then(() => artistArray)
      .then(data => {
        if (query) {
          this.setState({
            searchArtistresult: [...data]
          });
        } else {
          this.setState({
            searchArtistresult: []
          });
        }
      })
      .catch(error => console.log(error));
    return artistArray;
  };
  pickArtist = e => {
    const getArtistId = e.currentTarget.attributes.index.value;
    const url = `https://api.discogs.com/artists/${getArtistId}`;
    if (getArtistId) {
      fetch(url)
        .then(data => data.json())
        .then(json => (this.artistRef.current.value = json.name))
        .then(() => fetch(`${url}/releases?&per_page=100`))
        .then(res => res.json())
        .then(json => this.setState({ artistReleases: [...json.releases] }))
        .catch(err => console.log(err));
    }
  };
  filterAlbum = () => {
    let albumRef = this.albumRef.current.value;
    const { artistReleases } = this.state;
    const filteredArray = [];
    console.log(albumRef);
    if (this.albumRef.current.value) {
      artistReleases.filter(album => {
        let albumToLower = album.title.toString().toLowerCase();
        if (albumToLower.includes(albumRef.toLowerCase())) {
          filteredArray.push(album);
        }
      });
    }
    this.setState({
      searchAlbumresult: [...filteredArray]
    });
  };
  pickAlbum = e => {
    const { searchAlbumresult } = this.state;
    const getAlbumId = e.currentTarget.attributes.index.value;
    const getYear = searchAlbumresult.find(album => album.id == getAlbumId)
      .year;
    const getName = searchAlbumresult.find(album => album.id == getAlbumId)
      .title;
    this.yearRef.current.value = getYear;
    this.albumRef.current.value = getName;
  };
  render() {
    const {
      searchArtistresult,
      artistReleases,
      searchAlbumresult
    } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.createCD}>
          <label htmlFor="artist">Artist</label>
          <input
            ref={this.artistRef}
            onChange={() => this.getDiscogsArtist(this.artistRef.current.value)}
            required
            id="artist"
            type="text"
          />
          <ul>
            {searchArtistresult
              ? searchArtistresult.map(result => {
                  return (
                    <li
                      onClick={this.pickArtist}
                      ref={this.searchArtistRef}
                      key={result.id}
                      index={result.id}
                    >
                      {result.title}
                    </li>
                  );
                })
              : null}
          </ul>
          <br />
          <label htmlFor="album">Album</label>
          <input
            ref={this.albumRef}
            required
            id="album"
            type="text"
            onChange={this.filterAlbum}
          />
          <ul>
            {searchAlbumresult.map(album => {
              return (
                <li
                  onClick={this.pickAlbum}
                  ref={this.searchAlbumRef}
                  index={album.id}
                  key={album.id + 1}
                >
                  {album.title}
                </li>
              );
            })}
          </ul>
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
