import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const LandingWatch = () => (
  <div>
    <section>
      <FrameBanner title="Watch fake-news" desc="Ensure you are using the Chrome browser before choosing how to visualise the live fake-news feed." />
      <hr />
      <FrameButton buttonLabel="News" linkto="/watch/news" desc="Watch the fake-news broadcast live from the news-room" />
      <hr />
      <FrameButton variant="secondary" buttonLabel="Scroller" linkto="/watch/text" desc="View the fake-news stories as scrolling ticker-text" />
      <hr />
      <FrameButton variant="secondary" buttonLabel="Slideshow" linkto="/watch/images" desc="Visualise the fake-news titles as a slideshow" />
      <hr />
    </section>
  </div>
);
export default LandingWatch;
