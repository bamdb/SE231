import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import Tag from '../component/tag'
import TestRenderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
it('test tag', () => {
  const testrenderer=TestRenderer.create(<Tag/>);
  const testinstance=testrenderer.root;
  let tree = testrenderer.toJSON();
  expect(tree).toMatchSnapshot();
});

