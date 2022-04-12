import '@testing-library/jest-dom';
import React from 'react';
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
    return res(ctx.json(Questions));
  }),

  rest.post('/api', (req, res, ctx) => {
    return res(ctx.json(Questions));
  }),

  rest.put('/api', (req, res, ctx) => {
    return res(ctx.json(Questions));
  })
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
      render(<QA product={12345} />);

      expect(screen.getByTitle('Add Question')).toBeInTheDocument();
    });

    test('"See More Questions" button should exist', () => {
      render(<QA product={12345} />);
      let options = {
        name: 'See More Questions'
      };

      expect(screen.getByRole('button', options)).toBeInTheDocument();
    });

    test('"See Less Questions" button should render after clicking "See More Questions"', () => {
      render(<QA product={12345} />);

      let options = {
        name: 'See More Questions'
      };

      fireEvent.click(screen.getByRole('button', options));

      options.name = 'See Less Questions';

      expect(screen.getByRole('button', options)).toBeInTheDocument();
    });
  });

  describe('Search Bar', () => {
    test('Search Bar should exist', () => {
      render(<QA product={12345}/>);

      expect(screen.getByTitle('live-search')).toBeInTheDocument();
    });
  });
});
