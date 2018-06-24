import React, { Fragment, Component } from "react";

class EditCDForm extends Component {
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

export default EditCDForm;
