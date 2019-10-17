import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

const Thankyou = () => {
  return (<div>
      <section>
        <FrameBanner title="Thank you..." desc="Thank you for your fake news story"/>
        <hr/>
        <FrameButton buttonLabel="Write" linkto="/write/story" desc="Write more fake news"/>
        <hr/>
        <FrameButton buttonLabel="Feedback" linkto="/write/feedback" desc="Leave feedback for the service"/>
        <hr/>
      </section>
    </div>)
}
export default Thankyou
