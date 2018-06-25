import React, { Component, Fragment } from "react";
import CD from "./CD";
import PropTypes from "prop-types";

class CDCollection extends Component {
  static propTypes = {
    cds: PropTypes.object,
    removeCD: PropTypes.func,
    updateCD: PropTypes.func
  };
  render() {
    return (
      <Fragment>
        <ul>
          {Object.keys(this.props.cds).map(key => (
            <li key={key}>
              <CD
                cd={this.props.cds[key]}
                removeCD={this.props.removeCD}
                updateCD={this.props.updateCD}
                index={key}
              />
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default CDCollection;
