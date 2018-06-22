import React, { Component, Fragment } from "react";

class AddCDForm extends Component {
  render() {
    return (
      <Fragment>
        <form>
          <label htmlFor="artist">Artist</label>
          <input id="artist" type="text" />
          <br />
          <label htmlFor="album">Album</label>
          <input id="album" type="text" />
          <br />
          <label htmlFor="year">Year</label>
          <input id="year" type="text" />
          <br />
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default AddCDForm;
