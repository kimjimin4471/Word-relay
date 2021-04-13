import React, { memo } from 'react';

const Words = memo(({words}) => {
  return(
    <span>{words}</span>
  );
});

export default Words;