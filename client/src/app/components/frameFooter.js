// banner component with TITLE and DESCRIPTION
import React from 'react';
import { connect } from 'react-redux';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

const FrameFooter = (props) => {
  let room = `News-Room: ${props.room}`;
  return (
    <div className="banner">
      <p>{room}</p>
    </div>
  );
};
// export default FrameBanner;
export default connect(mapStateToProps)(FrameFooter);
