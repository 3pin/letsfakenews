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
    this.apiPost = this.apiPost.bind(this);
    this.state = {
      redirect: false
    }
  }
  apiPost = async (apiEndPoint, stateToSubmit) => {
    //fetch from Storage the data that needs to be POSTED to the API
    const data = this.hydrateSomeStateWithStorage(stateToSubmit)
    console.log(apiEndPoint, data)
    const response = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const body = await response.text();
    console.log(body);
    if (body === 'Failure') {
      alert('Sorry, your story contained no useful words... try again.')
    } else {
      //alert('Thanks, your story reached the news-room.')
    }
    /* empty the relevant state entries */
    for (let entry of stateToSubmit) {
      this.setState({[entry]: ''});
    }
    /* trigger redirect to exit and render next component */
    this.setState(() => ({
      redirect: true
    }))
  };
  saveStateToStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to storage
      sessionStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  hydrateSomeStateWithStorage(array) {
    const data = {};
    for (let entry in array) {
      // if the key exists in Storage
      if (sessionStorage.hasOwnProperty(array[entry])) {
        // get the key's value from Storage
        let value = JSON.parse(sessionStorage.getItem(array[entry]));
        data[array[entry]] = value;
      }
    }
    return data
  }
  hydrateStateWithStorage() {
    // if the key exists in Storage
    if (sessionStorage.hasOwnProperty(this.props.subject)) {
      // get the key's value from Storage
      let value = sessionStorage.getItem(this.props.subject);
      // parse the Storage string and setState
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
      //save state to storage
      this.saveStateToStorage();
      this.apiPost(this.props.apiEndPoint, this.props.stateToSubmit);
    }
  }
  componentWillMount() {
    // add event listener to save state to Storage when user leaves/refreshes the page
    window.addEventListener("beforeunload", this.saveStateToStorage.bind(this));
  }
  componentDidMount() {
    // if Storage has values, pass them to this.state
    this.hydrateStateWithStorage();
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveStateToStorage.bind(this));
    if (this.state.redirect) {
      /* empty storage */
      sessionStorage.clear();
    } else {
      /* save to storage */
      this.saveStateToStorage();
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
      return <Redirect to={this.props.redirect} />
    }
  }
  render() {
    const val = this.loadStateSubject(this.state, this.props.subject);
    console.log(val);
    return (<div>
        {this.renderRedirect()}
        <section>
          <BannerFrame
            title={this.props.title}
            desc={this.props.desc}/>
          <hr/>
          <FormFrame
            currentPathname = {this.props.currentPathname}
            buttonLabel={this.props.buttonLabel}
            rows={this.props.rows}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            linkto={this.props.linkto}
            value={val}
            handleChange={this.handleChange.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}/>
          <hr/>
        </section>
      </div>)
  }
}
