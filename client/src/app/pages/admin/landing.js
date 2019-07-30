import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner title="Admin..." desc="These buttons link to pages allowing story moderation & feedback viewing."/>
        <hr/>
        <FrameButton linkto="/admin/stories" buttonLabel="Stories" desc="Moderate stories in real-time"/>
        <hr/>
        <FrameButton linkto="/admin/feedback" buttonLabel="Feedback" desc="View feedback in real-time"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
