import React from 'react';
// import { store } from '../../store';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

function ErrorDevice() {
  return (
    <div>
      <section>
        <FrameBanner
          title="Sorry"
          desc="You can only watch the news on a desktop device"
        />
        <hr />
        <FrameButton
          linkto="/role"
          buttonLabel="Try-Again"
        />
        <hr />
      </section>
    </div>
  );
}
export default ErrorDevice;
