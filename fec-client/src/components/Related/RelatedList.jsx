import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Card from './Card.jsx'

const Container = styled.div`
  width: 100%;
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.

`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex; //이미지들을 가로로 나열합니다.
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
const postsPerPage = 4;

const RelatedList = ({relatedArray})=> {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [idArray, setIdArray] = useState([]);
  //for arrow button
  var hide = true;

  const slideRef = useRef(null);
  const nextSlide = () => {
      if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
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

  //componentDidmount
  const changehide =  (value) => {
    hide=value;
  }

  useEffect(() => {
    if(relatedArray.length > 4){
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    const indexOfFirst = currentSlide * postsPerPage;
    const indexOfLast = postsPerPage * (currentSlide + 1);
    setIdArray([...relatedArray.slice(indexOfFirst, indexOfLast)]);
  } else {
    setIdArray([...relatedArray]);
  }
  }, [currentSlide, relatedArray]);

  // useEffect(() => {
  //   setIdArray([...relatedArray.slice(0, 4)]);
  // }, [relatedArray]);

  // useEffect(()=>{
  //   getfirstarray();
  // },[])

  if(relatedArray.length > 4){
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
      {idArray.map((data,index)=> (
        <Card id = {data} key = {data+index}/>
      ))}
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