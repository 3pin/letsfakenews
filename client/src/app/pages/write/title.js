import React from 'react';

import Writing from '../../components/writing';

export default class writeTitle extends React.Component {
  componentDidMount() {
    //console.log(this.props);
}
  render() {
    return (<div>
      <section>
        <Writing
          title="Add a title..."
          desc="Give a title to your story"
          rows="1" length="25"
          subject="title"
          apiEndPoint="/write/news"
          stateToSubmit={["story","title"]}
          redirect="/write/thankyou"
          />
      </section>
    </div>)
  }
}
