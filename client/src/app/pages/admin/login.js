// Login... user logins then backend verifies credentials
import React from 'react';
import BannerFrame from '../../../app/components/banner';
//import FormFrame from '../../../app/components/form';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'username': '',
      'password': ''
    };
  }
  handleChange(event) {
    const {value,name} = event.target;
    this.setState({[name]: value});
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/settings/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    const body = await response.text();
    console.log(body);
  };
  _handleSubmit(event) {
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
  render() {
    return (<div>
      <BannerFrame title="Login..." desc="Login with your admin credentials."/>
      <hr/>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="username"
          name="username"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleChange.bind(this)}
          required
        />
       <input type="submit" value="Submit"/>
      </form>
      <hr/>

      </div>);
  }
}
