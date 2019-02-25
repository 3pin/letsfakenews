import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Writing from './writing';
import Thankyou from './thankyou';

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
  }
  componentDidMount() {
    console.log('state...');
    console.log(this.state);
    console.log('props...');
    console.log(this.props);
    console.log('\n');
    //if LocalStorage has values, pass them to this.state
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage when user leaves/refreshes the page
    window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
    // say hello into the backend server
    this.callApi('/write').then(res => console.log(res)).catch(err => console.log(err));
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({[key]: value});
        } catch (e) {
          // handle empty string
          this.setState({[key]: value});
        }
      }
    }
  }
  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  handleChange(key, value) {
    this.setState({[key]: value});
    //const obj = {}
    //obj[this.props.subject] = content;
    // update master state then send back to props to reflect change
    //console.log(e);
    //this.setState(JSON.parse(e));
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
    console.log(this.state);
    this.saveStateToLocalStorage();
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
    console.log(this.state);
    this.saveStateToLocalStorage();
  };
  render() {
    return (<div>
      <Switch>
        <Route exact path="/write" render={() =>
          <Writing title="Write a story..." desc="Make up a ridiculous fake-news story" subject="story" rows="4" length="280" value={this.state.story} handleChange={this.handleChange} linkto="/write/title"
          />
        }/>
        <Route path="/write/title" render={() =>
          <Writing title="Write a title..." desc="Make up a ridiculous title for your story" subject="title" rows="1" length="25" value={this.state.title} handleChange={this.handleChange} handleSubmit={this.handleNews} linkto="/write/thankyou"
          />
        }/>
        <Route path="/write/thankyou" component={Thankyou}/>
        <Route path="/write/feedback" render={() =>
          <Writing title="Write your feedback..." desc="Give us your response to writing & watching fake-news with us" subject="feedback" rows="4" length="280" value={this.state.feedback} handleChange={this.handleChange} handleSubmit={this.handleFeedback} linkto="/write/thankyou"
          />
        }/>
        <Redirect to="/write"/>
      </Switch>
    </div>)
  }
}
