import React from 'react';
import {
  Form
} from 'react-bootstrap';
import ButtonForm from './buttonform';

export default class FrameForm extends React.Component {
  state = {
    formContent: null
  }
  handleChange = (e) => {
    console.log('formContent changing')
    this.setState({
      formContent: e.target.value
    })
  }
  handleSubmit = (e) => {
    //
  }
  componentWillUnmount() {
    console.log('form submitted')
    this.props.handleSubmit(this.state.formContent);
  }
  render() {
    //console.log('this.state.formContent: ' + this.state.formContent)
    let content = String(this.state.formContent)
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
