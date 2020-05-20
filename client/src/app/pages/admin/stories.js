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

class Stories extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource('http://localhost:5000/settings/sse');
    }
    //
    //
    this.handleAutolive = this.handleAutolive.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleStorylive = this.handleStorylive.bind(this);
    //
    this.state = {
      stories: [],
      autolive: false,
    };
  }

  handleAutolive() {
    /* PUT: update status of autolive */
    let newAutolive = !this.state.autolive;
    let { room } = this.props;
    axios.put(this.props.apiAutolive, {
      data: newAutolive,
    }, {
      params: {
        room,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        autolive: res.data.autolive,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
      }
      window.history.push('/error');
    });
  }

  handleRefresh() {
    const { room } = this.props;
    /* Connect to API to refresh imagery */
    document.activeElement.blur();
    axios.get(this.props.apiRefresh, {
      params: {
        room,
      },
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
      }
      window.history.push('/error');
    });
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
        stories: res.data.stories,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
      }
      window.history.push('/error');
    });
  }

  handleRemove(row) {
    document.activeElement.blur();
    const { _id } = row;
    const { room } = this.props;
    console.log(_id, room);
    /* Connect to API and delete single entry from database */
    axios.delete(this.props.apiRemove, {
      params: {
        room,
        _id,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        stories: res.data.stories,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
      }
      window.history.push('/error');
    });
  }

  handleStorylive(row) {
    const { _id } = row;
    const { room } = this.props;
    const { storylive } = row;
    console.log(_id, room, storylive);
    /* Connect to API to update storylive-setting for entry in database */
    axios.put(this.props.apiStorylive, {
      data: {
        _id,
        newStorylive: !storylive,
      },
    }, {
      params: {
        room,
      },
    }).then((res) => {
      console.log(res);
      this.setState({
        stories: res.data.stories,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
      }
      window.history.push('/error');
    });
  }

  componentDidMount() {
    const { room } = this.props;
    /* load autolive-status & stories from db */
    axios.get(this.props.apiHello, {
      params: {
        room,
      },
    }).then((res) => {
      this.setState({
        autolive: res.data.autolive,
        stories: res.data.stories,
      });
    }).catch((error) => {
      console.log(error.response.data.message);
      const obj = {};
      if (error.response.data.message === 'DB_ERROR') {
        obj.desc = 'Your story could not be validated: ensure you have selected a valid room.';
        obj.linkto = '/room';
      }
      window.history.push('/error');
    });
    /* open sse listener */
    this.eventSource.addEventListener('news', (e) => {
      console.log('A new story triggered a refresh of the stories_list');
      const data = JSON.parse(e.data);
      if (data.room === room) {
        console.log('the new story relates to this room');
        this.setState({
          stories: data.stories,
        });
      }
    });
    /* Catches errors */
    this.eventSource.onerror = (e) => {
      console.log('--- SSE EVENTSOURCE ERROR: ', e);
    };
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
                Database Moderation
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
              <td>Set new stories to go live automatically</td>
              <td style={{ textAlign: 'center' }}>
                <input type="checkbox" checked={this.state.autolive} onChange={this.handleAutolive.bind(this)} className="form-check-input show_tip autolive" />
              </td>
            </tr>
            <tr>
              <td>Refresh imagery for all stories</td>
              <td>
                <Button variant="outline-warning" onClick={() => { window.confirm('Are you sure you wish to refresh all images in the database?') ? this.handleRefresh() : document.activeElement.blur(); }} />
              </td>
            </tr>
            <tr>
              <td>Clear all stories from database</td>
              <td>
                <Button variant="outline-danger" onClick={() => { window.confirm('Are you sure you wish to delete all stories?') ? this.handleClear() : document.activeElement.blur(); }} />
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <Table ref="table_stories" bordered hover style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th style={{
                width: '5%',
              }}
              >
                #
              </th>
              <th style={{
                width: '20%',
              }}
              >
                Title
              </th>
              <th style={{
                width: '65%',
              }}
              >
                Story
              </th>
              <th style={{
                width: '6%',
              }}
              >
                Delete
              </th>
              <th style={{
                width: '4%',
              }}
              >
                Live
              </th>
            </tr>
          </thead>
          <tbody>
            {
              (this.state.stories.length > 0)
                ? this.state.stories.map((entry, index) => (
                  <tr key={index}>
                    <td style={{ display: 'none' }}>{entry._id}</td>
                    <td>{index + 1}</td>
                    <td>{entry.title}</td>
                    <td>{entry.story}</td>
                    <td>
                      <Button variant="outline-danger" onClick={() => this.handleRemove(entry)} />
                    </td>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" checked={entry.storylive === true} onChange={() => this.handleStorylive(entry)} className="form-check-input show_tip autolive" /></td>
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
export default connect(mapStateToProps)(Stories);
