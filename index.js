//Main function. Actually a React H
import React, { useState ,useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { immiData1 } from './immiData1';
import { coorData } from './coordata';
import { Marks } from './Marks';

const width = 960;
const height = 500;

const App = () => {
  const svgRef = useRef();
  const gRef = useRef();
  useEffect( () => {
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);
    const zoomFunc = d3.zoom().scaleExtent([0.8,5])
    .translateExtent([[0,0],[width,height]])
    .on("zoom", () =>{
      g.attr('transform',d3.event.transform);
      console.log("zoomed");
      });
    zoomFunc(svg);
  } )
  const graphdata = useData();
  const coordata = coorData();
  const immidata = immiData1();
  if (!graphdata || !immidata || !coordata) {
    return <pre>Loading...</pre>;
  }
  return (
    <svg width={width} height={height} ref={svgRef}
      fill="current" stroke="current">
      <g ref={gRef} >
         <rect fill={"#3b5bb5"} width={width} height={height}/>
          <Marks graphdata={graphdata}
            immidata={immidata}
            coordata={coordata}/>
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
