import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';
// import Desc from '../../../app/components/desc';

const Landing = () => (
  <div>
    <section>
      <FrameBanner title="Create fake-news" desc="You're a journalist with nothing to report, so trick the news room with fake news. To ensure they publich it - use correct spelling, grammar & punctuation." />
      <hr />
      <FrameButton linkto="/write/story" buttonLabel="Start" />
      <hr />
    </section>
  </div>
);
export default Landing;
