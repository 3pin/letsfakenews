import React from 'react';
import { useSelector } from 'react-redux';
// import { store } from '../../store';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

function Error() {
  // grab required state
  const { desc, linkto } = useSelector((state) => state.errorReducer);
  /*
  const state = store.getState();
  const { desc } = state.errorReducer;
  const { linkto } = state.errorReducer;
  */
  return (
    <div>
      <section>
        <FrameBanner
          title="Sorry"
          desc={desc}
        />
        <hr />
        <FrameButton
          linkto={linkto}
          buttonLabel="Try-Again"
        />
        <hr />
      </section>
    </div>
  );
}
export default Error;
