import React from 'react';
import {Link} from 'react-router-dom';

export default class Landing extends React.Component {
  handleChange(e) {
    //console.log(`form event: ${e.target.value}`);
    this.props.handleChange(e.target.value);
  }
  handleSubmit(e) {
    //console.log('Submit button clicked')
    this.props.handleSubmit(this.props.subject);
  };
  render() {
    return (<div>
      <form>
        <div>
          <textarea
          className="form-control form-responsive" required="required" autoFocus="autoFocus"
          rows={this.props.rows}
          maxLength={this.props.length}
          placeholder={`${this.props.length} chars max...`}
          value={this.props.value}
          onChange={this.handleChange.bind(this)}>
          </textarea>

          <br/>

          <Link to={this.props.linkto}>
            <button
            type="button"
            onClick={this.handleSubmit.bind(this)}
            className="btn btn-primary btn-responsive"
            >Submit
            </button>
          </Link>

          <hr/>

        </div>
      </form>
    </div>)
  }
}
