import '@testing-library/jest-dom';
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';

import Main from '../fec-client/src/components/Related';
import RelatedList from '../fec-client/src/components/Related/RelatedList.jsx';
import Card from '../fec-client/src/components/Related/Card.jsx';
import OutfitList from '../fec-client/src/components/Related/OutfitList.jsx';
import Data from './stubs/Productlist.Stub.js';

const server = setupServer(
  rest.get('/api', (req, res, ctx) => res(ctx.json())),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductList component', () => {
  test('loads and displays "The Product List"', () => {
    render(<Main />);
    expect(screen.getByTitle('TheProductList')).toHaveTextContent('Related List');
  });

  test('Does DOM have "Related List" and "Outfit List"', () => {
    render(<Main />);
    const HeadingList = screen.getAllByRole('heading');
    expect(HeadingList).toHaveLength(2);
    expect(HeadingList[0]).toHaveTextContent('Related List');
    expect(HeadingList[1]).toHaveTextContent('Outfit List');
  });

});

describe('Related Product List component', () => {
  test('Check the card is from the related list', () => {
    render(<Card productInfo={Data.productInfo} mode = 'related'/>);
    expect(screen.getByTitle('Product card')).toBeInTheDocument();
  });

  test('Modal when the actino button is clicked', async () => {
    const mAxiosResponse = {
      data: Data.productInfo,
    };

    jest.spyOn(axios, 'get').mockResolvedValueOnce(mAxiosResponse);

    const deletehandle = jest.fn();
    render(<Card productInfo={Data.productInfo} styleInfo={Data.styleInfo} mode = 'related' deletehandle={deletehandle}/>);

    const HeadingList = screen.getAllByTitle('ModalButton');
    fireEvent.click(HeadingList[0]);
    await waitFor(() => screen.getByTitle('ModalCard'));
    expect(screen.getByTitle('ModalCard')).toBeInTheDocument();
  });

  test('Over 5 product cards, the right button of a carousel is activated', async () => {
    const minProps = ['65631', '65632', '65633', '65634', '65635', '65636'];
    const deletehandle = jest.fn();
    render(<RelatedList relatedArray={minProps} mode = 'related' deletehandle={deletehandle}/>);
    await waitFor(() => screen.getAllByRole('button'));
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

});

describe('Outfit List component', () => {

  test('Check the card is from the outfit list', () => {
    render(<Card productInfo={Data.productInfo} mode = 'outfit'/>);
    expect(screen.getByTitle('Outfit card')).toBeInTheDocument();
  });

  test('OutfitList always has firstCard', () => {
    render(<OutfitList />);
    expect(screen.getAllByTitle('firstcard').length).toBe(1);
  });

  test('add current item to the outfit list', async () => {
    render(<OutfitList />);
    await screen.getByTitle('firstcard');
    fireEvent.click(screen.getByTitle('firstcard'));
    await screen.getByTitle('card slide');
    expect(screen.getByTitle('card slide')).toBeInTheDocument();
  });
});
