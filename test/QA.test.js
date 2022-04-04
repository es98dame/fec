import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QA from './../fec-client/src/components/Q&A/QA.jsx';
import QAList from './../fec-client/src/components/Q&A/QAList.jsx';

// beforeEach(() => {
//   const app = document.createElement('app');
//   document.body.appendChild(app);
// });

describe('Numerical Testing - Not Component Related', () => {
  test('adds two numbers together', () => {
    const add = function(num1, num2) {
      return num1 + num2;
    };
    expect(add(1, 2)).toBe(3);
  });

  test('subtracts one number from the other', () => {
    const subtract = function(num1, num2) {
      return num1 - num2;
    };
    expect(subtract(10, 5)).toBe(5);
  });
});

describe('QA component', () => {
  const app = document.createElement('app');
  console.log(app);
  document.body.appendChild(app);
  let { getByText } = render(QA, app);

  test('it renders QA component to the App', () => {
    expect(getByText('Questions And Answers'));
  });
});


// describe('QAList component', () => {
//   render(<QAList />);
//   test('it renders QA component to the App', () => {
//     expect(screen.)
//   });
// });