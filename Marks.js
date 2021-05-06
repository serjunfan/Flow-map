import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';
// Graph the World map and the line based on immigrants
const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();
let link =[ 
  {type: "LineString", coordinates: [[100, 60], [-60, -30]],abc:"abc"},
  {type: "LineString", coordinates: [[10, -20], [-60, -30]]},
  {type: "LineString", coordinates: [[10, -20], [130, -30]]}]



export const Marks = ( {graphdata: { countries, interiors }
  ,immidata }) => (
  <g className="marks">
    <path className="sphere" d={path({ type: 'Sphere' })} />
    <path className="graticules" d={path(graticule())} />
    {countries.features.map(feature => (
      <path className="country" d={path(feature)} />
    ))}
    <path className="interiors" d={path(interiors)} />
    {immidata.map( d => (
    <path className="flows" d={path(d)} />
    )) 
     }
  </g>
);
