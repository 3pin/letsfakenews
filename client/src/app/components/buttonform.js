import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';

export default class ButtonForm extends React.Component {
  handleClick = () => {
    console.log('buttonform button clicked')
    if (this.props.handleClick) {
      this.props.handleClick();
    }
  }
  render() {
    // setup button type & label
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
    // test if the button's-form's-textarea content is long enough
    let link, content, contentLength, minLength
    content = String(this.props.value)
    contentLength = content.length
    minLength = Number(this.props.minLength)
    if (contentLength<minLength) {
      // re-link back to current page
      link = this.props.currentPathname
    } else {
      // allow-link to next page
      link = this.props.linkto
    }
    // return: button = LINK-TO-NEXT-PAGE
    if (this.props.linkto) {
      return (
        <div>
          <p>{this.props.desc}</p>
          <Link to={link}>
            <Button variant={variant} onClick={() => { contentLength<minLength ? window.alert('What you wrote is too short') : this.handleClick() } }>{buttonLabel}</Button>
          </Link>
        </div>
      )
    }
    // return: button = apiEndPoint... with 2 versions
    else {
      if (this.props.processing === false) {
        return (
          <div>
            <p>{this.props.desc}</p>
            <Button variant={variant} onClick={() => { contentLength<minLength ? window.alert('What you wrote is too short') : this.handleClick() } }>{buttonLabel}</Button>
          </div>
        )
      } else {
        return (
          <div>
            <p>{this.props.desc}</p>
            <Button variant={variant} disabled>Submitting...</Button>
          </div>
        )
      }
    }
  }
}
