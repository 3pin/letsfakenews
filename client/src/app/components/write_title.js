import React from 'react';
import {Link} from 'react-router-dom';

export default class Title extends React.Component {
  state = {
    response: '',
    post: '',
    responseToPost: ''
  };
  componentDidMount() {
    this.callApi().then(res => this.setState({response: res.express})).then(res => console.log(this.state.response)).catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/test/api/get');
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/test/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: this.state.post})
    });
    const body = await response.text();
    this.setState({responseToPost: body});
    console.log(this.state.responseToPost);
  };
  render() {
    return (<div>
      <section className="section" id="3">
        <h2>Add a headline...</h2>
        <form onSubmit={this.handleSubmit} id="title_form" className="form-horizontal">
          <div className="form-group">
            <textarea value={this.state.post} onChange={e => this.setState({ post: e.target.value })} id="title" className="form-control form-responsive" rows="1" maxLength="25" required="required" placeholder="25 chars max..."></textarea>
            <div className="col-xs-10 col-sm-8 col-md-8 col-lg-8">
              <br/>
              <Link to="/write/thankyou" >
                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-responsive">Submit</button>
              </Link>
            </div>
          </div>
        </form>
        <br/>
      </section>
      <hr/>
    </div>)
  }
}
