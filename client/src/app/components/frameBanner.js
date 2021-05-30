// banner component with TITLE and DESCRIPTION
import React from 'react';

const FrameBanner = (props) => {
  let Tag;
  if (props.hsize) {
    Tag = props.hsize;
  } else {
    Tag = 'h2';
  }
  return (
    <div className="banner">
      <Tag>{props.title}</Tag>
      <hr />
      <p>{props.desc}</p>
      <p>{props.desc2}</p>
      <p>{props.desc3}</p>
      <p>{props.desc4}</p>
    </div>
  );
};
// export default FrameBanner;
export default (FrameBanner);
