import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <FrameBanner title="Create..." desc="You're a journalist with a deadline but no news to report... Try to trick the news-room into broadcasting your fake news story... To ensure its accepted, use correct spelling & grammar."/>
        <hr/>
        <FrameButton variant="secondary" linkto="/write/story" buttonLabel="Start"/>
        <hr/>
      </section>
    </div>)
  }
}
