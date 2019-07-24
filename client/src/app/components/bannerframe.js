//banner component with TITLE and DESCRIPTION
import React from 'react';

const BannerFrame = (props) => {
  let Tag
  if (props.hsize) {
    Tag = props.hsize
  } else {
    Tag = "h2"
  }
  return (<div>
      <Tag>{props.title}</Tag>
      <p>{props.desc}</p>
    </div>);
}
export default BannerFrame
