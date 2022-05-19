import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Ratings from '../fec-client/src/components/Ratings';
import ReviewList from '../fec-client/src/components/Ratings/ReviewList';
import RatingsBreakdown from '../fec-client/src/components/Ratings/RatingsBreakdown';
import Sort from '../fec-client/src/components/Ratings/Sort';
import Write from '../fec-client/src/components/Ratings/Write';
import {RatingsStubs, metaData} from './stubs/RatingsStubs.js';

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
  expect(screen.getByTitle('review-list')).toBeInTheDocument();
  expect(screen.getByTitle('write')).toBeInTheDocument();
  expect(screen.getByTitle('sort')).toBeInTheDocument();
  expect(screen.getByTitle('write')).toBeInTheDocument();
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

//RATINGS BREAKDOWN

describe('Ratings breakdown overview', () => {
  test('Renders the ratings breakdown component', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.queryByTitle('ratings-breakdown')).toBeInTheDocument();
    expect(screen.queryByTitle('review-breakdown')).toBeInTheDocument();
    expect(screen.queryByTitle('product-breakdown')).toBeInTheDocument();
  });
});

describe('Review breakdown numbers', () => {
  test('Review Breakdown displays correct average', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('average')).toHaveTextContent(`(${4.2})`);
  });
  test('Review Breakdown displays correct number of 1-star reviews', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('num-ratings-1')).toHaveTextContent('0');
  });
  test('Review Breakdown displays correct number of 2-star reviews', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('num-ratings-2')).toHaveTextContent('1');
  });
  test('Review Breakdown displays correct number of 3-star reviews', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('num-ratings-3')).toHaveTextContent('5');
  });
  test('Review Breakdown displays correct number of 4-star reviews', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('num-ratings-4')).toHaveTextContent('4');
  });
  test('Review Breakdown displays correct number of 5-star reviews', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('num-ratings-5')).toHaveTextContent('11');
  });
  test('Review Breakdown displays correct percentage of recommended reviews', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('percent-recommended')).toHaveTextContent('95% of reviewers recommend this product');
  });
});

describe('Review bar clicks', () => {
  test('Ratings bars should not be clicked on load', () => {
    render(<RatingsBreakdown metaData = {metaData}/>);
    expect(screen.getByTitle('review-bar-1')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-2')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-3')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-4')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-5')).not.toHaveClass('clicked');
  });

  test('Rating bar changes to have class "clicked" on first click', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    fireEvent.click(screen.getByTitle('review-bar-1'));
    expect(screen.getByTitle('review-bar-1')).toHaveClass('clicked');
  });

  test('Rating bar changes to not have class "clicked" on second click', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    fireEvent.click(screen.getByTitle('review-bar-1'));
    expect(screen.getByTitle('review-bar-1')).toHaveClass('clicked');
    fireEvent.click(screen.getByTitle('review-bar-1'));
    expect(screen.getByTitle('review-bar-1')).not.toHaveClass('clicked');
  });

  test('Ratings component handles clicks on multiple bars', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    fireEvent.click(screen.getByTitle('review-bar-1'));
    fireEvent.click(screen.getByTitle('review-bar-2'));
    expect(screen.getByTitle('review-bar-1')).toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-2')).toHaveClass('clicked');
  });

  test('Rating bar click triggers creation of "Show all reviews" button', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    fireEvent.click(screen.getByTitle('review-bar-1'));
    expect(screen.queryByText('View All')).toBeInTheDocument();
  });

  test('Unclicking all bars triggers removal of "Show all reviews" button', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    fireEvent.click(screen.getByTitle('review-bar-1'));
    fireEvent.click(screen.getByTitle('review-bar-2'));
    fireEvent.click(screen.getByTitle('review-bar-4'));
    expect(screen.getByText('View All')).toBeInTheDocument();
    fireEvent.click(screen.getByTitle('review-bar-2'));
    fireEvent.click(screen.getByTitle('review-bar-4'));
    fireEvent.click(screen.getByTitle('review-bar-1'));
    expect(screen.queryByText('View All')).not.toBeInTheDocument();
  });

  test('Clicking "Show all reviews" button resets the status of all bars to not clicked and disappears itself', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    fireEvent.click(screen.getByTitle('review-bar-1'));
    expect(screen.getByText('View All')).toBeInTheDocument();
    fireEvent.click(screen.getByText('View All'));
    expect(screen.getByTitle('review-bar-1')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-2')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-3')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-4')).not.toHaveClass('clicked');
    expect(screen.getByTitle('review-bar-5')).not.toHaveClass('clicked');
    expect(screen.queryByText('View All')).not.toBeInTheDocument();
  });
});

describe('Product Breakdown', () => {
  test('Product Breakdown renders the correct number of factors', () => {
    render(<RatingsBreakdown metaData = {metaData} setFilters = {()=>{}}/>);
    expect(screen.queryByText('Fit')).toBeInTheDocument();
    expect(screen.queryByText('Length')).toBeInTheDocument();
    expect(screen.queryByText('Comfort')).toBeInTheDocument();
    expect(screen.queryByText('Quality')).toBeInTheDocument();
    expect(screen.queryByText('Width')).not.toBeInTheDocument();
    expect(screen.queryByText('Size')).not.toBeInTheDocument();
  });
});

describe('Write a Review basics', () => {
  test('Write a Review Modal is not on the screen. When button is clicked, modal appears', () => {
    render(<Write relevantChars = {metaData.characteristics} productId = {'65634'} productName = {'test name'}/>);
    expect(screen.queryByText('write-form-container')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Write a Review'));
    expect(screen.queryByTitle('write-form-container')).toBeInTheDocument();
  });
});
