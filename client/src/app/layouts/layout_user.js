import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import WriteStory from '../../app/components/write_story';
import WriteTitle from '../../app/components/write_title';
import Thankyou from '../../app/components/write_thankyou';
import WriteFeedback from '../../app/components/write_feedback';

export default class LayoutUser extends React.Component {
  constructor(props) {
    super(props);
    this.changeStory = this.changeStory.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      story: "",
      title: ""
    }
  }
  componentDidMount() {
    this.callApi().then(res => this.setState({response: res.express})).then(res => console.log(this.state.response)).catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/hello_from_react');
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  changeStory(story) {
    // update master state then send back to props to reflect change
    this.setState({story: story});
  }
  changeTitle(title) {
    // update master state then send back to props to reflect change
    this.setState({title: title});
  }
  handleSubmit = async (e) => {
    // send JSON to proxy server
    //e.preventDefault();
    const response = await fetch('/add_title_story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    const body = await response.text();
    console.log(body);
    this.setState({story: ""});
    this.setState({title: ""});
  };
  render() {
    return (<div className="layout">
      <Switch>
        <Route exact path="/write" render={() => <WriteStory story={this.state.story} changeStory={this.changeStory}/>}/>
        <Route path="/write/title" render={() => <WriteTitle title={this.state.title} changeTitle={this.changeTitle} handleSubmit={this.handleSubmit}/>}/>
        <Route path="/write/thankyou" component={Thankyou}/>
        <Route path="/write/feedback" component={WriteFeedback}/>
        <Redirect to="/write"/>
      </Switch>
    </div>)
  }
}
