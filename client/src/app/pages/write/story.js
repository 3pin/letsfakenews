import React from 'react';

import Writing from '../../components/writing';

export default class writeStory extends React.Component {
  componentDidMount() {
    //console.log(this.props);
  }
  render() {
    let currentPathname = this.props.location.pathname
    return (<div>
      <section>
        <Writing
          currentPathname = {currentPathname}
          title="Write a story..."
          desc="Make up a fake-news story"
          rows="4"
          minLength="80" maxLength="280"
          subject='story'
          linkto="/write/title"
          buttonLabel="Next"
          />
      </section>
    </div>)
  }
}
