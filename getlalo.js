export const getlalo = a =>{
  let lacoorsum = 0;
  let locoorsum = 0; 
  let totalcoordinates = a.length
  if( totalcoordinates == 1){
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
  })}
  else{a.forEach( e => {
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
  })})
  }
  lacoorsum = lacoorsum / totalcoordinates;
  locoorsum = locoorsum / totalcoordinates;
  let point = [lacoorsum,locoorsum];
  return point;
}
