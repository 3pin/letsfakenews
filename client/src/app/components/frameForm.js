import React from 'react';
import {
  Form
} from 'react-bootstrap';
import FrameButton from './frameButton';

export default class FrameForm extends React.Component {
  state = {
    content: ''
  }
  handleChange = (e) => {
    //console.log('formContent changing')
    this.setState({
      content: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log('formContent submitted')
    this.props.handleSubmit(this.state.content);
  }
  componentDidMount() {
    let content = [...this.state.content, this.props.content]
    console.log('default formContent: ' + content)
    this.setState({
      content: content
    })
  }
  render() {
    // setup char-counter
    let content = String(this.state.content)
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
            value={this.state.content}
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
