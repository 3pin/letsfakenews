import React from 'react';
//
import FrameBanner from '../components/frameBanner';
import FrameButton from '../components/frameButton';

const Landing = () => (
  <div>
    <section>
      <FrameBanner
        title="Role..."
        desc="Choose whether you want to write (any device) or watch (only desktop)."
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
