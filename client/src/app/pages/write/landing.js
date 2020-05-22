import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';
// import Desc from '../../../app/components/desc';

const Landing = () => (
  <div>
    <section>
      <FrameBanner title="Create fake-news" desc="Pretend you're a journalist with nothing to report, tricking the news-room with a fake story. To ensure it's published use correct spelling, grammar & punctuation." />
      <hr />
      <FrameButton linkto="/write/story" buttonLabel="Start" />
      <hr />
    </section>
  </div>
);
export default Landing;
