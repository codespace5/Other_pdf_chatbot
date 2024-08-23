import React from 'react';

const MyComponent = () => {
  const jsonObject = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  };

  const hasKey = (key) => {
    return jsonObject.hasOwnProperty(key); // or key in jsonObject
  };

  return (
    <div>
      <p>Key 'key2' exists: {hasKey('key2') ? 'Yes' : 'No'}</p>
      <p>Key 'key4' exists: {hasKey('key4') ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default MyComponent;