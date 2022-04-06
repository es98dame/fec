import '@testing-library/jest-dom';
import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';

import App from './../fec-client/src/App.jsx';

describe('ProductList component', () => {

  test('loads and displays "The Product List"', () => {
    render(<App/>);

    expect(screen.getByTitle('TheProductList')).toHaveTextContent('Related List');
  });



});