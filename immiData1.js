// Get the immidata from my Gist
import { useState, useEffect } from 'react';
import { csv } from 'd3';


const dataUrl ="https://gist.githubusercontent.com/serjunfan/11f2e26371afcb897fdbed8ac26ff5bf/raw/ec9a0d9b4e6c5dbce4a65eb1cf7730f868c9704f/2020_Russia_ver1.csv";
export const immiData1 = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(dataUrl).then(setData);
  },[]);

  return data;
};
