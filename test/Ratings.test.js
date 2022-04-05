import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Ratings from '../fec-client/src/components/Ratings';
import ReviewList from '../fec-client/src/components/Ratings/ReviewList';
import RatingsStubs from './RatingsStubs.js';

const server = setupServer(
  rest.get('/api', (req, res, ctx) => {
    return res(ctx.json());
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//SETUP
test('renders Ratings component to the DOM', () => {
  render(<Ratings /> );
  expect(screen.getByRole('heading')).toHaveTextContent('Ratings Component');
  expect(screen.getByTitle('review-list')).toBeInTheDocument();
});


//REVIEW LIST
test('Renders Review List with all provided reviews', () => {
  render(<ReviewList reviews = {RatingsStubs.results}/>);
  expect(screen.getByTitle('review-list')).toBeInTheDocument();
  expect(screen.getByText('bigbrother')).toBeInTheDocument();
  expect(screen.getByText('figuringitout')).toBeInTheDocument();
  expect(screen.getByText('shopaddict')).toBeInTheDocument();
});

//THUMBNAIL POPUP

test('Renders a modal pop-up when a thumbnail is clicked', () => {
  render(<ReviewList reviews = {RatingsStubs.results}/>);
  fireEvent.click(screen.getAllByRole('img')[0]);
  expect(screen.getByTitle('Modal')).toBeInTheDocument();
});

test('Does not render the modal on document load', () => {
  render(<ReviewList reviews = {RatingsStubs.results}/>);
  expect(screen.queryByTitle('Modal')).toBeNull();
});

//TWO REVIEWS AT A TIME
test('Renders two reviews to the screen on Review List load', () => {
  render(<ReviewList reviews = {RatingsStubs.results}/>);
  const Tiles = screen.getAllByText('Tile');
  expect(Tiles).toHaveLength(2);
});





