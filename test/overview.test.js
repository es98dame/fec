import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Overview from '../fec-client/src/components/Overview/index.jsx';

// const server = setupServer(
//   rest.get('/test', (req, res, ctx) => {
//     return res(ctx.json({greeting: 'hello there'}));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe('Overview component', () => {

  test('loads and displays "Overview here"', () => {
    render(<Overview/>);

    expect(screen.getByTitle('Overview')).toHaveTextContent('Overview here');
  });

});