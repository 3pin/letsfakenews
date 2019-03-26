import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Title title="Test"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
