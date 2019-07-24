import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';

import Writing from '../../components/writing';

export default class writeTitle extends React.Component {
  componentDidMount() {
    //console.log(this.props);
  }
  render() {
    let currentPathname = this.props.location.pathname
    return (<div>
      <section>
        <Writing
          currentPathname = {currentPathname}
          title="Add a title..."
          desc="Give your story a title"
          rows="1"
          minLength="5" maxLength="25"
          subject="title"
          apiEndPoint="/write/news"
          stateToSubmit={["story","title"]}
          redirect="/write/thankyou"
          />
      </section>
    </div>)
  }
}
