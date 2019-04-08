import React from 'react';
import {
  Redirect
} from 'react-router-dom';
import BannerFrame from './bannerframe';
import FormFrame from './formframe';

export default class Story extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.state = {
      redirect: false
    }
  }
  apiCall = async (apiEndPoint) => {
    const response = await fetch(apiEndPoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  apiPost = async (apiEndPoint, toSubmit) => {
    //fetch from localStorage the data that needs to be POSTED to the API
    const data = this.hydrate_Some_StateWithLocalStorage(toSubmit)
    const response = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const body = await response.text();
    console.log(body);
    this.setState(() => ({
      redirect: true
    }))
    //empty the relevant localStorage entries
    for (let key in toSubmit) {
      localStorage.removeItem(toSubmit[key]);
    }
  };
  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  hydrate_Some_StateWithLocalStorage(array) {
    const data = {};
    for (let entry in array) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(array[entry])) {
        // get the key's value from localStorage
        let value = JSON.parse(localStorage.getItem(array[entry]));
        data[array[entry]] = value;
      }
    }
    return data
  }
  hydrateStateWithLocalStorage() {
    // if the key exists in localStorage
    if (localStorage.hasOwnProperty(this.props.subject)) {
      // get the key's value from localStorage
      let value = localStorage.getItem(this.props.subject);
      // parse the localStorage string and setState
      try {
        value = JSON.parse(value);
        this.setState({
          [this.props.subject]: value
        });
      } catch (e) {
        // handle empty string
        this.setState({
          [this.props.subject]: value
        });
      }
    }
  }
  handleChange(value) {
    this.setState({
      [this.props.subject]: value
    });
  }
  handleSubmit() {
    if (this.props.stateToSubmit) {
      //move active data from state to localstorage
      this.saveStateToLocalStorage();
      this.apiPost(this.props.apiEndPoint, this.props.stateToSubmit);
    }
  }
  componentWillMount() {}
  componentDidMount() {
    // register with the backend server
    //this.apiCall(this.props.match.url).then(res => console.log(res)).catch(err => console.log(err));
    // if LocalStorage has values, pass them to this.state
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage when user leaves/refreshes the page
    window.addEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToLocalStorage.bind(this));
    if (this.state.redirect) {
      //empty state and localstorage
      localStorage.clear();
      this.setState(() => ({
        redirect: false
      }))
    } else {
      // saves if component has a chance to unmount
      this.saveStateToLocalStorage();
    }
  }
  loadStateSubject(object, comparison) {
    let result;
    Object.keys(object).forEach(function (key) {
      if (key === comparison) {
        result = object[key]
      }
    })
    return result
  }
  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/write/thankyou' />
    }
  }
  render() {
    const val = this.loadStateSubject(this.state, this.props.subject);
    return (<div>
        {this.renderRedirect()}
        <section>
          <BannerFrame
            hsize='h4'
            title={this.props.title}
            desc={this.props.desc}/>
          <hr/>
          <FormFrame
            rows={this.props.rows}
            length={this.props.length}
            linkto={this.props.linkto}
            value={val}
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}/>
          <hr/>
        </section>
      </div>)
  }
}
