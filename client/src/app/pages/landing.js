import React from 'react';
//
import FrameBanner from '../components/frameBanner';
import FrameButton from '../components/frameButton';

const Landing = () => (
  <div>
    <section>
      <FrameBanner
        title="LetsFakeNews..."
        desc="Welcome to LetsFakeNews, broadcasting live from the El-Jazeera news room. Get together with friends to write fake news on your phones while watching on a computer screen."
      />
      <hr />
      <FrameButton
        linkto="/write"
        buttonLabel="Write"
        desc="Write fakenews (phone etc.)"
      />
      <hr />
      <FrameButton
        variant="secondary"
        linkto="/watch"
        buttonLabel="Watch"
        desc="Watch fakenews (computer only)"
      />
      <hr />
    </section>
  </div>
);
export default Landing;
