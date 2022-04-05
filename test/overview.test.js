import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import App from '../fec-client/src/App.jsx';

const server = setupServer(
  rest.get('/test', (req, res, ctx) => {
    return res(ctx.json({greeting: 'hello there'}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays "Overview here"', () => {
  render(<App/>);

  expect(screen.getByRole('heading')).toHaveTextContent('Overview here');
});