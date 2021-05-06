// Set up the coordinates for later to graph the Lines. Only 2020's data are set up 
export const setuppoints = ( countrytable,immidata ) => {
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
      else{
        immidata.splice(i,1);
        i--
        }
      }
    for( let i = 0 ; i < immidata.length ; i++){
      if(immidata[i]['2020'] == '..' ){
        immidata.splice(i,1);
        i--;
      }
    }
  }
