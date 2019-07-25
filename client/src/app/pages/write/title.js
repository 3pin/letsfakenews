import React from 'react';
import {
  connect
} from 'react-redux';
import axios from "axios";
import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import store from "../../../app/store";

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  console.log('mapStateToProps', state)
  return {
    title: state.title,
    submitting: state.submitting
  };
}
// which props do we want to inject, given the global store state?
function mapDispatchToProps(dispatch) {
  return {
    onChange: (value) => {
      console.log('mapDispatchToProps')
      const action = {
        type: 'updateTitle',
        payload: value
      }
      dispatch(action);
    }
  };
}

class WriteTitle extends React.Component {
  state = {
    submitting: false,
    current: "/write/title",
    next: "/write/thankyou",
    minLength: "5",
    apiEndpoint: "/write/news"
  }
  handleSubmit = (content) => {
    if (content.length >= this.state.minLength) {
      store.dispatch({
        type: "updateTitle",
        payload: content
      })
      axios.post(this.state.apiEndpoint, {
        story: "this is a test story",
        title: "this is a test title"
      }).then((res) => {
        console.log(res)
      }).then(() => {
        this.props.history.push(this.state.next)
      })
    } else {
      window.alert('What you wrote is too short')
      this.props.history.push(this.state.current)
    }
  }
  render() {
    /*
    subject="title"
    stateToSubmit={["story","title"]}
    */
    return (<div>
      <section>
        <FrameBanner
          title="Add a title..."
          desc="Give your story a title"/>
        <hr/>
        <FrameForm
          currentPathname="/write/title"
          rows="1"
          minLength="5"
          maxLength="25"
          redirect="/write/thankyou"
          apiEndPoint="/write/news"
          handleSubmit={this.handleSubmit}/>
        <hr/>
      </section>
    </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteTitle);
