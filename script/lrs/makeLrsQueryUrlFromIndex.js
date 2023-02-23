function makeLrsQueryUrlFromIndex(method, vector, index_coord) {
  console.log(vector);

  if (method == 1) {
    const lat = vector[index_coord[0]];
    const lon = vector[index_coord[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (method == 2) {
    const routeName = vector[index_coord[0]];
    const refMarker = vector[index_coord[1]];
    const displacement = vector[index_coord[2]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (method == 3) {
    const controlSecNum = vector[index_coord[0]];
    const milePointMeasure = vector[index_coord[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (method == 4) {
    const routeName = vector[index_coord[0]];
    const dfo = vector[index_coord[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}
