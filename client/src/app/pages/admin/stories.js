import React from 'react';
import BannerFrame from '../../../app/components/banner';

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    //
    this.eventSource = new EventSource("http://localhost:5000/settings/sse");
    //
    this.apiCall = this.apiCall.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.handleAutolive = this.handleAutolive.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    //
    this.state = {
      stories: [],
      autolive: false
    };
  }
  apiCall = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  apiPost = async (endpoint, data) => {
    // send JSON to proxy server
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
  handleAutolive(e) {
    /* update state.autolive */
    this.setState({autolive: e.target.checked});
    /* Change autolive status on the backend */
    let endpoint = this.props.apiAutoliveSet
    let data = {
      autolive: e.target.checked
    }
    this.apiPost(endpoint, data).then(res => console.log(res)).catch(err => console.log(err));
  }
  handleRefresh(e) {
    document.activeElement.blur();
    //e.preventDefault();
    /* Connect to API to refresh imagery */
    this.apiCall(this.props.apiRefresh).then(res => console.log(res)).catch(err => console.log(err));
  }
  handleClear() {
    document.activeElement.blur();
    /* Connect to API and clear all from database */
    this.apiCall(this.props.apiClear).then(res => console.log(res)).then(this.setState({'stories': []})).catch(err => console.log(err));
  }
  handleRemove() {
    document.activeElement.blur();
    /* Connect to API and delete single entry from database */
    //this.apiPost(this.props.apiRemove).then(res => this.setState({'stories': []})).catch(err => console.log(err));
  }
  componentDidMount() {
    /* load autolive-status from Db */
    this.apiCall(this.props.apiAutoliveRequest).then(res => this.setState({
      'autolive': JSON.parse(res.autolive)
    })).catch(err => console.log(err));
    /* load stories from Db into this.state */
    this.apiCall(this.props.apiHello).then(res => this.setState({'stories': res.stories})).catch(err => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('story', e => this.setState({
      stories: JSON.parse(e.data)
    }));
  }
  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }
  render() {
    console.log(this.state.stories)
    return (<div>
      <BannerFrame desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <table className="table table-bordered" style={{
          backgroundColor: "white"
        }}>
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
            <td>Set new stories to go live automatically</td>
            <td style={{textAlign: "center"}}><input type="checkbox" checked={this.state.autolive} onChange={this.handleAutolive.bind(this)} className="form-check-input show_tip autolive"/>
            </td>
          </tr>
          <tr>
            <td>Refresh imagery for all stories</td>
            <td>
              <button type="button" onClick={this.handleRefresh.bind(this)} className="btn btn-primary show_tip refresh "></button>
            </td>
          </tr>
          <tr>
            <td>Clear all stories from database</td>
            <td>
              <button type="button" onClick={this.handleClear.bind(this)} className="btn btn-danger show_tip clear"></button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr/>
      <table className="table table-bordered" style={{
          backgroundColor: "white"
        }}>
        <thead className="thead-dark">
          <tr>
            <th style={{
                width: "5%"
              }}>#</th>
            <th style={{
                width: "20%"
              }}>Title</th>
            <th style={{
                width: "65%"
              }}>Story</th>
            <th style={{
                width: "6%"
              }}>Delete</th>
            <th style={{
                width: "4%"
              }}>Live</th>
          </tr>
        </thead>
        <tbody>
          {
            (this.state.stories.length > 0)
              ? this.state.stories.map((entry, index) => {
                return (<tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.title}</td>
                  <td>{entry.story}</td>
                  <td>
                    <button type="button" onClick={this.handleRefresh.bind(this)} className="btn btn-danger show_tip clear"></button>
                  </td>
                  <td style={{textAlign: "center"}}><input type="checkbox" checked={this.state.autolive} onChange={this.handleAutolive.bind(this)} className="form-check-input show_tip autolive"/></td>
                </tr>)
              })
              : <tr></tr>
          }
        </tbody>
      </table>
      <hr/>
    </div>)
  }
}
