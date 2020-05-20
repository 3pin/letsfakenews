import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Table,
  Button,
} from 'react-bootstrap';
import FrameBanner from '../../components/frameBanner';
import 'eventsource-polyfill';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource('http://localhost:5000/settings/sse');
    }
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      feedback: [],
    };
  }

  handleClear() {
    const { room } = this.props;
    /* Connect to API and clear all from database */
    document.activeElement.blur();
    /* Connect to API and clear feedback from database */
    axios.delete(this.props.apiClear, {
      params: {
        room,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        feedback: res.data.feedback,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'That action could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
        // window.alert('Your story could not be validated: reregister your room ID with the app');
      }
      window.history.push('/error');
    });
  }

  componentDidMount() {
    /* open sse listener */
    this.eventSource.addEventListener('feedback', (e) => {
      console.log('A new feedback was processed by the backend');
      const data = JSON.parse(e.data);
      if (data.room === this.props.room) {
        console.log('the new feedback relates to this room');
        this.setState({
          feedback: data.feedbacks,
        });
      }
      // this.setState({ feedback: JSON.parse(e.data) });
    });
    // Catche errors
    this.eventSource.onerror = (e) => {
      console.log('--- SSE EVENTSOURCE ERROR: ', e);
    };
    /* load database into this.state */
    const { room } = this.props;
    axios.get(this.props.apiHello, {
      params: {
        room,
      },
    }).then((res) => {
      // console.log(res);
      this.setState({
        feedback: res.data.feedback,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your connection could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
        // window.alert('Your story could not be validated: reregister your room ID with the app');
      }
      window.history.push('/error');
    });
  }

  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }

  render() {
    const tableStyle = {
      backgroundColor: 'white',
    };
    return (
      <div>
        <FrameBanner desc={this.props.desc} title={this.props.title} />
        <hr />
        <Table bordered style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th style={{
                width: '95%',
              }}
              >
                Command
              </th>
              <th style={{
                width: '5%',
              }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Clear all entries from database</td>
              <td>
                <Button variant="outline-danger" onClick={() => { window.confirm('Are you sure you wish to delete this item?') ? this.handleClear() : document.activeElement.blur(); }} />
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <Table bordered style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th style={{
                width: '5%',
              }}
              >
                #
              </th>
              <th style={{
                width: '95%',
              }}
              >
                Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {
              (this.state.feedback.length > 0)
                ? this.state.feedback.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.feedback}</td>
                  </tr>
                ))
                : <tr />
            }
          </tbody>
        </Table>
        <hr />
      </div>
    );
  }
}
export default connect(mapStateToProps)(Feedback);
