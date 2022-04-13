import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Overview from '/Users/ianhoffman/SEI-2202/fec/fec-client/src/components/Overview/index.jsx';

const server = setupServer(
  rest.get('/api', (req, res, ctx) => {
    return res(ctx.json());
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders Overview component to the DOM', () => {
  render(<Overview /> );
  expect(screen.getByTitle('Overview')).toBeInTheDocument();
});

test('renders Overview Images component to the DOM', () => {
  render(<Overview /> );
  expect(screen.getByTitle('Images')).toBeInTheDocument();
});

test('renders Overview product specs component to the DOM', () => {
  render(<Overview /> );
  expect(screen.getByTitle('Product-specs')).toBeInTheDocument();
});

test('Should load the default product to the page', () => {
  render(<Overview /> );
  expect(screen.getByTitle('Product-specs')).toHaveTextContent('Style');
  expect(screen.getByTitle('Product-specs')).toHaveTextContent('nothing to feature');

});