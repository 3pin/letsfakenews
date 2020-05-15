// Login... user logins then backend verifies credentials
import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Form,
  Button,
} from 'react-bootstrap';
import {
  Redirect,
  withRouter,
} from 'react-router-dom';
import axios from 'axios';

import FrameBanner from '../../components/frameBanner';

import * as actions from '../../actions/loginStatus';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});
// which props do we want to update, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  loginSuccess: () => {
    dispatch(actions.loginSuccess());
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
  }

  componentDidMount() {
    // this.nameInput.focus()
  }

  handleChange(event) {
    const {
      value,
      name,
    } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      room,
    } = this.props;
    const data = this.state;
    axios.post('/settings/authenticate', {
      data,
    }, {
      params: {
        room,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        // dipatch action to change button-UI
        this.props.loginSuccess();
        // this.props.history.push('/');
        this.setState(() => ({
          redirect: true,
        }));
      } else {
        this.setState(() => ({
          username: '',
          password: '',
        }));
        this.nameInput.focus();
        alert(JSON.stringify(res.error));
      }
    }).catch((err) => console.log(err));
  }

  renderRedirect() {
    const {
      redirect,
    } = this.state;
    if (redirect) {
      return <Redirect to="/admin" />;
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <FrameBanner
          title="Login"
          desc="Moderator access requires login..."
        />
        <hr />
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <input
            ref={(input) => {
              this.nameInput = input;
            }}
            autoFocus
            type="username"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            required
          />
          <br />
          <br />
          <Button type="submit">
            Submit
          </Button>
        </Form>
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
