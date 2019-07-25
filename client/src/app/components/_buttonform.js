import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';

//export default class ButtonForm extends React.Component {
const ButtonForm = (props) => {
  const handleClick = () => {
    console.log('clicked button: in buttonform')
    if (props.handleClick) {
      props.handleClick();
    }
  }
    // setup button type & label
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
    // test if the button's-form's-textarea content is long enough
    let link, content, contentLength, minLength
    content = String(props.value)
    contentLength = content.length
    minLength = Number(props.minLength)
    if (contentLength<minLength) {
      // re-link back to current page
      link = props.currentPathname
    } else {
      // allow-link to next page
      link = props.linkto
    }
    // return: button = LINK-TO-NEXT-PAGE
    if (props.linkto) {
      return (
        <div>
          <p>{props.desc}</p>
          <Link to={link}>
            <Button variant={variant} onClick={() => { contentLength<minLength ? window.alert('What you wrote is too short') : handleClick() } }>{buttonLabel}</Button>
          </Link>
        </div>
      )
    }
    // return: button = apiEndPoint... with 2 versions
    else {
      if (props.submitting === false) {
        return (
          <div>
            <p>{props.desc}</p>
            <Button variant={variant} onClick={() => { contentLength<minLength ? window.alert('What you wrote is too short') : handleClick() } }>{buttonLabel}</Button>
          </div>
        )
      } else {
        return (
          <div>
            <p>{props.desc}</p>
            <Button variant={variant} disabled>Submitting...</Button>
          </div>
        )
      }
    }
}
export default ButtonForm
