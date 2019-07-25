import React from 'react';
import {
  Button
} from 'react-bootstrap';

//export default class ButtonForm extends React.Component {
const FrameButton = (props) => {
  // setup button type & label
  let variant;
  if (props.variant) {
    variant = props.variant
  } else {
    variant = 'secondary'
  }
  let buttonLabel;
  if (props.submitting === true) {
    buttonLabel = "Wait..."
  } else if (props.buttonLabel) {
    buttonLabel = props.buttonLabel
  } else {
    buttonLabel = 'Submit'
  }
  let buttonSize;
  if (props.buttonSize) {
    buttonSize = props.buttonSize
  } else {
    buttonSize = "md"
  }
  let disabled;
  if (props.submitting === true) {
    disabled = true
  } else {
    disabled = false
  }
  //form-submit buttons
  return (
    <div>
        <p>{props.desc}</p>
        <Button onClick={props.onClick} variant={variant} size={buttonSize} disabled={disabled}>{buttonLabel}</Button>
      </div>
  )

}
export default FrameButton
