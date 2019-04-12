import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Thankyou extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Thank you..." desc="We hope you enjoyed writing real fake-news"/>
        <hr/>
        <ButtonFrame linkto="/write/story" label="restart" desc="Write more fake news"/>
        <hr/>
        <ButtonFrame linkto="/write/feedback" label="feedback" desc="Leave your feedback for the LetsFakeNews team"/>
        <hr/>
      </section>
    </div>)
  }
}
