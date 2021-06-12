import { setuppoints } from './setuppoints';

export const setUpdata = (coordata ,immidata) => {
const countrytable = new Map();
  coordata.forEach((d, i) => {
    d['points'] = [+d.longitude, +d.latitude];
  });
  coordata.forEach((d, i) => {
       if (d.name == 'United States')
      countrytable.set(
        'United States of America',
        d.points
      );
     else countrytable.set(d.name, d.points);
  });
  setuppoints(countrytable, immidata);
    immidata.forEach( d =>{
    if(typeof(d['2020']) === "string")
      d['2020'] = +( (d['2020']).replace(/\s/g, '')) ;
  })
}
