import React from 'react';
import {
  connect
} from 'react-redux';
import axios from "axios";
import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from "../../actions/creatingNews"

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  return {
    story: state.newsReducer.story,
    title: state.newsReducer.title,
    submitting: state.newsReducer.submitting
  };
}
// which props do we want to inject, given the global store state?
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (title) => {dispatch(actions.updateTitle(title))},
    submitStarted: (story, title) => {dispatch(actions.updateTitle(story, title))},
  }
}
class WriteTitle extends React.Component {
  state = {
    current: "/write/title",
    next: "/write/thankyou",
    apiEndpoint: "/write/news",
    minLength: "5"
  }
  handleSubmit = (title) => {
    if (title.length >= this.state.minLength) {
      //update the store
      this.props.updateStore(title)
      this.props.submitStarted()
      axios.post(this.state.apiEndpoint, {
        story: this.props.story,
        title: title
      }).then((res) => {
        console.log(res)
      }).then(() => {
        this.props.submitEnded()
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
          content={this.props.title}
          submitting={this.props.submitting}
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
