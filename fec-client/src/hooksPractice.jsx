import React, { useState, useEffect } from 'react';

function Example(productID) {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  // const [count, setCount] = useState(productId);
  // const [pewp, setPoop] = useState('poop');
  //useEffect

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <b>Name:</b> {name}
        <div>
          <b>Nickname: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
}

export default Example;