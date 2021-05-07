(function (React$1, ReactDOM, d3, topojson) {
  'use strict';

  var React$1__default = 'default' in React$1 ? React$1['default'] : React$1;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  // Get the topojson from world-atlas and convert to geojson data for later to graph the World

  const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  const useData = () => {
    const [data, setData] = React$1.useState(null);
    //console.log(data);

    React$1.useEffect(() => {
      d3.json(jsonUrl).then(topology => {
        const { countries } = topology.objects;
        setData({
          countries: topojson.feature(topology, countries),
          interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
        });
      });
    }, []);

    return data;
  };

  // Graph the World map and the line based on immigrants
  const projection = d3.geoNaturalEarth1();
  const path = d3.geoPath(projection);
  const graticule = d3.geoGraticule();



  const Marks = ( {graphdata: { countries, interiors }
    ,immidata }) => (
    React.createElement( 'g', { className: "marks" },
      React.createElement( 'path', { className: "sphere", d: path({ type: 'Sphere' }) }),
      React.createElement( 'path', { className: "graticules", d: path(graticule()) }),
      countries.features.map(feature => (
        React.createElement( 'path', { className: "country", d: path(feature) })
      )),
      React.createElement( 'path', { className: "interiors", d: path(interiors) }),
      immidata.map( d => (
      React.createElement( 'path', { className: "flows", d: path(d) })
      ))
    )
  );

  // Get the immidata from my Gist

  const dataUrl ="https://gist.githubusercontent.com/serjunfan/b3f0b16e32c153b8393338bf997bdc08/raw/4a0b8e022f09de28bfae808da66bed1b311c61e7/2020.csv";
  const immiData = () => {
    const [data, setData] = React$1.useState(null);
    React$1.useEffect(() => {
      d3.csv(dataUrl).then(setData);
    },[]);

    return data;
  };

  //A function that gets the center point Latitude and  Longitude by Summing all the points Latitude and  Longitude and divide them by how many points.
  //Two Graph data coordinates are different than others so i tweaked a little bit code to fix the bug of NaN 
  const getlalo = (a,index) =>{
    let lacoorsum = 0;
    let locoorsum = 0; 
    let totalcoordinates = a.length;
    if( totalcoordinates == 1 || index == 102 || index == 128){
    a.forEach( d => {
      let totalpoints = d.length;
      let lacoor = 0;
      let locoor = 0;
      for(let i = 0 ; i < totalpoints ;i++){
        lacoor += d[i][0];
        locoor += d[i][1];
      }
      lacoor = lacoor / totalpoints;
      locoor = locoor / totalpoints;
      lacoorsum = lacoorsum + lacoor;
      locoorsum = locoorsum + locoor;
    });}
    else {a.forEach( e => {
        e.forEach( d => {
      let totalpoints = d.length;
      let lacoor = 0;
      let locoor = 0;
      for(let i = 0 ; i < totalpoints ;i++){
        lacoor += d[i][0];
        locoor += d[i][1];
      }
      lacoor = lacoor / totalpoints;
      locoor = locoor / totalpoints;
      lacoorsum = lacoorsum + lacoor;
      locoorsum = locoorsum + locoor;
    });});
    }
    lacoorsum = lacoorsum / totalcoordinates;
    locoorsum = locoorsum / totalcoordinates;
    let point = [lacoorsum,locoorsum];
    return point;
  };

  // Set up the coordinates for later to graph the Lines. Only 2020's data are set up 
  const setuppoints = ( countrytable,immidata ) => {
      const des = "Region, development group, country or area of destination";
      const ori = "Region, development group, country or area of origin";
      immidata.forEach( d => {
      d[des] = d[des].trim().replace('*','');
      d[ori] = d[ori].trim().replace('*','');
      });
      for( let i = 0 ; i < immidata.length ; i++){
        if(countrytable.has(immidata[i][des]) 
           && countrytable.has(immidata[i][ori]
             )){
          immidata[i]["coordinates"] = [countrytable.get(immidata[i][des]),countrytable.get(immidata[i][ori])];
          immidata[i]["type"] = "LineString";
        }
        else {
          immidata.splice(i,1);
          i--;
          }
        }
      for( let i = 0 ; i < immidata.length ; i++){
        if(immidata[i]['2020'] == '..' ){
          immidata.splice(i,1);
          i--;
        }
      }
    };

  //Main function. Actually a React H

  const width = 960;
  const height = 500;

  const App = () => {
    const graphdata = useData();
    const immidata = immiData();
    if (!graphdata || !immidata ) {
      return React$1__default.createElement( 'pre', null, "Loading..." );
    } 
    const countrytable = new Map();
    graphdata.countries.features.forEach( (d,i) =>{
     countrytable.set(d.properties.name
      ,(getlalo(d.geometry.coordinates, i)));
    });
    setuppoints(countrytable,immidata);
    

    return (
      React$1__default.createElement( 'svg', { width: width, height: height },
        React$1__default.createElement( Marks, { graphdata: graphdata, immidata: immidata })
      )
    );
  };
  const rootElement = document.getElementById('root');
  ReactDOM.render(React$1__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3, topojson));
