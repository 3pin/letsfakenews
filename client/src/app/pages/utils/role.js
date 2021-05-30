import React from 'react';
//
import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const Landing = () => (
  <div>
    <section>
      <FrameBanner
        title="Select a role"
        desc="Do you want to write or watch fake news?"
      />
      <hr />
      <FrameButton
        linkto="/write"
        buttonLabel="Write"
        desc="Write (phones)"
      />
      <hr />
      <FrameButton
        variant="secondary"
        linkto="/watch"
        buttonLabel="Watch"
        desc="Watch (computers only)"
      />
      <hr />
    </section>
  </div>
);
export default Landing;
