import React, { Component } from "react";

class ArtistResult extends Component {
  render() {
    return (
      <li onClick={this.props.pickArtist} index={this.props.index}>
        {this.props.result.title}
      </li>
    );
  }
}

export default ArtistResult;
