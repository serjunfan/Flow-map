import { useState, useEffect } from 'react';
import { csv } from 'd3';

const dataUrl ="https://gist.githubusercontent.com/serjunfan/b3f0b16e32c153b8393338bf997bdc08/raw/4a0b8e022f09de28bfae808da66bed1b311c61e7/2020.csv";
export const immiData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(dataUrl).then(setData);
  },[]);

  return data;
};
