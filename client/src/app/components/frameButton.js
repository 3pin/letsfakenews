//Button component with DESC & BUTTON
import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';

const ButtonFrame = (props) => {
  // setup button-type and button-label
  let variant, buttonLabel;
  if (props.variant) {
    variant = props.variant
  } else {
    variant = 'secondary'
  }
  if (props.buttonLabel) {
    buttonLabel = props.buttonLabel
  } else {
    buttonLabel = 'Submit'
  }
  if (props.linkto) {
    // linkto next page || submit to API and await response
    return (
      <div>
        <p>{props.desc}</p>
        <Link to={props.linkto}>
          <Button variant={variant}>{buttonLabel}</Button>
        </Link>
      </div>
    )
  } else {
    // linkto next page || submit to API and await response
    return (
      <div>
        <p>{props.desc}</p>
        <Button variant={variant} onClick={props.handleClick}>{buttonLabel}</Button>
      </div>
    )
  }
}
export default ButtonFrame
