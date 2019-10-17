import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';
//import Desc from '../../../app/components/desc';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner title="Create..." desc="Imagine you're a journalist with a deadline but no news to report, so trick us all with a fake-story. To ensure its accepted use correct spelling, grammar, punctuation etc."/>
        <hr/>
        <FrameButton linkto="/write/story" buttonLabel="Start"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
