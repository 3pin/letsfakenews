import React from 'react';
import FrameBanner from '../../../app/components/frameBanner';
import 'eventsource-polyfill';
import {
  Table,
} from 'react-bootstrap';

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource(`http://localhost:5000/settings/sse`);
    }
    //
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.handleVisualsLength = this.handleVisualsLength.bind(this);
    //
    this.state = {
      activelistLength: 0,
      visualiseNum: 0
    };
  }
  apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    else
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
  handleVisualsLength(e) {
    console.log(`onInput fired with value: '${e.currentTarget.value}'`);
    let data = {
      visualiseNum: e.currentTarget.value
    }
    // connect to API to update db and then update this component
    this.apiPost(this.props.apiVisualiseNum, data).then((res) => this.setState({
      visualiseNum: res.visualiseNum
    })).catch(err => console.log(err));
  }
  componentDidMount() {
    /* load autolive-status & stories from Db */
    this.apiGet(this.props.apiHello)
      .then((res) => {
        this.setState({
          activelistLength: res.activelistLength,
          visualiseNum: res.visualiseNum,
        })
        console.log(res);
      }).catch(err => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('activelistChange', (e) => {
      console.log('A change triggered a refresh of the activelist');
      console.log(e);
      if (JSON.parse(e.data) < this.state.visualiseNum) {
        this.setState({
          activelistLength: JSON.parse(e.data),
          visualiseNum: JSON.parse(e.data)
        });
      } else {
        this.setState({
          activelistLength: JSON.parse(e.data)
        });
      }
    });
    /* Catches errors */
    this.eventSource.onerror = (e) => {
      console.log("--- SSE EVENTSOURCE ERROR: ", e);
    };
  }
  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }
  render() {
    console.log(this.state);
    const tableStyle = {
      backgroundColor: "white"
    }
    // eslint-disable-next-line
    let variant;
    if (this.props.variant) {
      variant = this.props.variant
    } else {
      variant = 'danger'
    }
    return (<div>
      <FrameBanner desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <Table bordered style={tableStyle}>
        <thead className="thead-dark">
          <tr>
            <th style={{width: "90%"}}>Control of Visuals</th>
            <th style={{width: "10%"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Number of stories in Activelist</td>
            <td>{this.state.activelistLength}</td>
          </tr>
          <tr>
            <td>Max number of stories to visualise</td>
            <td>
              <input type='number' min='0' max={this.state.activelistLength} value={this.state.visualiseNum} onChange={this.handleVisualsLength}/>
            </td>
          </tr>
        </tbody>
      </Table>
      <hr/>
    </div>)
  }
}
