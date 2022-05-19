import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const SeeAllRegEx = /(See all)([0-9]+)(ratings)/gi;

const checkForModule = (path, e) => {
  let standard = [ 'App', 'Overview', 'RelatedList', 'QA', 'Ratings'];
  let allModules = [];

  for (let component of path) {
    if (component.id === 'app') {
      break;
    }
    for (let moduleName of standard) {
      if (typeof component.className === 'object') {
        continue;
      } else if (component.className.includes(moduleName)) {
        allModules.push(moduleName);
      }
    }
  }

  if (e.target.nodeName === 'svg' || SeeAllRegEx.test(e.target.innerText)) {
    if (allModules.includes('Overview')) {
      return 'Overview';
    } else {
      return 'Ratings';
    }
  } else {
    return allModules[0];
  }
};

const getElementName = (e) => {
  if (typeof e.target.className !== 'object' && e.target.className) {
    return e.target.className;
  } else if (e.target.id) {
    return e.target.id;
  }

  return 'Name N/A';
};

window.addEventListener('click', (e) => {
  const event = {
    element: getElementName(e),
    time: Math.floor(e.timeStamp / 1000),
    module: checkForModule(e.path, e)
  };

  if (window.sessionStorage.getItem('UserClicks') === 'undefined' || window.sessionStorage.getItem('UserClicks') === null) {
    window.sessionStorage.setItem('UserClicks', JSON.stringify([]));
  } else {
    let userClickData = JSON.parse(window.sessionStorage.getItem('UserClicks'));
    userClickData.push(event);

    let userData = JSON.stringify(userClickData);

    window.sessionStorage.setItem('UserClicks', userData);
  }
});

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

