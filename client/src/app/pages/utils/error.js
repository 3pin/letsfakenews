import React from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  desc: state.errorReducer.desc,
  linkto: state.errorReducer.linkto,
});

/*
// grab current state
import { store } from '../../store';
const state = store.getState();
const { desc } = state.errorReducer;
const { linkto } = state.errorReducer;
console.log(desc, linkto);
*/

class Error extends React.Component {
  constructor(props) {
    super(props);
    // this.onUnload = this.onUnload.bind(this);
    this.state = {
      desc: this.props.desc,
      linkto: this.props.linkto,
    };
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <div>
        <section>
          <FrameBanner
            title="Sorry"
            desc={this.state.desc}
          />
          <hr />
          <FrameButton
            linkto={this.state.linkto}
            buttonLabel="Try-Again"
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps)(withRouter(Error));

/*
const Error = (props) => (
  <div>
    <section>
      <FrameBanner
        title="Sorry"
        desc={props.desc}
      />
      <hr />
      <FrameButton
        linkto={props.linkto}
        buttonLabel="Try-Again"
      />
      <hr />
    </section>
  </div>
);
export default Error;
*/
