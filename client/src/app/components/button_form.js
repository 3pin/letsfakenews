import React from 'react';
import {Link} from 'react-router-dom';

export default class Landing extends React.Component {
  handleSubmit(e) {
    console.log('Button clicked')
    //e.preventDefault();
    this.props.handleSubmit(e);
  };
  render() {
    return (<div>
      <p>{this.props.desc}</p>
      <Link to={this.props.linkto}>
        <button
        type="button"
        className="btn btn-primary btn-responsive"
        >{this.props.label}
        </button>
      </Link>
      <br/>
      <hr/>
    </div>)
  }
}
