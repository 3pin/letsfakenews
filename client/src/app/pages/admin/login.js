// Login... user logins then backend verifies credentials
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {
  Redirect
} from 'react-router-dom';
import BannerFrame from '../../../app/components/bannerframe';
//import FormFrame from '../../../app/components/formframe';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    };
  }
  handleChange(event) {
    const {value,name} = event.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('/settings/authenticate', {
        body: JSON.stringify(this.state),
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        cache: 'no-cache',
        referrer: "client",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          //this.props.history.push('/');
          this.setState(() => ({
            redirect: true
          }))
          console.log('redirect', this.state.redirect)
        } else {
          this.setState(() => ({
            username: '',
            password: ''
          }))
          this.nameInput.focus()
          alert('Error logging in please try again');
          //const error = new Error(res.error);
          //throw error;
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/admin' />
    }
  }
  componentDidMount() {
    console.log('\n');
    console.log(this.props);
    console.log(this.state);
    console.log('\n');
    this.nameInput.focus()
  }
  render() {
    return (<div>
        {this.renderRedirect()}
        <BannerFrame title="Login..." desc="Admin access requires authorisation..."/>
        <hr/>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="username"
            name="username"
            ref={(input) => { this.nameInput = input; }}
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
            required/>
          <br/>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            required/>
          <br/>
          <br/>
         <Button variant="secondary" type="submit">Submit</Button>
        </Form>
        <hr/>
      </div>);
  }
}
