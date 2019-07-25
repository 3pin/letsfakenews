import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from "../../actions/creatingNews"

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  return {
    title: state.newsReducer.title,
  };
}
// which props do we want to inject, given the global store state?
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (title) => {dispatch(actions.updateTitle(title))},
  }
}
class WriteTitle extends React.Component {
  state = {
    current: "/write/title",
    next: "/write/review",
    minLength: "5"
  }
  handleSubmit = (title) => {
    if (title.length >= this.state.minLength) {
      //update the store
      this.props.updateStore(title)
      //goto the next page
      this.props.history.push(this.state.next)
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
          rows="1"
          minLength="5"
          maxLength="25"
          buttonLabel="Review"
          handleSubmit={this.handleSubmit}/>
        <hr/>
      </section>
    </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteTitle);
