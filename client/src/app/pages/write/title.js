import React from 'react';
import {
  connect
} from 'react-redux';
import * as actions from "../../actions/creatingNews"
import {
  withRouter
} from "react-router-dom"

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  return {
    title: state.newsReducer.title,
  };
}
/* which props do we want to inject, given the global store state? */
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (title, history) => {
      dispatch(actions.updateTitle(title, history))
    }
  }
}
class WriteTitle extends React.Component {
  state = {
    current: "/write/title",
    next: "/write/review",
    rows: "1",
    minLength: "5",
    maxLength: "25"
  }
  handleSubmit = (title) => {
    /* goto the next page */
    //this.props.history.push(this.state.next)
    /* update the store */
    this.props.updateStore(title, this.props.history)
  }
  render() {
    return (<div>
      <section>
        <FrameBanner
          title="Add a title..."
          desc="Give your story a title"/>
        <hr/>
        <FrameForm
          rows={this.state.rows}
          minLength={this.state.minLength}
          maxLength={this.state.maxLength}
          content={this.props.title}
          buttonLabel="Review"
          handleSubmit={this.handleSubmit}/>
        <hr/>
      </section>
    </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteTitle))
