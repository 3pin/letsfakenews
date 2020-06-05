import React from 'react';
import {
  Form
} from 'react-bootstrap';
import FrameButton from './frameButton';

export default class FrameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      disabled: true,
    }
  }
  // disable/enable formSubmission
  testMinLength = () => {
    if (this.state.content.length >= this.props.minLength) {
      this.setState({
        disabled: false,
      })
    } else {
      this.setState({
        disabled: true,
      })
    }
  }
  // handle-user-input
  handleChange = (e) => {
    this.setState({
      content: e.target.value
    }, this.testMinLength);
  }
  // handle-form-submit
  handleSubmit = (e) => {
    if (this.state.content.length >= this.props.minLength) {
      e.preventDefault();
      this.props.handleSubmit(this.state.content);
    }
  }
  // route RETURN key to handle-form-submit
  onKeyPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      // e.preventDefault();
      this.handleSubmit(e);
    }
  }
  componentDidMount() {
    console.log(this.props);
    console.log(this.state);
    // this.nameInput.focus();
    this.setState((state) => ({content: this.props.content}))
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
            ref={(input) => { this.nameInput = input; }}
            className="form-control form-responsive"
            required="required"
            rows={this.props.rows}
            maxLength={this.props.maxLength}
            placeholder={`${this.props.minLength} - ${this.props.maxLength} chars...`}
            value={this.state.content}
            onKeyDown={this.onKeyDown}
            onChange={this.handleChange}>
          </textarea>
          <font id="char-count">{contentLength}/{maxLength}</font>
          <FrameButton
            linkto={this.props.linkto}
            onClick={this.props.onClick}
            desc={this.props.desc}
            disabled={this.state.disabled}
            variant={this.props.variant}
            submitting={this.props.submitting}
            buttonLabel={this.props.buttonLabel}/>
      </Form>
    </div>)
  }
}
