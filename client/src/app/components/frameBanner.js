// banner component with TITLE and DESCRIPTION
import React from 'react';
import { connect } from 'react-redux';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

const FrameBanner = (props) => {
  let tempRoom = "'?'";
  if (props.room) {
    tempRoom = `'${props.room}'`;
  }
  let title = `${props.title}: ${tempRoom}`;
  let Tag;
  if (props.hsize) {
    Tag = props.hsize;
  } else {
    Tag = 'h2';
  }
  return (
    <div className="banner">
      <Tag>{title}</Tag>
      <hr />
      <p>{props.desc}</p>
    </div>
  );
};
// export default FrameBanner;
export default connect(mapStateToProps)(FrameBanner);
