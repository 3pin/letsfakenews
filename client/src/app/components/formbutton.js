import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Button
} from 'react-bootstrap';

export default class ButtonFrame extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  handleClick() {
    console.log('Button clicked')
    if (this.props.handleClick) {
      this.props.handleClick();
    }
  }
  render() {
    // setup button label & type
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
    // test for length of user-content
    let link, content, contentLength, minLength
    content = String(this.props.value)
    contentLength = content.length
    console.log('contentLength: ' + contentLength)
    minLength = Number(this.props.minLength)
    if (contentLength<minLength) {
      link = this.props.currentPathname
    } else {
      link = this.props.linkto
    }
    //console.log(`${contentLength}/${minLength} => ${link}`)
    // if this button not connecting to API
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
    // if this button IS connecting to API
    else {
      if (this.props.processing === false) {
        console.log('API not connected to')
        return (
          <div>
            <p>{this.props.desc}</p>
            <Button variant={variant} onClick={() => { contentLength<minLength ? window.alert('What you wrote is too short') : this.handleClick() } }>{buttonLabel}</Button>
          </div>
        )
      } else {
        console.log('API connected')
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
