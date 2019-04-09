import React from 'react';
import {Form} from 'react-bootstrap';
import ButtonFrame from './buttonframe';

export default class FormFrame extends React.Component {
  componentDidMount() {
    //console.log(this.props);
  }
  handleChange(e) {
    this.props.handleChange(e.target.value);
  }
  //suppress submit if form-action came from the write_story-frame... only accept from write_title-frame
  handleSubmit() {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }
  render() {
    return (<div>
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <textarea
            ref={function(input) {if (input != null) {input.focus();}}}
            className="form-control form-responsive"
            required="required"
            autoFocus
            rows={this.props.rows}
            maxLength={this.props.length}
            placeholder={`${this.props.length} chars max...`}
            value={this.props.value}
            onChange={this.handleChange.bind(this)}>
          </textarea>
          <ButtonFrame
            linkto={this.props.linkto}
            buttonlabel={this.props.buttonlabel}
            handleClick={this.handleSubmit.bind(this)}/>
        </div>
      </Form>
    </div>)
  }
}
