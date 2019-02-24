import React from 'react';

import BannerFrame from '../../app/components/banner';
import ButtonFrame from '../../app/components/button';

export default class Thankyou extends React.Component {
  render() {
    return (<div>
      <section>
      <BannerFrame title="Thank you..." desc="We hope you enjoyed writing & watching fake-news, its so much!"/>
      <ButtonFrame linkto="/write" label="restart" desc="Write more fake news"/>
      <ButtonFrame linkto="/write/feedback" label="feedback" desc="Leave your feedback for the LetsFakeNews team"/>
      </section>
      <hr/>
    </div>)
  }
}
