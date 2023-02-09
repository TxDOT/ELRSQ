// creates point graphic at lat/lon of each result

function showResultsOnMap(results) {
    //go through each result and add on map
    const graphics = [];
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