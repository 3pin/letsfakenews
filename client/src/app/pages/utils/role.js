import React from 'react';
//
import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const Landing = () => (
  <div>
    <section>
      <FrameBanner
        title="Select a role"
        desc="Now choose whether to WRITE or WATCH fake news."
      />
      <hr />
      <FrameButton
        linkto="/write"
        buttonLabel="Write"
        desc="Write fakenews (any device)"
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
