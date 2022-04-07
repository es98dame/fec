import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card.jsx'
import CardList from './CardList.jsx';

const Container = styled.div`
  overflow : hidden;
`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  // justify-content : space-between;
  min-width: 0;
  flex: 1;
  margin: 10px;
`;

const Button = styled.button`
  display : none;

  ${SliderContainer}:hover & {
    all: unset;
    display : block;
    border: 1px solid coral;
    color: coral;
    border-radius: 10px;
    position: relative;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
      transition: all 0.3s ease-in-out;
      background-color: coral;
      color: #fff;
    }

  }

`;


const TOTAL_SLIDES = 2;
const postsPerPage = 5;

const RelatedList = ({relatedArray})=> {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [idArray, setIdArray] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  // const [styleInfo, setStyleInfo] = useState([]);

  const slideRef = useRef(null);
  const nextSlide = () => {
      if (currentSlide >= TOTAL_SLIDES) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide(currentSlide + 1);
      }
    };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // useEffect(() => {
  //   if(relatedArray.length > 5){
  //   slideRef.current.style.transition = "all 0.5s ease-in-out";
  //   const indexOfFirst = currentSlide * postsPerPage;
  //   const indexOfLast = postsPerPage * (currentSlide + 1);
  //   setIdArray([...relatedArray.slice(indexOfFirst, indexOfLast)]);
  // } else {
  //   setIdArray(relatedArray);
  // }
  // }, [currentSlide, relatedArray]);



  // useEffect(()=>{
  //   getfirstarray();
  // },[])

  if(relatedArray.length > 5){
    return (
      <Container>
        {/* {currentSlide} */}
        <SliderContainer ref={slideRef} >
           <Button onClick={prevSlide}>←</Button>
          {idArray.map((data,index)=> (
          <Card id = {data} key = {data+index}/>
        ))}
       <Button onClick={nextSlide}>→</Button>
        </SliderContainer>
      </Container>

    );
  } else {
    return(
      <SliderContainer>
        <CardList relatedArray={relatedArray}/>
      </SliderContainer>
    );

  }

}

  //check info value
  // useEffect(() => {
  //   console.log('pro',productInfo)
  //   console.log('sty',styleInfo)
  // }, [productInfo,styleInfo])


  // "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"


export default RelatedList;