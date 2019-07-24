import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Admin..." desc="These buttons link to pages allowing story moderation & feedback viewing."/>
        <hr/>
        <ButtonFrame linkto="/admin/stories" buttonLabel="Stories" desc="Moderate stories in real-time"/>
        <hr/>
        <ButtonFrame variant="outline-secondary" linkto="/admin/feedback" buttonLabel="Feedback" desc="View feedback in real-time"/>
        <hr/>
      </section>
    </div>)
  }
}
