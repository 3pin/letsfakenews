import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Writing from './writing';
import Thankyou from './thankyou';

export default class IndexWrite extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.state = {
      story: "",
      title: "",
      feedback: ""
    }
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
  handleChange(key, value) {
    this.setState({[key]: value});
    //const obj = {}
    //obj[this.props.subject] = content;
    // update master state then send back to props to reflect change
    //console.log(e);
    //this.setState(JSON.parse(e));
  }
  apiCall = async (apiEndPoint) => {
    const response = await fetch(apiEndPoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  apiPost = async (apiEndPoint, entriesToSend) => {
    // send JSON to proxy server
    const data = {}
    for (let item=0; item<entriesToSend.length; item++) {
      data[entriesToSend[item]] = this.state[entriesToSend[item]]
    }
    console.log(JSON.stringify(data))
    const response = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const body = await response.text();
    console.log(body);
    for (let item=0; item<entriesToSend.length; item++) {
      this.setState({ [entriesToSend[item]]: "" });
    }
    this.saveStateToLocalStorage();
  };
  componentDidMount() {
    // register with the backend server
    this.apiCall(this.props.path).then(res => console.log(res)).catch(err => console.log(err));
    //if LocalStorage has values, pass them to this.state
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage when user leaves/refreshes the page
    window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
  render() {
    return (<div>
      <Switch>
        <Route exact path="/write" component={Landing}/>
        <Route path="/write/story" render={() =>
          <Writing
          title="Write a story..."
          desc="Make up a fake-news story"
          subject="story"
          rows="4" length="280"
          value={this.state.story}
          handleChange={this.handleChange}
          linkto="/write/title"/>
        }/>
        <Route path="/write/title"
        render={() =>
          <Writing
          title="Add a title..."
          desc="Give a title to your story"
          subject="title"
          rows="1"
          length="25"
          value={this.state.title}
          handleChange={this.handleChange}
          handleSubmit={this.apiPost}
          apiEndPoint="/write/news"
          entriesToSend={["story","title"]}
          linkto="/write/thankyou"/>
        }/>
        <Route path="/write/thankyou" component={Thankyou}/>
        <Route path="/write/feedback" render={() =>
          <Writing
          title="Give your feedback..."
          desc="Give us your response to writing & watching fake-news with us"
          subject="feedback"
          rows="4"
          length="280"
          value={this.state.feedback}
          handleChange={this.handleChange}
          handleSubmit={this.apiPost}
          apiEndPoint="/write/feedback"
          entriesToSend={["feedback"]}
          linkto="/write/thankyou"/>}/>
        <Redirect to="/write"/>
      </Switch>
    </div>)
  }
}
