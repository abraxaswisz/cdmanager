import React, { Component } from "react";

class ArtistResult extends Component {
  render() {
    return <li onClick={this.props.pickArtist}>{props.result.title}</li>;
  }
}

export default ArtistResult;
