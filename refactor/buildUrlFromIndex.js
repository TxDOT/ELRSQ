function buildUrlFromIndex(currentLRMno, coordinateArr, lrm_indices) {
  let url = '';

  if (currentLRMno == 1) {
    lat = coordinateArr[lrm_indices[0]];
    lon = coordinateArr[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (currentLRMno == 2) {
    routeName = coordinateArr[lrm_indices[0]];
    refMarker = coordinateArr[lrm_indices[1]];
    displacement = coordinateArr[lrm_indices[2]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (currentLRMno == 3) {
    controlSecNum = coordinateArr[lrm_indices[0]];
    milePointMeasure = coordinateArr[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (currentLRMno == 4) {
    routeName = coordinateArr[lrm_indices[0]];
    dfo = coordinateArr[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }
}
