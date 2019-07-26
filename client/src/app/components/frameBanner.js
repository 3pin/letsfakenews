//banner component with TITLE and DESCRIPTION
import React from 'react';

const FrameBanner = (props) => {
  let Tag
  if (props.hsize) {
    Tag = props.hsize
  } else {
    Tag = "h2"
  }
  return (<div className="banner">
      <Tag>{props.title}</Tag>
      <p>{props.desc}</p>
    </div>);
}
export default FrameBanner
