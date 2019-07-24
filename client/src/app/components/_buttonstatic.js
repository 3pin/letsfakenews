import React from 'react';
import {
  Button
} from 'react-bootstrap';

const ButtonStatic = (props) => {
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
  // linkto next page || submit to API and await response
  return (
    <div>
      <p>{props.desc}</p>
      <Button variant={variant} onClick={props.handleClick}>{buttonLabel}</Button>
    </div>
  )
}
export default ButtonStatic
