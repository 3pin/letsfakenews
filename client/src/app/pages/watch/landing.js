import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const LandingWatch = () => (
  <div>
    <section>
      <FrameBanner title="Watch fake-news" desc="The below visualisations are compatible with the Chrome browser only." />
      <hr />
      <FrameButton buttonLabel="News" linkto="/watch/news" desc="Watch the fake-news broadcast live from the news-room" />
      <hr />
    </section>
  </div>
);
export default LandingWatch;
