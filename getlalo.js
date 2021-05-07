//A function that gets the center point Latitude and  Longitude by Summing all the points Latitude and  Longitude and divide them by how many points.
//Two Graph data coordinates are different than others so i tweaked a little bit code to fix the bug of NaN 
export const getlalo = (a,index) =>{
  let lacoorsum = 0;
  let locoorsum = 0; 
  let totalcoordinates = a.length
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
