import React from 'react';
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
const width = 960;
const height = 500;
const heightforbar = 100;
const barsize = 0.2;
const margin = { top:0 ,right:30 ,bottom:25,left:90 };


export const Bar = ( {filterdata} ) => {
  const yValue = d => d["2020"];
  const xValue = d => d["Region, development group, country or area of destination"];
  const top10data = filterdata
    .sort((a,b) =>  d3.descending(yValue(a),yValue(b) ))
    .slice(0,10)
  const max = d3.max(top10data, d => d["2020"] );
  const barHeight = heightforbar - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;


  const xScale = scaleBand()
    .domain(top10data.map(xValue))
    .range([0, innerWidth])
    .paddingInner(0.15);

  const yScale = d3.scaleSqrt()
    .domain([0, d3.max(top10data, yValue )])
    .range([barHeight, 0]);

  return (
    <g transform={`translate(${margin.left},${height - height * barsize})`}>
       <AxisBottom
          xScale={xScale}
          innerHeight={barHeight}
          tickOffset={8}
        />
      <AxisLeft yScale={yScale} innerWidth={innerWidth} tickFormat={d3.format("~s")} 
        tickOffset={5} ticknum={4}/>
      <Marks
        top10data={top10data}
        xScale={xScale}
        yScale={yScale}
        xValue={xValue}
        yValue={yValue}
        tooltipFormat={d => d}
        barHeight={barHeight}
      />
    </g>
  );
}
