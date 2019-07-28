//banner component with TITLE and DESCRIPTION
import React from 'react';

const Desc = (props) => {
  return (<div className="banner">
      <p>{props.desc}</p>
    </div>);
}
export default Desc
