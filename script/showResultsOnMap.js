// creates point graphic at lat/lon of each result

function showResultsOnMap(results) {
    //go through each result and add on map
    //const graphics = []; // going to initialize this outside of the function and see what happens
    require(["esri/Graphic"], (Graphic) => {

      results.forEach(_result => { 
  
         let point = {
          type: "point", 
          latitude: parseFloat(_result.LAT),
          longitude: parseFloat(_result.LON)
        };
  
        let symbol = {
          type: "simple-marker",  
          color: [226, 119, 40],
          size: "12px",
          outline : {
            color: [255, 255, 0],
            width: 3
          }
        };
        
        let pointGraphic = new Graphic({
          geometry: point,
          symbol: symbol
        });
  
        graphics.push(pointGraphic)      
        view.graphics.add(pointGraphic);
      })
  
    //zoom to all graphics
    view.goTo({
      target: graphics,
      zoom: 17
    }) 
       
    });
    
  }



  function clearResultsFromMap() {
    //clear existing point
    view.graphics.removeAll();
    
    view.goTo({
      center: [-99.90, 31.96], // Longitude, latitude of Texas
      zoom: 6, // Zoom level
    }) 
    
  }


  function returnToPoint() {

    //zoom to all graphics
    view.goTo({
      target: graphics,
      zoom: 17
    }) 
    
  }





