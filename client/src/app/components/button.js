import React from 'react';
import {Link} from 'react-router-dom';

export default class ButtonFrameForm extends React.Component {
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
    let buttonLabel;
    if (this.props.buttonlabel) {
      buttonLabel = this.props.buttonlabel
    } else {
      buttonLabel = 'Submit'
    }
    if (this.props.linkto) {
      return (<div>
        <p>{this.props.desc}</p>
        <Link to={this.props.linkto}>
          <button type="button"
          onClick={this.handleClick.bind(this)}
          className="btn btn-primary btn-responsive">{buttonLabel}</button>
        </Link>
      </div>)
    } else {
      return (<div>
        <p>{this.props.desc}</p>
          <button type="button"
          onClick={this.handleClick.bind(this)}
          className="btn btn-primary btn-responsive">{buttonLabel}</button>
      </div>)
    }
  }
}
