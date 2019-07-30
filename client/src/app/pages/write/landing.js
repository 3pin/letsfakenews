import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';
import Desc from '../../../app/components/desc';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner title="Create..." desc="You're a journalist with a deadline but no news"/>
        <hr/>
        <Desc
          desc="Trick the news room into broadcasting a fake story. To ensure its accepted use correct spelling, grammar & punctuation."/>
        <FrameButton linkto="/write/story" buttonLabel="Start"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
