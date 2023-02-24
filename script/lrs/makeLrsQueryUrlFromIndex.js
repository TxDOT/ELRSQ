// build url

function makeLrsQueryUrlFromIndex(method, rowFromArray, lrm_indices, format_rte_nm) {
  let routeName = '';

  // build url
  let url = '';

  if (format_rte_nm == 1) {
    routeName = fixThisVerySpecificTextFormat(rowFromArray[lrm_indices[0]]);
  } else {
    routeName = rowFromArray[lrm_indices[0]];
  }

  if (method == 1) {
    let lat = rowFromArray[lrm_indices[0]];
    let lon = rowFromArray[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (method == 2) {

    let refMarker = rowFromArray[lrm_indices[1]];
    let displacement = rowFromArray[lrm_indices[2]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (method == 3) {
    let controlSecNum = rowFromArray[lrm_indices[0]];
    let milePointMeasure = rowFromArray[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (method == 4) {

    let dfo = rowFromArray[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  return url;
}