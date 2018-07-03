import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ArtistResult from "./ArtistResult";
import AlbumResult from "./AlbumResult";

class AddCDForm extends Component {
  state = {
    searchArtistresult: [],
    artistReleases: [],
    searchAlbumresult: []
  };
  artistRef = React.createRef();
  albumRef = React.createRef();
  yearRef = React.createRef();
  static propTypes = {
    addCD: PropTypes.func
  };
  // create Cd and to your collection
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
  // fetch Artist from discogs api and add to state
  getArtist = query => {
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

  pickArtistAndGetReleases = e => {
    // variables
    let artistName = e.currentTarget.innerText;
    console.log(e.currentTarget);
    const getArtistId = e.currentTarget.attributes.index.value;
    // variables for fetch
    const key = "CkcQiUDczVzwnWytrlqy";
    const secret = "mtTuMzcQhlmSqLvTwSwXvjWoenTiRgiM";
    const url = `https://api.discogs.com/artists/${getArtistId}/releases?sort=format&?sort_order=desc&key=${key}&secret=${secret}&per_page=100`;

    // helper method
    const filterList = json => {
      const filteredArray = [];
      const { pages, urls } = json.pagination;
      let changingUrls = urls.next.split("&page=2").join("");

      for (let i = 0; i < pages; i++) {
        fetch(`${changingUrls}&page=${i}`)
          .then(res => res.json())
          .then(json => {
            let filteredList = json.releases.filter(
              key => key.type === "master" && key.role === "Main"
            );
            filteredArray.push(...filteredList);
            return filteredArray;
          })
          .then(array => {
            this.setState({
              artistReleases: [...array],
              searchArtistresult: []
            });
          });
      }
      return filteredArray;
    };

    fetch(url)
      .then(data => data.json())
      .then(json => {
        this.artistRef.current.value = artistName;
        if (json.pagination.pages > 1) {
          filterList(json);
        } else {
          this.setState({
            artistReleases: [...json.releases],
            searchArtistresult: []
          });
        }
      })
      .catch(err => console.log(err));
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
          return filteredArray.push(album);
        }
        return null;
      });
    }
    this.setState({
      searchAlbumresult: [...filteredArray]
    });
  };
  pickAlbum = e => {
    const { searchAlbumresult } = this.state;
    const getAlbumId = e.currentTarget.attributes.index.value;
    const getYear = searchAlbumresult.find(
      album => Number(album.id) === Number(getAlbumId)
    ).year;
    const getName = searchAlbumresult.find(
      album => Number(album.id) === Number(getAlbumId)
    ).title;
    this.yearRef.current.value = getYear;
    this.albumRef.current.value = getName;
    this.setState({
      artistReleases: [],
      searchAlbumresult: []
    });
  };
  render() {
    const { searchArtistresult, searchAlbumresult } = this.state;
    return (
      <Fragment>
        <form onSubmit={this.createCD}>
          <label htmlFor="artist">Artist</label>
          <input
            ref={this.artistRef}
            onBlur={() => {
              this.getArtist(this.artistRef.current.value);
            }}
            required
            id="artist"
            type="text"
          />
          <ul>
            {searchArtistresult
              ? searchArtistresult.map(result => {
                  return (
                    <ArtistResult
                      pickArtist={this.pickArtistAndGetReleases}
                      result={result}
                      key={result.id}
                      index={result.id}
                    />
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
                <AlbumResult
                  pickAlbum={this.pickAlbum}
                  album={album}
                  key={album.id + Math.random()}
                  index={album.id}
                />
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
