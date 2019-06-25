import React from 'react';
import {
  Button
} from 'react-bootstrap';

export default class ButtonFrame extends React.Component {
  render() {
    // setup button-type and button-label
    let variant, buttonLabel;
    if (this.props.variant) {
      variant = this.props.variant
    } else {
      variant = 'secondary'
    }
    if (this.props.buttonLabel) {
      buttonLabel = this.props.buttonLabel
    } else {
      buttonLabel = 'Submit'
    }
    // linkto next page || submit to API and await response
    return (
      <div>
          <p>{this.props.desc}</p>
          <Button variant={variant} onClick={this.props.handleClick}>{buttonLabel}</Button>
      </div>
    )
  }
}
