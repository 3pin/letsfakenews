import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';
import Desc from '../../../app/components/desc';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner title="Create..." desc="You're a journalist with a deadline but no news to report..."/>
        <hr/>
        <Desc
          desc="Trick the news-room into broadcasting your fake story. To ensure its accepted use correct spelling & grammar."/>
        <FrameButton linkto="/write/story" buttonLabel="Start"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
