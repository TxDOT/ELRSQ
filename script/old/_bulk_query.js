async function lrsBulkQuery(method, coord1, coord2) {
    currentPos = 1;

    if (method == 1){
        lat = coord1;
        lon = coord2;
        url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
    }

    const results = await queryService(url);
    console.log(results);
    //showResultsOnMap(results);
  }
