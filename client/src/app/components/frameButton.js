import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Button,
} from 'react-bootstrap';

class FrameButton extends React.Component {
  constructor(props) {
    super(props);
    this.button = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.button.current.click();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    // setup button type & label
    let variant, buttonLabel, buttonSize, disabled, className;
    if (this.props.variant) {
      variant = this.props.variant;
    } else {
      variant = 'primary';
    }
    if (this.props.submitting) {
      buttonLabel = 'Wait...';
    } else if (this.props.buttonLabel) {
      buttonLabel = this.props.buttonLabel;
    } else {
      buttonLabel = 'Submit';
    }
    if (this.props.buttonSize) {
      buttonSize = this.props.buttonSize;
    } else {
      buttonSize = 'md';
    }
    if (this.props.disabled) {
      disabled = true;
    }
    if (this.props.submitting) {
      disabled = true;
    }
    if (this.props.className) {
      className = this.props.className;
    } else {
      className = '';
    }
    if (this.props.linkto) {
      // console.log('button-type:linkto');
      return (
        <div className={className}>
          <p>{this.props.desc}</p>
          <Link to={this.props.linkto}>
            <Button ref={this.button} variant={variant} size={buttonSize}>{buttonLabel}</Button>
          </Link>
        </div>
      );
    }
    if (this.props.onClick) {
      // console.log('button-type:connect-API');
      return (
        <div>
          <p>{this.props.desc}</p>
          <Button ref={this.button} onClick={this.props.onClick} variant={variant} size={buttonSize} disabled={disabled}>{buttonLabel}</Button>
        </div>
      );
    }
    // console.log('button-type:formSubmission');
    return (
      <div>
        <p>{this.props.desc}</p>
        <Button ref={this.button} type="submit" variant={variant} size={buttonSize} disabled={disabled}>{buttonLabel}</Button>
      </div>
    );
  }
}

export default FrameButton;
