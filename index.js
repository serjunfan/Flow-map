//Main function. Actually a React H
import React, { useState ,useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
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
  return (
    <svg width={width} height={height} ref={svgRef}
      fill="current" stroke="current">
      <g ref={gRef} >
         <rect fill={"#110577"} width={width} height={height}/>
          <Marks />
      </g>
    </svg>
  );
};
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
