import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Thankyou extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Thank you..." desc="Thank you for your fake-news. Now, watch the public screen to see how your story compares to others."/>
        <hr/>
        <ButtonFrame buttonLabel="Restart" linkto="/write/story" label="restart" desc="Write more fake news"/>
        <hr/>
        <ButtonFrame buttonLabel="Feedback" linkto="/write/feedback" label="feedback" desc="Leave feedback for the team"/>
        <hr/>
      </section>
    </div>)
  }
}
