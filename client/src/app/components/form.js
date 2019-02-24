import React from 'react';
//import {Link} from 'react-router-dom';

import ButtonFrame from './button';

export default class FormFrame extends React.Component {
  handleChange(e) {
    //console.log(e.target.value);
    const obj = {}
    obj[this.props.subject] = e.target.value;
    //console.log(obj)
    this.props.handleChange(obj);
  }
  //suppress submit if form-action came from the write_story-frame... only accept from write_title-frame
  handleSubmit() {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }
  render() {
    return (<div>
      <form>
        <div>
          <textarea className="form-control form-responsive" required="required" autoFocus="autoFocus" rows={this.props.rows} maxLength={this.props.length} placeholder={`${this.props.length} chars max...`} value={this.props.value} onChange={this.handleChange.bind(this)}></textarea>
          <ButtonFrame linkto={this.props.linkto} buttonlabel={this.props.buttonlabel} handleSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </form>
    </div>)
  }
}
