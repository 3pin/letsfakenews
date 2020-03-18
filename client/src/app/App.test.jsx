import React from 'react';
import ReactDOM from 'react-dom';
import FrameBanner from './components/frameBanner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FrameBanner title="Test" desc="This is a test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});
