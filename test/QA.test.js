import '@testing-library/jest-dom';
import React from 'react';
import axios from 'axios';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Questions } from './stubs/QA.stubs.js';

import QA from './../fec-client/src/components/Q&A/QA.jsx';
import QAList from './../fec-client/src/components/Q&A/QAList.jsx';
import QAListEntry from './../fec-client/src/components/Q&A/QAListEntry.jsx';
import AListEntry from './../fec-client/src/components/Q&A/AListEntry.jsx';
import AddAModal from './../fec-client/src/components/Q&A/AddAModal.jsx';
import AddQModal from './../fec-client/src/components/Q&A/AddQModal.jsx';
import PhotoModal from './../fec-client/src/components/Q&A/PhotoModal.jsx';


const productId = 12345;
const productName = 'Yellow Pants';

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observer() {
    return null;
  }

  unobserver() {
    return null;
  }
};

const server = setupServer(
  rest.get('/api', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      ctx.status(200),
      ctx.json(Questions)
    );
  }),
  rest.post('/api', (req, res, ctx) => {
    return res(
      ctx.status(201)
    );
  }),
  rest.put('/api', (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
  rest.get('/api/qa/questions/', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true');
    return res(
      ctx.status(200),
      ctx.json(Questions)
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('handlers server error', async () => {
  server.use(
    rest.get('/api', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
});

describe('QA component', () => {

  describe('Questions List Buttons', () => {


    test('"Add A Question" button should exist', () => {
      render(<QA productId={productId} productName={productName}/>);

      expect(screen.getByTitle('Add Question')).toBeInTheDocument();
    });

    test('"See More Questions" button should exist', async () => {
      render(<QA productId={productId} productName={productName}/>)
      // let options = {
      //   name: 'See More Questions'
      // };

      // expect(screen.getByRole('button', options)).toBeInTheDocument
      await waitFor(() => screen.findByText('See More Questions'));
      const SeeMoreQuestions = await findByText('See More Questions')
    });

  });

  describe('Search Bar', () => {
    test('Search Bar should exist', () => {
      render(<QA productId={productId} productName={productName}/>);

      expect(screen.getByTitle('search-input')).toBeInTheDocument();
    });
  });
});
