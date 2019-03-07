import React from 'react';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
    this.state = {
      feedback: []
    };
    this.eventSource = new EventSource("http://localhost:5000/settings/sse");
    //this.eventSource = new EventSource("/settings/sse");
  }
  apiCall = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  handleClear() {
    /* Connect to API and clear feedback from database */
    this.apiCall('/admin/feedback/clear').then(res => this.setState({'feedback': []})).catch(err => console.log(err));
  }
  componentDidMount() {
    // say hello into the backend server
    this.apiCall(this.props.path).then(res => this.setState({'feedback': res.feedback})).catch(err => console.log(err));
    // sse
    this.eventSource.addEventListener("feedback", e => this.updateFrontend(JSON.parse(e.data)));
  }
  updateFrontend(data) {
    console.log(data);
    this.setState(Object.assign({}, { feedback: data }));
  }
  handleNewMessage(message) {
    if (message.to === this.props.channel) {
      this.setState({messages: this.state.messages.concat(message)});
    }
  }
  componentWillUnmount() {
    //SSE
    this.eventSource.close();
  }
  render() {
    console.log(this.state)
    return (<div>
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
            <td>Clear all entries from database</td>
            <td>
              <button onClick={this.handleClear.bind(this)} title="clear" type="button" className="btn btn-danger show_tip clear "></button>
            </td>
          </tr>
        </tbody>
      </table>
      <table className="table table-bordered" style={{
          backgroundColor: "white"
        }}>
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
      </table>
      <hr/>
    </div>)
  }
}
