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

class Error extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <section>
          <FrameBanner
            title="Sorry"
            desc={this.props.desc}
          />
          <hr />
          <FrameButton
            linkto={this.props.linkto}
            buttonLabel="Try-Again"
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps)(withRouter(Error));
