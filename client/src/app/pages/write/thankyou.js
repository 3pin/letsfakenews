import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

const Thankyou = () => {
  return (<div>
      <section>
        <FrameBanner title="Thank you..." desc="Thank you for your fake-news. Now, watch the public screen to see how your story compares to others."/>
        <hr/>
        <FrameButton buttonLabel="Restart" linkto="/write/story" label="restart" desc="Write more fake news"/>
        <hr/>
        <FrameButton buttonLabel="Feedback" linkto="/write/feedback" label="feedback" desc="Leave feedback for the team"/>
        <hr/>
      </section>
    </div>)
}
export default Thankyou
