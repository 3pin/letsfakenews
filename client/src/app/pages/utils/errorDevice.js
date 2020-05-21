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
          desc="Access denied: news can only be watched on desktop devices."
        />
        <hr />
        <FrameButton
          linkto="/role"
          buttonLabel="Return"
        />
        <hr />
      </section>
    </div>
  );
}
export default ErrorDevice;
