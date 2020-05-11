// banner component with TITLE and DESCRIPTION
import React from 'react';
import { connect } from 'react-redux';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

const FrameBanner = (props) => {
  let Tag;
  if (props.hsize) {
    Tag = props.hsize;
  } else {
    Tag = 'h2';
  }
  let desc = `Room: ${props.room}`;
  return (
    <div className="banner">
      <Tag>{props.title}</Tag>
      <p>{desc}</p>
    </div>
  );
};
// export default FrameBanner;
export default connect(mapStateToProps)(FrameBanner);
