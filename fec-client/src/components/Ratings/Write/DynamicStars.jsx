import React, {useState} from 'react';
import styled from 'styled-components';
import Star from '../../Shared/Star.jsx';

// const StyledStar = styled(Star)`
// height: 50;
// `;

const StarRow = styled.div`
display: flex;
flex-direction: row;
`;

const Selection = styled.div`
font-style: italic;
margin-left: 10px;
`;

const selections = ['Good', 'Fair', 'Average', 'Good', 'Great'];

const DynamicStars = ({setRating}) => {
  const [fills, setFills] = useState([0, 0, 0, 0, 0]);
  const [clicked, setClicked] = useState(false);
  const [selection, setSelection] = useState('No rating selected')

  const handleClick = (num) => {
    const newFills = [];
    for (let i = 0; i < 5; i++) {
      if (i <= num) { newFills.push(100); }
      else { newFills.push(0); }
    }
    setFills(newFills);
    setClicked(true);
    setRating(num + 1);
    setSelection(selections[num]);
  };

  const handleMouseIn = (num) => {
    if (!clicked) {
      const newFills = [];
      for (let i = 0; i < 5; i++) {
        if (i <= num) { newFills.push(100); }
        else { newFills.push(0); }
      }
      setFills(newFills);
      setSelection(selections[num]);
    }
  };

  const handleMouseOut = () => {
    if (!clicked) { setFills([0, 0, 0, 0, 0]); }
  };

  return (
    <StarRow>
      {[0, 1, 2, 3, 4].map(item => (
        <div key = {item} onClick = {() => handleClick(item)} onMouseEnter = {()=>handleMouseIn(item)} onMouseLeave = {handleMouseOut}>
          <Star fill = {fills[item]} size = {'30'}/>
        </div>
      ))}
      <Selection> {selection} </Selection>
    </StarRow>
  );


};

export default DynamicStars;