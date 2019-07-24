import React from 'react';
import {
  Form
} from 'react-bootstrap';
import ButtonForm from './buttonform';

export default class FrameForm extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  handleChange = (e) => {
    this.props.handleChange(e.target.value);
  }
  //suppress submit if form-action came from the write_story-frame... only accept from write_title-frame
  handleSubmit = () => {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }
  render() {
    let content = String(this.props.value)
    let contentLength
    if (content === 'undefined') {
      contentLength = 0
    } else {
      contentLength = content.length
    }
    let maxLength = Number(this.props.maxLength)
    return (<div>
      <Form onSubmit={this.handleSubmit}>
          <textarea
            className="form-control form-responsive"
            required="required"
            rows={this.props.rows}
            maxLength={this.props.maxLength}
            placeholder={`${this.props.minLength} - ${this.props.maxLength} chars...`}
            value={this.props.value}
            onChange={this.handleChange}>
          </textarea>
          <font id="char-count">{contentLength}/{maxLength}</font>
          <ButtonForm
            currentPathname = {this.props.currentPathname}
            value={this.props.value}
            minLength = {this.props.minLength}
            linkto={this.props.linkto}
            processing={this.props.processing}
            buttonLabel={this.props.buttonLabel}/>
      </Form>
    </div>)
  }
}
