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
          desc="Make up a fake-news story within the required no. or chars"
          rows="4"
          minLength="8" maxLength="280"
          subject='story'
          linkto="/write/title"
          buttonLabel="Next"
          />
      </section>
    </div>)
  }
}
