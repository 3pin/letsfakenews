import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import WriteStory from './write_story';
import WriteTitle from './write_title';
import Thankyou from './write_thankyou';
import WriteFeedback from './write_feedback';

export default class LayoutWrite extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleNews = this.handleNews.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.state = {
      story: "",
      title: "",
      feedback: ""
    }
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
    this.callApi().then(res => console.log(res)).catch(err => console.log(err));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  callApi = async () => {
    const response = await fetch('/hello_from_react');
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  handleChange(e) {
    // update master state then send back to props to reflect change
    //console.log(e);
    this.setState(JSON.parse(e));
  }
  handleNews = async () => {
    // send JSON to proxy server
    const newsobj = {};
    newsobj.story = this.state.story;
    newsobj.title = this.state.title;
    const response = await fetch('/add_title_story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newsobj)
    });
    const body = await response.text();
    console.log(body);
    this.setState({story: ""});
    this.setState({title: ""});
  };
  handleFeedback = async () => {
    // send JSON to proxy server
    const feedbackobj = {};
    feedbackobj.feedback = this.state.feedback;
    const response = await fetch('/add_feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedbackobj)
    });
    const body = await response.text();
    console.log(body);
    this.setState({feedback: ""});
  };

  render() {
    return (<div>
      <Switch>
        <Route exact path="/write" render={(props) => <WriteStory linkto="/write/title" subject="story" value={this.state.story} handleChange={this.handleChange}/>}/>
        <Route path="/write/title" render={() => <WriteTitle linkto="/write/thankyou" subject="title" value={this.state.title} handleChange={this.handleChange} handleSubmit={this.handleNews}/>}/>
        <Route path="/write/thankyou" component={Thankyou}/>
        <Route path="/write/feedback" render={() => <WriteFeedback linkto="/write/thankyou" subject="feedback" value={this.state.feedback} handleChange={this.handleChange} handleSubmit={this.handleFeedback}/>}/>
        <Redirect to="/write"/>
      </Switch>
    </div>)
  }
}
