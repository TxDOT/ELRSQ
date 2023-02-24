function makeLrsQueryUrl(inputMethod, lrsMethod, lrm_indices, rowFromArray, format_rte_nm) {

  // build url
  let url = '';

  let routeName = '';

  let lat = '';
  let lon = '';
  let refMarker = '';
  let displacement = '';
  let controlSecNum = '';
  let milePointMeasure = '';
  let dfo = '';

  let coordinateArr = [];

  if (inputMethod == 'html') {
    for (let i = 0; i < lrm_indices.length; i++) {
      let value = $('#' + rowFromArray[i]).val();
      console.log(value);
      coordinateArr.push(value);
    }
  } else if (inputMethod == 'table') {
    coordinateArr = rowFromArray;
  }

  if (format_rte_nm == 1) {
    routeName = fixThisVerySpecificTextFormat(coordinateArr[lrm_indices[0]]);
  } else {
    routeName = coordinateArr[lrm_indices[0]];
  }

  if (lrsMethod == 1) {
    lat = coordinateArr[lrm_indices[0]];
    lon = coordinateArr[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs1?Lat=${lat}&Lon=${lon}`;
  }

  else if (lrsMethod == 2) {
    refMarker = coordinateArr[lrm_indices[1]];
    displacement = coordinateArr[lrm_indices[2]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs2?RouteID=${routeName}&ReferenceMarker=${refMarker}&Displacement=${displacement}`;
  }

  else if (lrsMethod == 3) {
    controlSecNum = coordinateArr[lrm_indices[0]];
    milePointMeasure = coordinateArr[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs3?ControlSectionNumber=${controlSecNum}&MilePointMeasure=${milePointMeasure}`;
  }

  else if (lrsMethod == 4) {
    dfo = coordinateArr[lrm_indices[1]];
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
  }

  console.log(url);
  return url;

  // end build url
}



