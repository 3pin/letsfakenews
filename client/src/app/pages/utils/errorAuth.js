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
          desc="Access denied: you must first log-in to access the 'admin' page."
        />
        <hr />
        <FrameButton
          linkto="/login"
          buttonLabel="Log-In"
        />
        <hr />
      </section>
    </div>
  );
}
export default ErrorDevice;
