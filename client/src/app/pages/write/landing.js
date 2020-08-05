import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';
// import Desc from '../../../app/components/desc';

const Landing = () => (
  <div>
    <section>
      <FrameBanner title="Create fake-news" desc="Pretend you're a journalist trying to trick the news-room with a fake report. To ensure it's published use correct spelling, grammar & punctuation with no more than 140 chars (like an old tweet!)." />
      <hr />
      <FrameButton linkto="/write/story" buttonLabel="Start" />
      <hr />
    </section>
  </div>
);
export default Landing;
