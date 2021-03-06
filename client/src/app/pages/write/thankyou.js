import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

const Thankyou = () => (
  <div>
    <section>
      <FrameBanner title="Thank you..." desc="Thank you for your fake news story" />
      <hr />
      <FrameButton buttonLabel="Write" linkto="/write/story" desc="Write more fakenews" />
      <hr />
      <FrameButton variant="secondary" buttonLabel="Watch" linkto="/watch" desc="Watch the fakenews stream on a computer" />
      <hr />
      <FrameButton variant="secondary" buttonLabel="Feedback" linkto="/write/feedback" desc="Leave your feedback" />
      <hr />
    </section>
  </div>
);
export default Thankyou;
