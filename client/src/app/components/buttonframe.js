import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

export default class ButtonFrame extends React.Component {
  componentDidMount() {
    //console.log(this.props);
  }
  handleClick() {
    //console.log('Button clicked')
    if (this.props.handleClick) {
      this.props.handleClick();
    }
  }
  render() {
    let variant, buttonLabel;
    if (this.props.variant) {
      variant = this.props.variant
    } else {
      variant = 'secondary'
    }
    if (this.props.buttonlabel) {
      buttonLabel = this.props.buttonlabel
    } else {
      buttonLabel = 'Submit'
    }
    if (this.props.linkto) {
      return (
        <div>
          <p>{this.props.desc}</p>
          <Link to={this.props.linkto}>
            <Button variant={variant} onClick={this.handleClick.bind(this)}>{buttonLabel}</Button>
          </Link>
        </div>
        )
    } else {
      return (
        <div>
          <p>{this.props.desc}</p>
            <Button variant={variant} onClick={this.handleClick.bind(this)}>{buttonLabel}</Button>
        </div>
    )
    }
  }
}
