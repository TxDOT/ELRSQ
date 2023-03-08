function buildUrl(CURRENTLRMNO, coordinateArr, lrm_indices) {
  let url = '';

  let index0 = (typeof lrm_indices !== 'undefined') ? lrm_indices[0] : 0;
  let index1 = (typeof lrm_indices !== 'undefined') ? lrm_indices[1] : 1;
  let index2 = (typeof lrm_indices !== 'undefined') ? lrm_indices[2] : 2;

  if (CURRENTLRMNO == 1) {
    lat = coordinateArr[index0];
    lon = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (CURRENTLRMNO == 2) {
    routeName = coordinateArr[index0];
    refMarker = coordinateArr[index1];
    displacement = coordinateArr[index2];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (CURRENTLRMNO == 3) {
    controlSecNum = coordinateArr[index0];
    milePointMeasure = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (CURRENTLRMNO == 4) {
    routeName = coordinateArr[index0];
    dfo = coordinateArr[index1];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}
