import React, {useState} from 'react';
import WriteModal from './WriteModal.jsx';



const Write = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleWriteModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <button onClick = {toggleWriteModal}>Write a Review</button>
      { showModal ? <WriteModal /> : null}
    </div>
  );
};

export default Write;