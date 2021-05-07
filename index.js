//Main function. Actually a React H
import React from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { Marks } from './Marks';
import { immiData } from './immiData';
import { getlalo } from './getlalo';
import { setuppoints } from './setuppoints';

const width = 960;
const height = 500;
//const projection = d3.geoNaturalEarth1();

const App = () => {
  const graphdata = useData();
  const immidata = immiData();
  if (!graphdata || !immidata ) {
    return <pre>Loading...</pre>;
  }
  //console.log(graphdata);
  const countrytable = new Map();
  graphdata.countries.features.forEach( (d,i) =>{
   countrytable.set(d.properties.name
    ,(getlalo(d.geometry.coordinates, i)));
  })
  setuppoints(countrytable,immidata);
  console.log(immidata);

  return (
    <svg width={width} height={height}>
      <Marks graphdata={graphdata} immidata={immidata}/>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
