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
  expect(screen.getByRole('heading')).toHaveTextContent('Reviews');
  expect(screen.getByTitle('review-list')).toBeInTheDocument();
});


//REVIEW LIST
test('Renders Review List with two provided reviews', () => {
  render(<ReviewList reviews = {RatingsStubs.results}/>);
  expect(screen.getByTitle('review-list')).toBeInTheDocument();
  expect(screen.getByText('bigbrother')).toBeInTheDocument();
  expect(screen.getByText('figuringitout')).toBeInTheDocument();
});

//Company Response
test('Does not render the response div if no response available', () => {
  render(<ReviewList reviews = {RatingsStubs.results.slice(0, 1)} />);
  expect(screen.queryByTitle( 'response' )).not.toBeInTheDocument();
});

test('Renders the company response div if a response is available', () => {
  render(<ReviewList reviews = {RatingsStubs.results.slice(0, 2)} />);
  expect(screen.getByTitle('response')).toHaveTextContent('So glad you liked the pants!');
});

//THUMBNAIL POPUP
describe('Thumbnail modal behavior', () => {
  test('Renders a modal pop-up when a thumbnail is clicked', () => {
    render(<ReviewList reviews = {RatingsStubs.results}/>);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(screen.getByTitle('Modal')).toBeInTheDocument();
  });

  test('Does not render the modal on document load', () => {
    render(<ReviewList reviews = {RatingsStubs.results}/>);
    expect(screen.queryByTitle('Modal')).toBeNull();
  });
});


describe('Review List display options', () => {
  test('Renders two reviews to the screen on Review List load', () => {
    render(<ReviewList reviews = {RatingsStubs.results}/>);
    const Tiles = screen.getAllByTitle('Tile');
    expect(Tiles).toHaveLength(2);
  });

  test('Renders two additional reviews to the screen on Show More Reviews click', () => {
    render(<ReviewList reviews = {RatingsStubs.results} />);
    fireEvent.click(screen.getByText('Show More Reviews'));
    expect(screen.getAllByTitle('Tile')).toHaveLength(4);
  });

  test('Should not display Show More Reviews button if two or fewer reviews are available', () => {
    render(<ReviewList reviews = {RatingsStubs.results.slice(0, 2)}/>);
    expect(screen.queryByText('Show More Reviews')).not.toBeInTheDocument();
  });
});

describe('Review Body options', () => {
  test('Renders 250 characters (plus ellipses and Show More tag) or less to the Review Body on initial load', () => {
    render(<ReviewList reviews = {RatingsStubs.results.slice(0, 1)} />);
    const suffix = '...  Show More'.length;
    const body = screen.getByTitle('review-body');
    expect(body.textContent.length).toBeLessThanOrEqual(250 + suffix);
  });
  test('Renders complete review to the Review Body when Show More is clicked, then hides the button', ()=>{
    render(<ReviewList reviews = {RatingsStubs.results.slice(0, 1)}/>);
    fireEvent.click(screen.getByText('Show More'));
    expect(screen.getByTitle('review-body').textContent.length).toBe(331);
    expect(screen.queryByText('Show More')).not.toBeInTheDocument();
  });
});





