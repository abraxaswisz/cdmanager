import React from "react";

class ArtistSearchResult extends React.Component {
  state = {
    pickedArtist: ""
  };
  pickArtist = e => {
    this.setState({
      pickedArtist: this.props.result.id
    });
  };
  render() {
    return (
      <li onClick={this.pickArtist}>
        {this.props.result.title}
        {`https://api.discogs.com/artists/${this.props.result.id}/releases`}
      </li>
    );
  }
}

export default ArtistSearchResult;
