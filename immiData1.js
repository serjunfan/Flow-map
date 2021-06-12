// Get the immidata from my Gist
import { useState, useEffect } from 'react';
import { csv } from 'd3';


const dataUrl ="https://gist.githubusercontent.com/serjunfan/3dddca9b501a61b1c8922bfcabb44a5e/raw/8e6f9369be2467fddc98efdf8b4db8978520a8e3/2020(Russia_ver3).csv";
export const immiData1 = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    csv(dataUrl).then(setData);
  },[]);

  return data;
};
