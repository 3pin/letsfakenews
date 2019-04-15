import React from 'react';
import BannerFrame from '../../../app/components/bannerframe';
import 'eventsource-polyfill';
import {Table, Button} from 'react-bootstrap';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    console.log('NODE_ENV: ' + process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource(`http://localhost:5000/settings/sse`);
    }
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.state = {
      feedback: []
    };
  }
  apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  apiPost = async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  };
  handleClear() {
    /* Connect to API and clear all from database */
    document.activeElement.blur();
    /* Connect to API and clear feedback from database */
    let data = {
      subject: this.props.title
    }
    this.apiPost(this.props.apiClear, data).then(res => this.setState({
      feedback: res.data
    })).catch(err => console.log(err));
  }
  componentDidMount() {
    /* open sse listener */
    this.eventSource.addEventListener('feedback', (e) => {
      console.log('A new feedback was processed by the backend');
      this.setState({feedback: JSON.parse(e.data)});
    });
    // Catche errors
    this.eventSource.onerror = (e) => {
      console.log("--- SSE EVENTSOURCE ERROR: ", e);
    };
    /* load database into this.state */
    this.apiGet(this.props.apiHello).then(res => this.setState({
      feedback: res.feedback
    })).catch(err => console.log(err));
  }
  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }
  render() {
    const tableStyle = {
      backgroundColor: "white"
    }
    let variant;
    if (this.props.variant) {
      variant = this.props.variant
    } else {
      variant = 'danger'
    }
    return (<div>
      <BannerFrame desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <Table bordered style={tableStyle}>
        <thead className="thead-dark">
          <tr>
            <th style={{
                width: "95%"
              }}>Command</th>
            <th style={{
                width: "5%"
              }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clear all entries from database</td>
            <td>
              <Button variant={variant} onClick={() => { window.confirm('Are you sure you wish to delete this item?') ? this.handleClear() : document.activeElement.blur() } }></Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <hr/>
      <Table bordered style={tableStyle}>
        <thead className="thead-dark">
          <tr>
            <th style={{
                width: "5%"
              }}>#</th>
            <th style={{
                width: "95%"
              }}>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {
            (this.state.feedback.length > 0)
              ? this.state.feedback.map((entry, index) => {
                return (<tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.feedback}</td>
                </tr>)
              })
              : <tr></tr>
          }
        </tbody>
      </Table>
      <hr/>
    </div>)
  }
}
