import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Admin..." desc="Use the following buttons to administer the databases"/>
        <hr/>
        <ButtonFrame linkto="/admin/stories" buttonlabel="Stories" desc="Administer stories as they are submitted"/>
        <hr/>
        <ButtonFrame linkto="/admin/feedback" buttonlabel="Feedback" desc="View feedback from users"/>
        <hr/>
      </section>
    </div>)
  }
}
