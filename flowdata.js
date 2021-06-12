const projection = d3.geoNaturalEarth1();
export  const flowdata = (filterdata) => {
  const nodes = {};
  let results = [];
  if( filterdata.length != 0 ){
  filterdata.forEach( (d,i)=> {
    nodes[`${i}`] = {x:projection(d.coordinates[0])[0] ,y:projection(d.coordinates[0])[1]} ;
  })
    nodes[`${Object.keys(nodes).length}`] = {x:projection(filterdata[0].coordinates[1])[0],
                           y:projection(filterdata[0].coordinates[1])[1]};
    
    const edges = filterdata.map( (d,i) => {
     let obj = {};
     obj['source'] = `${Object.keys(nodes).length-1}`;
     obj['target'] = `${i}`;
     return obj;
   })

  const fbundling = d3.ForceEdgeBundling()   
				.nodes(nodes)
				.edges(edges)
  
	 results = fbundling();
   
  }
    return results;
  }
