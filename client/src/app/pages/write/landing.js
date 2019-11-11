import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';
//import Desc from '../../../app/components/desc';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner title="Create..." desc="You're a journalist with nothing to report, so you're going to trick the news room with a fake story. To ensure its accepted use correct spelling, grammar & punctuation."/>
        <hr/>
        <FrameButton linkto="/write/story" buttonLabel="Start"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
