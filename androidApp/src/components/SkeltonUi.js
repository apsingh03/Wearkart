import React from 'react';
import {Skeleton} from '@rneui/themed';

function SkeltonUi({circle, width, height, ...props}) {
  return (
    <Skeleton
      circle={circle}
      //   pulse or wave
      animation="wave"
      width={width}
      height={height}
      {...props}
    />
  );
}

export default SkeltonUi;
