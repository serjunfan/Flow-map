import {
  geoNaturalEarth1,
  geoPath,
  geoGraticule,
} from 'd3';
import { setUpdata } from './setUpdata';
import { flowdata } from './flowdata';
import React, { useState, useEffect,useMemo } from 'react';
import { Bar } from './Bar/index.js';
// Graph the World map and the line based on immigrants
const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
  
const d3line = d3.line()
			.x(function(d){ return d.x; })
      .y(function(d){ return d.y; })
      .curve(d3.curveLinear);

export const Marks = ({graphdata,coordata,immidata}) => {
  const [selected, setSelected] = useState('Brazil');
  const handleClick = (e) => {
    if (selected == e.currentTarget.getAttribute('title')) {
      setSelected(null);
    } else {
      setSelected(e.currentTarget.getAttribute('title'));
    }
  };

  setUpdata(coordata, immidata);
  
  let filterdata = []; 
  
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

  const results = useMemo( () => flowdata(filterdata) ); 
  return (
    <g className="marks">
      {graphdata.countries.features.map((feature) => (
        <g>
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
        <title>{feature.properties.name}</title>
        </g> 
      ))}
      <path
        className="interiors"
        d={path(graphdata.interiors)}
      />
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
      <Bar filterdata={filterdata} />
    </g>
  );
};
