import {
  geoNaturalEarth1,
  geoPath,
  geoGraticule,
} from 'd3';
import { useData } from './useData';
import { immiData1 } from './immiData1';
import { setUpdata } from './setUpdata';
import { coorData } from './coordata';

import React, { useState, useEffect } from 'react';
// Graph the World map and the line based on immigrants
const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
  
const d3line = d3.line()
			.x(function(d){ return d.x; })
      .y(function(d){ return d.y; })
      .curve(d3.curveLinear);

export const Marks = () => {
  const [selected, setSelected] = useState('Brazil');
  const handleClick = (e) => {
    if (selected == e.currentTarget.getAttribute('title')) {
      setSelected(null);
    } else {
      setSelected(e.currentTarget.getAttribute('title'));
    }
  };

  const coordata = coorData();
  const graphdata = useData();
  const immidata = immiData1();
  if (!graphdata || !immidata || !coordata) {
    return <pre>Loading...</pre>;
  }
  setUpdata(coordata, immidata);
  let filterdata = [] ;
  if( selected !== null){ 
   filterdata = immidata.filter(
    (d) =>
      d[
        'Region, development group, country or area of origin'
      ] == selected
  );
  }
  else
    filterdata = immidata;
  const nodes = {};
  let results = [];
  if( filterdata.length != 0 ){
  filterdata.forEach( (d,i)=> {
    nodes[`${i}`] = {x:projection(d.coordinates[0])[0] ,y:projection(d.coordinates[0])[1]} ;
  })
  console.log(Object.keys(nodes).length);
    nodes[`${Object.keys(nodes).length}`] = {x:projection(filterdata[0].coordinates[1])[0],
                           y:projection(filterdata[0].coordinates[1])[1]};
    
    const edges = filterdata.map( (d,i) => {
     let obj = {};
     obj['source'] = `${Object.keys(nodes).length-1}`;
     obj['target'] = `${i}`;
     return obj;
   })
    console.log(nodes);
    console.log(edges);
  const fbundling = d3.ForceEdgeBundling()   
				.nodes(nodes)
				.edges(edges)
  
	 results = fbundling();
  }
  
  console.log(filterdata);
  console.log(selected);
  return (
    <g className="marks">
      {graphdata.countries.features.map((feature) => (
        <path
          className="country"
          d={path(feature)}
          cursor={'pointer'}
          title={feature.properties.name}
          onClick={(e) => handleClick(e)}
          fill={
            selected == feature.properties.name
              ? 'red'
              : '#e9f3e5'
          }
        />
      ))}
      {results.map( d => (
        <path className="flows"
            d={d3line(d)}
            stroke={'#36dad2'}
            fill={'none'}
            stroke-width={1}
            stroke-opacity={0.15} 
          /> ) 
                  ) }
      {  filterdata.map ( d => 
        (
          <circle
            r={2}
            cx={projection(d.coordinates[0])[0]}
            cy={projection(d.coordinates[0])[1]}
            onClick={(e) => handleClick(e)}
            cursor={'pointer'}
            fill={'#fbf419'}
            stroke={'#252525'}
          /> 
     ) )} 
      <path
        className="interiors"
        d={path(graphdata.interiors)}
      />
    </g>
  );
};

/*    {immidata.map( d => (
   
   <path className="flows" d={path(d)} />
    )) 
     }
               <path
            className="flows"
            d={path(d)}
            stroke={'#60c7ef'}
            stroke-opacity={0.5}
            fill={'none'}
            stroke-width={sizeScale(d['2020'])}
          />
     <circle
            r={2}
            cx={projection(d.coordinates[0])[0]}
            cy={projection(d.coordinates[0])[1]}
            onClick={(e) => handleClick(e)}
            cursor={'pointer'}
            fill={'white'}
            opacity={0.6}
            stroke={'#252525'}
          />
           <path
        className="sphere"
        d={path({ type: 'Sphere' })}
      />
      <path className="graticules" d={path(graticule())} /> */
