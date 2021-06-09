// Get the immidata from my Gist
import { useState, useEffect } from 'react';
import { csv } from 'd3';

const dataUrl ="https://gist.githubusercontent.com/serjunfan/42a3c78447ee2d947681451105366e6a/raw/bb53c438beec9253d78985330bfedafa87386f13/coordinate.csv";
export const coorData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(dataUrl).then(setData);
  },[]);
  
  return data;
};
