import React from 'react';

import Writing from '../../components/writing';

export default class writeStory extends React.Component {
  render() {
    return (<div>
      <section>
        <Writing
          title="Write a story..."
          desc="Make up a fake-news story"
          rows="4" length="280"
          subject='story'
          linkto="/write/title"
          />
        <hr/>
      </section>
    </div>)
  }
}
