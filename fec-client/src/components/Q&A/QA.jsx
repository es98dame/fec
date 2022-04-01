import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styled from 'styled-components';

const QA = function (productId = []) {
  const [QAData, SetQA] = useState(productId);

  return (
    <div>
      <div>SearchBar Goes Here</div>
      <div>QAList Goes Here</div>
      <div>
        <button>More Answered Questions</button>
        <button>Add A Question</button>
      </div>
    </div>
  );
};

export default QA;
