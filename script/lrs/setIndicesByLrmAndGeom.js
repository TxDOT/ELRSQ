function setIndicesByLrmAndGeom(CURRENTLRMNO) {
  let field_indices = [];
  let lrm_indices = [];
  let lrm_indices0 = [];
  let lrm_indices1 = [];

  if (CALCGEOMTYPE == "Point") {

    if (CURRENTLRMNO == 1) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['inputLatitude', 'inputLongitude'];
    }

    else if (CURRENTLRMNO == 2) {

      lrm_indices = lrm_indices0 = [0, 1, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['inputRouteName_2', 'inputReferenceMarker', 'inputDisplacement'];
    }

    else if (CURRENTLRMNO == 3) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [2]; // optional
      currentFieldOrder = ['inputControlSection', 'inputMilepointMeasure'];
    }

    else if (CURRENTLRMNO == 4) {

      lrm_indices = lrm_indices0 = [0, 1];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['inputRouteName_4', 'inputDistanceFromOrigin'];
    }
  }

  else if (CALCGEOMTYPE == "Route") {

    if (CURRENTLRMNO == 1) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['inputBeginLatitude', 'inputBeginLongitude', 'inputEndLatitude', 'inputEndLongitude'];
    }

    else if (CURRENTLRMNO == 2) {

      lrm_indices0 = [0, 1, 2];
      lrm_indices1 = [0, 3, 4];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['inputRouteName_2', 'inputBeginReferenceMarker', 'inputBeginDisplacement', 'inputEndReferenceMarker', 'inputEndDisplacement'];
    }

    else if (CURRENTLRMNO == 3) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [2, 3];
      rte_nm_lrm_indices = [4]; // optional
      currentFieldOrder = ['inputBeginControlSection', 'inputBeginMilepointMeasure', 'inputEndControlSection', 'inputEndMilepointMeasure'];
    }

    else if (CURRENTLRMNO == 4) {

      lrm_indices0 = [0, 1];
      lrm_indices1 = [0, 2];
      rte_nm_lrm_indices = [0];
      currentFieldOrder = ['inputRouteName_4', 'inputBeginDistanceFromOrigin', 'inputEndDistanceFromOrigin'];
    }
  }


  field_indices = [[lrm_indices0, lrm_indices1], rte_nm_lrm_indices, currentFieldOrder];

  return field_indices;
}
