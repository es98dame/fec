import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import Card from './Card.jsx';

const Container = styled.div`
  overflow : hidden;
  width : 100%;
  height : 600px;
  position: relative;
  align-items: center;
`;

const SliderContainer = styled.div`
  position: relative;
  top: 47px;
}
`;

const ProductCard = styled.div`
  width : 100%;
  display : flex;
  flex-direction: row;
  gap: 0.5em;
`;

const NoButton = styled.button`

  visibility: hidden;
  flex-direction: column;
  position : relative;
  display : block;
  position: relative;
  z-index ; 20;
  padding-left: 10px;
  padding-right: 21px;

`;

const Button = styled.button`
  max-height: 312px;
  display : flex;
  flex-direction: column;
  position : relative;
  display : block;

  z-index ; 20;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 1;
  line-height: 25;

  background: transparent;
  color: ${props => props.theme.color};
  border: 0px;

  &:hover {
    transition: all 0.3s ease-in-out;
    transform: scale(1.2);
  }
`;

const TOTAL_SLIDES = 2;
const postsPerPage = 5;

const RelatedList = ({relatedArray, mode, deletehandle})=> {
  const [styleArray, setStyleArray] = useState('');
  const [infoArray, setInfoArray] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideRef = useRef(null);

  const customAxiosFunctions = async () => {
    //get product infomation
    const promises1 = relatedArray.map((id) => {
      return axios.all([
        axios.get('/api', {headers: {path: `/products/${id}`}}),
      ])
        .then(axios.spread((data1) => {
          return data1.data;
        }))
        .catch((err)=> console.log('axios request error in Promise1 in RelatedList.jsx', err));

    });
    const resolvedResponses1 = await Promise.all(promises1);
    resolvedResponses1.map((el) => {
      setInfoArray(oldArray => [...oldArray, el]);
    });

    //get product style infomation
    const promises2 = relatedArray.map((id) => {
      return axios.all([
        axios.get('/api', {headers: {path: `/products/${id}/styles`}}),
      ])
        .then(axios.spread((data1) => {
          return data1.data;
        }))
        .catch((err)=> console.log('axios request error in Promise2 in RelatedList.jsx', err));

    });
    const resolvedResponses2 = await Promise.all(promises2);
    resolvedResponses2.map((el) => {
      setStyleArray(oldArray => [...oldArray, el]);
    });


  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      return;
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.animate( { opacity: [0, 1]}, 500 );
    //slideRef.current.style.transform = `translateX(-${currentSlide}03%)`;
    //setIdArray(infoArray.slice(currentSlide * postsPerPage , postsPerPage * (currentSlide + 1)));
  }, [currentSlide]);

  useEffect(() => {
    setStyleArray('');
    setInfoArray('');
    customAxiosFunctions();

  }, [relatedArray]);


  return (
    <Container>
      <SliderContainer ref={slideRef} title='card slide'>
        <ProductCard>
          {currentSlide === 0 ? <NoButton></NoButton> :
            <Button onClick={prevSlide}>←</Button>
          }
          {infoArray instanceof Array && styleArray instanceof Array
              && infoArray.map((data, i)=>{
                if ( i >= currentSlide * postsPerPage && i < postsPerPage * (currentSlide + 1)) {
                  return (<Card productInfo={data} styleInfo = {styleArray[i]} key={i} mode={mode} deletehandle={deletehandle}/>);
                }
              })}
          { postsPerPage * (currentSlide + 1) >= infoArray.length ? <NoButton></NoButton> :
            <Button onClick={nextSlide}>→</Button>
          }
        </ProductCard>
      </SliderContainer>
    </Container>
  );
};

export default RelatedList;