import React, { Component } from "react";

class AlbumResult extends Component {
  render() {
    const { title, thumb } = this.props.album;
    const { pickAlbum, index } = this.props;
    return (
      <li onClick={pickAlbum} index={index}>
        {title}
        <img src={thumb} alt={title} />
      </li>
    );
  }
}

export default AlbumResult;
