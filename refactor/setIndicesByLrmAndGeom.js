// end event handler
function setIndicesByLrmAndGeom(currentLRMno, calcGeomType) {
  if (calcGeomType == "Point") {
    // set fields
    if (currentLRMno == 2) {
      lrm_indices = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentPointFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
    } else if (currentLRMno == 3) {
      lrm_indices = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentPointFieldOrder = ['inputControlSection', 'inputMilepointMeasure'];
    } else if (currentLRMno == 4) {
      lrm_indices = [0, 1];
      rte_nm_lrm_indices = [0];
      currentPointFieldOrder = ['inputRouteName_4', 'inputDistanceFromOrigin'];
    } else if (currentLRMno == 1) {
      lrm_indices = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentPointFieldOrder = ['inputLatitude', 'inputLongitude'];
    }
    // end set fields
    return [[lrm_indices], rte_nm_lrm_indices, currentPointFieldOrder];

  } else if (calcGeomType == "Route") {
    // set fields
    if (currentLRMno == 2) {
      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentRouteFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
    } else if (currentLRMno == 3) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      currentRouteFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
    } else if (currentLRMno == 4) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentRouteFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
    } else if (currentLRMno == 1) {
      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      currentRouteFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
    }
    // end set fields
    return [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, currentRouteFieldOrder];
  }

}
