import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const Landing = () => (
  <div>
    <section>
      <FrameBanner
        title="Moderate the news"
        desc="These buttons link to pages allowing story moderation & feedback viewing."
      />
      <hr />
      <FrameButton
        linkto="/admin/stories"
        buttonLabel="Stories"
        desc="Moderate stories in real-time"
      />
      <hr />
      <FrameButton
        variant="secondary"
        linkto="/admin/feedback"
        buttonLabel="Feedback"
        desc="View feedback in real-time"
      />
      <hr />
      <FrameButton
        variant="secondary"
        linkto="/admin/visualise"
        buttonLabel="Visualisation"
        desc="Control the visualisations in real-time"
      />
      <hr />
    </section>
  </div>
);
export default Landing;
