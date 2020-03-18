import React from 'react';
import FrameBanner from '../../components/frameBanner';
import 'eventsource-polyfill';
import {
  Table,
  Button,
} from 'react-bootstrap';

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource('http://localhost:5000/settings/sse');
    }
    //
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
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

  apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message); } else { return body; }
  }

  apiPost = async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status !== 200) { throw Error(body.message); }
    return body;
  };

  handleAutolive() {
    /* update status of autolive */
    this.apiGet(this.props.apiAutolive)
      .then((res) => {
        this.setState({
          autolive: JSON.parse(res.autolive),
        });
        console.log(res);
      }).catch((err) => console.log(err));
  }

  handleRefresh() {
    /* Connect to API to refresh imagery */
    document.activeElement.blur();
    this.apiGet(this.props.apiRefresh).then((res) => console.log(res)).catch((err) => console.log(err));
  }

  handleClear() {
    /* Connect to API and clear all from database */
    document.activeElement.blur();
    /* Connect to API and clear feedback from database */
    this.apiPost(this.props.apiClear).then((res) => this.setState({
      stories: res.stories,
      activelistLength: res.activelistLength,
      visualise: 0,
    })).catch((err) => console.log(err));
  }

  handleRemove(row) {
    document.activeElement.blur();
    /* Connect to API and delete single entry from database */
    this.apiPost(this.props.apiRemove, row).then((res) => this.setState({
      stories: res.stories,
      activelistLength: res.activelistLength,
      visualise: JSON.parse(res.visualise),
    })).catch((err) => console.log(err));
  }

  handleStorylive(row) {
    /* Connect to API to update storylive-setting for entry in database */
    this.apiPost(this.props.apiStorylive, row).then((res) => this.setState({
      stories: res.stories,
      activelistLength: res.activelistLength,
      visualise: JSON.parse(res.visualise),
    }, () => {
      console.log(this.state);
    })).catch((err) => console.log(err));
  }

  componentDidMount() {
    /* load autolive-status & stories from Db */
    this.apiGet(this.props.apiHello)
      .then((res) => {
        this.setState({
          autolive: JSON.parse(res.autolive),
          stories: res.stories,
        });
        console.log(res);
      }).catch((err) => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('story', (e) => {
      console.log('A new story triggered a refresh of the stories_list');
      this.setState({
        stories: JSON.parse(e.data),
      });
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
                <Button variant="outline-danger" onClick={() => { window.confirm('Are you sure you wish to delete this item?') ? this.handleClear() : document.activeElement.blur(); }} />
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
