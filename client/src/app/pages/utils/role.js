import React from 'react';
//
import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const Landing = () => (
  <div>
    <section>
      <FrameBanner
        title="Select a role"
        desc="Choose whether you want to WRITE or WATCH fake-news."
      />
      <hr />
      <FrameButton
        linkto="/write"
        buttonLabel="Write"
        desc="Write fakenews (on a phone)"
      />
      <hr />
      <FrameButton
        variant="secondary"
        linkto="/watch"
        buttonLabel="Watch"
        desc="Watch fakenews (on a computer only)"
      />
      <hr />
    </section>
  </div>
);
export default Landing;
