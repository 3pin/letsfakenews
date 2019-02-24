import React from 'react';
import {Link} from 'react-router-dom';

export default class ButtonFrameForm extends React.Component {
  handleSubmit() {
    //console.log('Button clicked')
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  };
  render() {
    let buttonLabel;
    if (this.props.buttonlabel) {
      buttonLabel = this.props.buttonlabel
    } else {
      buttonLabel = 'Submit'
    }
    return (<div>
      <p>{this.props.desc}</p>
      <Link to={this.props.linkto}>
        <button type="button" onClick={this.handleSubmit.bind(this)} className="btn btn-primary btn-responsive">{buttonLabel}</button>
      </Link>
    </div>)
  }
}
