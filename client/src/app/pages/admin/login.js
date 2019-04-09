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
    const {
      value,
      name
    } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    fetch('/settings/authenticate', {
        method: 'POST',
        body: JSON.stringify(this.state),
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
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
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
  }
  render() {
    return (<div>
        {this.renderRedirect()}
        <BannerFrame title="Login..." desc="Admin access require authorisation..."/>
        <hr/>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="username"
            name="username"
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
         <Button variant="secondary" type="submit">Submit</Button>
        </Form>
        <hr/>
      </div>);
  }
}
