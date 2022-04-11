
import React from 'react';

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// import react-testing methods
import {render, screen} from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// the component list to test
import App from './../fec-client/src/App.jsx';
import Main from './../fec-client/src/components/Related';
import RelatedList from './../fec-client/src/components/Related/RelatedList.jsx';
import Card from './../fec-client/src/components/Related/Card.jsx';
import OutfitList from './../fec-client/src/components/Related/OutfitList.jsx';


//Setup
//Need to make a server
const server = setupServer(
  rest.get('/api', (req, res, ctx) => {
    return res(ctx.json());
  })
);

//Need to mock out route
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(()=> server.close())


test('loads and displays "The Product List"', () => {
  render(<App/>);
  expect(screen.getByTitle('TheProductList')).toHaveTextContent('Related List');
});


test('Does DOM have "Related List" and "Outfit List"', () => {
  render(<Main/>);
  const HeadingList = screen.getAllByRole('heading');
  expect(HeadingList).toHaveLength(2);
  expect(HeadingList[0]).toHaveTextContent('Related List');
  expect(HeadingList[1]).toHaveTextContent('Outfit List');
});

//render relate list id = 65632
// give title to cards
// check same length
test('Check correct the related product list', () => {
  render(<Main productId = '65631'/>);
  const CardList = screen.getAllByTitle('Product Card');
  expect(CardList).toHaveLength(2);
});