import React from 'react';
import { Redirect } from 'react-router-dom';
import BannerFrame from './banner';
import FormFrame from './form';

export default class Writing extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.apiCall = this.apiCall.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.state = {}
    this.baseState = this.state;
  }
  apiCall = async (apiEndPoint) => {
    const response = await fetch(apiEndPoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  apiPost = async (apiEndPoint, toSubmit) => {
    //fetch from sessionStorage the data that needs to be POSTED to the API
    const data = this.hydrate_Some_StateWithSessionStorage(toSubmit)
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
      redirect_writing: true
    }))
    /*
    //empty the relevant sessionStorage entries
    for (let key in toSubmit) {
      sessionStorage.removeItem(toSubmit[key]);
    }
    */
  };
  saveStateToSessionStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to sessionStorage
      sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  hydrate_Some_StateWithSessionStorage(array) {
    const data = {};
    for (let entry in array) {
      // if the key exists in sessionStorage
      if (sessionStorage.hasOwnProperty(array[entry])) {
        // get the key's value from sessionStorage
        let value = JSON.parse(sessionStorage.getItem(array[entry]));
        data[array[entry]] = value;
      }
    }
    return data
  }
  hydrateStateWithSessionStorage() {
      // if the key exists in sessionStorage
      if (sessionStorage.hasOwnProperty(this.props.subject)) {
        // get the key's value from sessionStorage
        let value = sessionStorage.getItem(this.props.subject);
        // parse the sessionStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({[this.props.subject]: value});
        } catch (e) {
          // handle empty string
          this.setState({[this.props.subject]: value});
        }
      }
  }
  handleChange(value) {
   this.setState({[this.props.subject]: value});
 }
  handleSubmit() {
    if (this.props.stateToSubmit) {
      //move active data from state to sessionstorage
      this.saveStateToSessionStorage();
      this.apiPost(this.props.apiEndPoint, this.props.stateToSubmit);
    }
  }
  componentWillMount() {
    this.setState(() => ({
      redirect_writing: false
    }))
  }
  componentDidMount() {
    // register with the backend server
    //this.apiCall(this.props.match.url).then(res => console.log(res)).catch(err => console.log(err));
    // if sessionStorage has values, pass them to this.state
    this.hydrateStateWithSessionStorage();
    // add event listener to save state to sessionStorage when user leaves/refreshes the page
    window.addEventListener("beforeunload", this.saveStateToSessionStorage.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToSessionStorage.bind(this));
    // if redirect_writing is true... clear sessionstorage & state
    if (this.state.redirect_writing) {
      this.setState({redirect_writing: false});
      console.log(this.state);
      console.log('Redirect Complete... will now empty sessionStorage & State')
      sessionStorage.clear();
      this.setState(this.baseState)
    } else {
      // saves if component has a chance to unmount
      this.saveStateToSessionStorage();
    }
    console.log(this.state);
  }
  loadStateSubject(object, comparison) {
    let result;
    Object.keys(object).forEach(function(key) {
      if (key === comparison) {
        result = object[key]
      }
    })
    return result
  }
  render() {
    const val = this.loadStateSubject(this.state, this.props.subject);
    if (this.state.redirect_writing === true) {
      return <Redirect to={this.props.redirect} />
    } else {
      return (<div>
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
}
