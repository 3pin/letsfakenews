import React from 'react';
import {
  Form
} from 'react-bootstrap';
import FrameButton from './frameButton';

export default class FrameForm extends React.Component {
  state = {
    formContent: ''
  }
  handleChange = (e) => {
    //console.log('formContent changing')
    this.setState({
      formContent: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log('formContent submitted')
    this.props.handleSubmit(this.state.formContent);
  }
  render() {
    // setup char-counter
    let content = String(this.state.formContent)
    let contentLength
    if (content === 'undefined') {
      contentLength = 0
    } else {
      contentLength = content.length
    }
    let maxLength = Number(this.props.maxLength)
    //
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
          <FrameButton
            submitting={this.props.submitting}
            buttonLabel="Next"/>
      </Form>
    </div>)
  }
}
