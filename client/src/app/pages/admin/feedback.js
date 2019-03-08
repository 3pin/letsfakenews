import React from 'react';
import BannerFrame from '../../../app/components/banner';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.apiCall = this.apiCall.bind(this);
    this.state = {
      feedback: []
    };
    this.eventSource = new EventSource("http://localhost:5000/settings/sse");
  }
  apiCall = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  /*
  updateFrontend(data) {
    console.log(data);
    this.setState(Object.assign({}, {feedback: data}));
  }
  */
  handleClear() {
    document.activeElement.blur();
    /* Connect to API and clear feedback from database */
    this.apiCall(this.props.apiClear).then(res => this.setState({feedback: []})).catch(err => console.log(err));
  }
  componentDidMount() {
    /* load database into this.state */
    this.apiCall(this.props.apiHello).then(res => this.setState({feedback: res.feedback})).catch(err => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('feedback', e => this.setState({
      feedback: JSON.parse(e.data)
    }));
  }
  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }
  render() {
    console.log(this.state.feedback)
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
            <td>Clear all entries from database</td>
            <td>
              <button onClick={this.handleClear.bind(this)} title="clear" type="button" className="btn btn-danger show_tip clear "></button>
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
